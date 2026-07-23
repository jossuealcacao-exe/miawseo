import { NextResponse } from 'next/server';
import { breedSlugs } from '@/data/breeds';
import { rateLimit, clientKey } from '@/lib/ratelimit';
import { validateImage, sanitizeText } from '@/lib/validation';
import { createPhoto } from '@/lib/store';

export const runtime = 'nodejs';

const MIN_ELAPSED_MS = 1500;

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  // Candado 1: rate limit por IP.
  const rl = rateLimit(`upload:${clientKey(req)}`);
  if (!rl.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Demasiadas subidas en poco tiempo. Intenta más tarde.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) },
      },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return bad('Cuerpo de la petición inválido.');
  }

  // Candado 2: honeypot. Si un bot llena el campo cebo, lo rechazamos
  // devolviendo un "ok" silencioso para no darle pistas.
  const honeypot = form.get('nickname');
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  // Candado 3: tiempo mínimo de interacción.
  const elapsed = Number(form.get('elapsed'));
  if (!Number.isFinite(elapsed) || elapsed < MIN_ELAPSED_MS) {
    return bad('Envío demasiado rápido. Vuelve a intentarlo.');
  }

  // Candado 4: consentimiento explícito.
  if (!form.get('consent')) {
    return bad('Debes aceptar las condiciones de publicación.');
  }

  // Validación de raza.
  const breedSlug = String(form.get('breedSlug') ?? '');
  if (!breedSlugs().includes(breedSlug)) {
    return bad('Raza no válida.');
  }

  // Texto de usuario sanitizado.
  const catName = sanitizeText(form.get('catName'), 40);
  if (catName.length < 1) {
    return bad('El nombre del michi es obligatorio.');
  }
  const note = sanitizeText(form.get('note'), 140);

  // Candado 5: archivo real, tipo por magic bytes, tamaño y dimensiones.
  const file = form.get('photo');
  if (!(file instanceof File) || file.size === 0) {
    return bad('Adjunta una imagen.');
  }
  const buf = Buffer.from(await file.arrayBuffer());
  const check = validateImage(buf);
  if (!check.ok) {
    return bad(check.error);
  }

  // Persistencia como PENDING (candado 6: moderación previa a lo público).
  const photo = await createPhoto({
    breedSlug,
    catName,
    note,
    bytes: buf,
    mime: check.info.mime,
    ext: check.info.ext,
    width: check.info.width,
    height: check.info.height,
  });

  return NextResponse.json({
    ok: true,
    id: photo.id,
    status: photo.status,
    message: 'Foto recibida. Pendiente de moderación.',
  });
}
