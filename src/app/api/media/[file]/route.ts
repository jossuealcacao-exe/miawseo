import { NextResponse } from 'next/server';
import { listPhotos, readPhotoFile } from '@/lib/store';

export const runtime = 'nodejs';

/**
 * Sirve el binario de una foto SOLO si esta aprobada.
 * Las imagenes viven fuera de /public para que la moderacion sea el candado
 * real: nada es accesible publicamente antes de aprobarse.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;

  const approved = await listPhotos({ status: 'approved' });
  const photo = approved.find((p) => p.file === file);
  if (!photo) {
    return new NextResponse('No encontrado', { status: 404 });
  }

  const bytes = await readPhotoFile(photo.file);
  if (!bytes) {
    return new NextResponse('No encontrado', { status: 404 });
  }

  return new NextResponse(new Uint8Array(bytes), {
    status: 200,
    headers: {
      'Content-Type': photo.mime,
      'Cache-Control': 'public, max-age=3600, immutable',
      'X-Content-Type-Options': 'nosniff',
      'Content-Disposition': 'inline',
    },
  });
}
