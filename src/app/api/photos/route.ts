import { NextResponse } from 'next/server';
import { listPhotos } from '@/lib/store';
import { breedSlugs, getBreed } from '@/data/breeds';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Límite público de fotos mostradas por raza (los primeros en subir). */
const PER_BREED_LIMIT = 12;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const breed = searchParams.get('breed') ?? '';
  if (!breedSlugs().includes(breed)) {
    return NextResponse.json({ ok: false, error: 'Raza no válida' }, { status: 400 });
  }

  const approved = await listPhotos({ status: 'approved', breedSlug: breed });
  // Los primeros en subir (más antiguos primero).
  const ordered = [...approved].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const breedName = getBreed(breed)?.name ?? breed;
  const photos = ordered.slice(0, PER_BREED_LIMIT).map((p) => ({
    id: p.id,
    catName: p.catName,
    note: p.note,
    file: p.file,
    width: p.width,
    height: p.height,
    hearts: p.hearts,
    breedSlug: p.breedSlug,
    breedName,
  }));

  return NextResponse.json({
    ok: true,
    count: approved.length,
    limit: PER_BREED_LIMIT,
    photos,
  });
}
