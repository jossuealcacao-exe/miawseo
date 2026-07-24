/**
 * Rate limiter en memoria (ventana deslizante simple por clave/IP).
 *
 * LIMITACION DECLARADA: el estado vive en el proceso. Se reinicia al reiniciar
 * el servidor y NO es consistente entre multiples instancias. Para produccion
 * multi-instancia debe sustituirse por un store compartido (Redis, Upstash, etc.).
 */

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();

const MAX = Number(process.env.UPLOAD_RATE_MAX ?? 5);
const WINDOW_MS = Number(process.env.UPLOAD_RATE_WINDOW_MS ?? 10 * 60 * 1000);

export interface RateResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

export function rateLimit(
  key: string,
  max: number = MAX,
  windowMs: number = WINDOW_MS,
): RateResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  // Descarta hits fuera de la ventana.
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= max) {
    const oldest = bucket.hits[0] ?? now;
    buckets.set(key, bucket);
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(0, windowMs - (now - oldest)),
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);
  return { allowed: true, remaining: max - bucket.hits.length, retryAfterMs: 0 };
}

/** Extrae una IP aproximada de la request para usar como clave. */
export function clientKey(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]!.trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'local';
}
