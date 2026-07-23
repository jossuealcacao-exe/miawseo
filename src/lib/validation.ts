/**
 * Validacion de imagenes sin dependencias nativas.
 * - Allowlist de MIME real por magic bytes (no confiar en el header del cliente).
 * - Limite de tamano.
 * - Lectura de dimensiones para descartar archivos absurdos o corruptos.
 * - Sanitizacion de texto de usuario.
 */

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
export const MIN_DIMENSION = 200; // px
export const MAX_DIMENSION = 8000; // px

export type DetectedType = 'image/jpeg' | 'image/png' | 'image/webp';

export interface ImageInfo {
  mime: DetectedType;
  ext: 'jpg' | 'png' | 'webp';
  width: number;
  height: number;
}

export interface ValidationOk {
  ok: true;
  info: ImageInfo;
}
export interface ValidationError {
  ok: false;
  error: string;
}
export type ValidationResult = ValidationOk | ValidationError;

/** Detecta el tipo real por firma binaria. */
function detectType(buf: Buffer): DetectedType | null {
  // JPEG: FF D8 FF
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return 'image/jpeg';
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buf.length > 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return 'image/png';
  }
  // WEBP: "RIFF"...."WEBP"
  if (
    buf.length > 12 &&
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return 'image/webp';
  }
  return null;
}

function pngDimensions(buf: Buffer): { width: number; height: number } | null {
  // IHDR ancho/alto en offsets 16 y 20 (big-endian).
  if (buf.length < 24) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegDimensions(buf: Buffer): { width: number; height: number } | null {
  // Recorre los marcadores JPEG hasta un SOF (Start Of Frame).
  let offset = 2;
  while (offset < buf.length) {
    if (buf[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = buf[offset + 1];
    if (marker === undefined) return null;
    // SOF0..SOF15 excepto DHT(C4), DAC(CC), RSTn.
    const isSOF =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;
    if (isSOF) {
      if (offset + 9 > buf.length) return null;
      const height = buf.readUInt16BE(offset + 5);
      const width = buf.readUInt16BE(offset + 7);
      return { width, height };
    }
    const len = buf.readUInt16BE(offset + 2);
    if (len <= 0) return null;
    offset += 2 + len;
  }
  return null;
}

function webpDimensions(buf: Buffer): { width: number; height: number } | null {
  const format = buf.toString('ascii', 12, 16);
  if (format === 'VP8 ') {
    // Lossy: dimensiones en offset 26 (14 bits cada una).
    if (buf.length < 30) return null;
    const width = buf.readUInt16LE(26) & 0x3fff;
    const height = buf.readUInt16LE(28) & 0x3fff;
    return { width, height };
  }
  if (format === 'VP8L') {
    // Lossless.
    if (buf.length < 25) return null;
    const b0 = buf[21]!;
    const b1 = buf[22]!;
    const b2 = buf[23]!;
    const b3 = buf[24]!;
    const bits = b0 | (b1 << 8) | (b2 << 16) | (b3 << 24);
    const width = (bits & 0x3fff) + 1;
    const height = ((bits >> 14) & 0x3fff) + 1;
    return { width, height };
  }
  if (format === 'VP8X') {
    // Extended: dimensiones-1 en 24 bits desde offset 24.
    if (buf.length < 30) return null;
    const width = 1 + (buf[24]! | (buf[25]! << 8) | (buf[26]! << 16));
    const height = 1 + (buf[27]! | (buf[28]! << 8) | (buf[29]! << 16));
    return { width, height };
  }
  return null;
}

export function validateImage(buf: Buffer): ValidationResult {
  if (buf.length === 0) return { ok: false, error: 'El archivo esta vacio.' };
  if (buf.length > MAX_UPLOAD_BYTES) {
    return { ok: false, error: 'La imagen supera el limite de 5 MB.' };
  }
  const mime = detectType(buf);
  if (!mime) {
    return {
      ok: false,
      error: 'Formato no permitido. Solo se aceptan JPG, PNG o WebP reales.',
    };
  }
  let dims: { width: number; height: number } | null = null;
  let ext: ImageInfo['ext'];
  if (mime === 'image/png') {
    dims = pngDimensions(buf);
    ext = 'png';
  } else if (mime === 'image/jpeg') {
    dims = jpegDimensions(buf);
    ext = 'jpg';
  } else {
    dims = webpDimensions(buf);
    ext = 'webp';
  }
  if (!dims || dims.width <= 0 || dims.height <= 0) {
    return { ok: false, error: 'No se pudieron leer las dimensiones (archivo corrupto).' };
  }
  if (dims.width < MIN_DIMENSION || dims.height < MIN_DIMENSION) {
    return { ok: false, error: `La imagen es muy pequena (minimo ${MIN_DIMENSION}px por lado).` };
  }
  if (dims.width > MAX_DIMENSION || dims.height > MAX_DIMENSION) {
    return { ok: false, error: `La imagen es demasiado grande (maximo ${MAX_DIMENSION}px por lado).` };
  }
  return { ok: true, info: { mime, ext, width: dims.width, height: dims.height } };
}

/** Limpia texto de usuario: recorta, colapsa espacios y quita caracteres de control. */
export function sanitizeText(input: unknown, maxLen: number): string {
  if (typeof input !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  const noControl = input.replace(/[\x00-\x1f\x7f]/g, ' ');
  return noControl.replace(/\s+/g, ' ').trim().slice(0, maxLen);
}
