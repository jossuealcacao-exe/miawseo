import { NextResponse } from 'next/server';
import { adjustHearts } from '@/lib/store';
import { rateLimit, clientKey } from '@/lib/ratelimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Los corazones son ligeros: ventana más generosa que las subidas.
const HEART_MAX = 60;
const HEART_WINDOW_MS = 60 * 1000;

/**
 * Suma o resta un corazón a una foto aprobada.
 * Anti-abuso: rate limit por IP. El "un corazón por navegador" se controla en
 * cliente (localStorage); no requiere cuentas. El total nunca baja de 0.
 */
export async function POST(req: Request) {
  const rl = rateLimit(`heart:${clientKey(req)}`, HEART_MAX, HEART_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Demasiadas reacciones. Espera un momento.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) },
      },
    );
  }

  let body: { id?: unknown; action?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Cuerpo inválido.' }, { status: 400 });
  }

  const id = typeof body.id === 'string' ? body.id : '';
  const action = body.action === 'remove' ? 'remove' : 'add';
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Falta el id.' }, { status: 400 });
  }

  const hearts = await adjustHearts(id, action === 'remove' ? -1 : 1);
  if (hearts === null) {
    return NextResponse.json(
      { ok: false, error: 'Foto no encontrada o no aprobada.' },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true, hearts });
}
