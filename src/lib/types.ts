export type SlideKind =
  | 'intro'
  | 'origen'
  | 'fisico'
  | 'caracter'
  | 'cuidados'
  | 'curiosidad';

export interface BreedSlide {
  kind: SlideKind;
  /** Etiqueta corta para la sala/museo (ej. "Sala I — Origen"). */
  room: string;
  title: string;
  body: string;
  stats?: { label: string; value: string }[];
}

export interface BreedPalette {
  /** Fondo del lienzo/portada. */
  base: string;
  /** Acento (marco, detalles). */
  accent: string;
  /** Tinta/segundo tono para el retrato. */
  ink: string;
}

export interface Breed {
  slug: string;
  name: string;
  origin: string;
  tagline: string;
  /** Semilla numérica para variar el retrato SVG generado. */
  seed: number;
  palette: BreedPalette;
  /** Foto real de la raza (Wikimedia Commons). El retrato SVG es el fallback. */
  photo?: string;
  quickFacts: { label: string; value: string }[];
  slides: BreedSlide[];
}

/** Estados de moderacion de una foto subida por el publico. */
export type PhotoStatus = 'pending' | 'approved' | 'rejected';

export interface Photo {
  id: string;
  breedSlug: string;
  /** Nombre visible del michi (sanitizado, sin datos personales obligatorios). */
  catName: string;
  /** Nota opcional del dueño (sanitizada). */
  note: string;
  /** Archivo en .data/uploads. */
  file: string;
  mime: string;
  width: number;
  height: number;
  status: PhotoStatus;
  createdAt: string;
}
