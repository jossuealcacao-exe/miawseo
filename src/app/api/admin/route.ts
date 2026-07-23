import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { listPhotos, setStatus, readPhotoFile } from '@/lib/store';

export const runtime = 'nodejs';

// En dev, si no hay ADMIN_TOKEN se usa un valor por defecto (NO usar en prod).
const TOKEN = process.env.ADMIN_TOKEN ?? 'dev-moderacion';

function authorized(req: Request): boolean {
  const header = req.headers.get('x-admin-token') ?? '';
  const a = Buffer.from(header);
  const b = Buffer.from(TOKEN);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }
  const pending = await listPhotos({ status: 'pending' });
  // Preview inline como data URI (evita exponer el token en URLs de imagen).
  const withPreview = await Promise.all(
    pending.map(async (p) => {
      const bytes = await readPhotoFile(p.file);
      const dataUri = bytes
        ? `data:${p.mime};base64,${bytes.toString('base64')}`
        : null;
      return { ...p, dataUri };
    }),
  );
  return NextResponse.json({ ok: true, pending: withPreview });
}

export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }
  let body: { id?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }
  const { id, action } = body;
  if (!id || (action !== 'approve' && action !== 'reject')) {
    return NextResponse.json(
      { ok: false, error: 'Parámetros inválidos' },
      { status: 400 },
    );
  }
  const status = action === 'approve' ? 'approved' : 'rejected';
  const updated = await setStatus(id, status);
  if (!updated) {
    return NextResponse.json({ ok: false, error: 'Foto no encontrada' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, photo: updated });
}
