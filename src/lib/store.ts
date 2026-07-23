import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { Photo, PhotoStatus } from '@/lib/types';

/**
 * Persistencia local self-contained:
 * - Metadatos en .data/photos.json
 * - Binarios en .data/uploads/<file>
 *
 * LIMITACION DECLARADA: JSON + filesystem es adecuado para un proyecto local /
 * demo con volumen bajo. Para produccion con concurrencia real conviene una BD
 * (SQLite/Postgres) y almacenamiento de objetos. La escritura usa un archivo
 * temporal + rename para minimizar corrupcion, pero no es transaccional.
 *
 * DESPLIEGUE: en produccion define DATA_DIR apuntando a un volumen persistente
 * (p. ej. DATA_DIR=/data en Railway/Render). Si no se define, cae al .data local
 * del proyecto, util en desarrollo.
 */

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), '.data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const DB_FILE = path.join(DATA_DIR, 'photos.json');

async function ensureDirs(): Promise<void> {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

async function readAll(): Promise<Photo[]> {
  try {
    const raw = await fs.readFile(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Photo[]) : [];
  } catch {
    return [];
  }
}

// Serializa escrituras para evitar carreras dentro del mismo proceso.
let writeChain: Promise<void> = Promise.resolve();

function writeAll(photos: Photo[]): Promise<void> {
  writeChain = writeChain.then(async () => {
    await ensureDirs();
    const tmp = `${DB_FILE}.${randomUUID()}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(photos, null, 2), 'utf8');
    await fs.rename(tmp, DB_FILE);
  });
  return writeChain;
}

export interface CreatePhotoInput {
  breedSlug: string;
  catName: string;
  note: string;
  bytes: Buffer;
  mime: string;
  ext: string;
  width: number;
  height: number;
}

export async function createPhoto(input: CreatePhotoInput): Promise<Photo> {
  await ensureDirs();
  const id = randomUUID();
  const file = `${id}.${input.ext}`;
  await fs.writeFile(path.join(UPLOADS_DIR, file), input.bytes);

  const photo: Photo = {
    id,
    breedSlug: input.breedSlug,
    catName: input.catName,
    note: input.note,
    file,
    mime: input.mime,
    width: input.width,
    height: input.height,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const all = await readAll();
  all.push(photo);
  await writeAll(all);
  return photo;
}

export async function listPhotos(filter?: {
  status?: PhotoStatus;
  breedSlug?: string;
}): Promise<Photo[]> {
  const all = await readAll();
  return all
    .filter((p) => (filter?.status ? p.status === filter.status : true))
    .filter((p) => (filter?.breedSlug ? p.breedSlug === filter.breedSlug : true))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getPhoto(id: string): Promise<Photo | undefined> {
  const all = await readAll();
  return all.find((p) => p.id === id);
}

export async function setStatus(
  id: string,
  status: PhotoStatus,
): Promise<Photo | undefined> {
  const all = await readAll();
  const photo = all.find((p) => p.id === id);
  if (!photo) return undefined;
  photo.status = status;
  await writeAll(all);
  return photo;
}

/** Lee el binario de una foto desde disco. */
export async function readPhotoFile(file: string): Promise<Buffer | null> {
  // Evita path traversal: solo el basename.
  const safe = path.basename(file);
  try {
    return await fs.readFile(path.join(UPLOADS_DIR, safe));
  } catch {
    return null;
  }
}

/** Conteo de aprobadas por raza (para indices y badges). */
export async function approvedCountByBreed(): Promise<Record<string, number>> {
  const all = await readAll();
  const counts: Record<string, number> = {};
  for (const p of all) {
    if (p.status === 'approved') {
      counts[p.breedSlug] = (counts[p.breedSlug] ?? 0) + 1;
    }
  }
  return counts;
}
