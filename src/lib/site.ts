/**
 * URL pública del sitio (una sola fuente de verdad para metadata, sitemap,
 * robots y Open Graph). Se puede sobreescribir por entorno con
 * NEXT_PUBLIC_SITE_URL (p. ej. en previews de Railway). Sin barra final.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://michimuseum.com'
).replace(/\/+$/, '');

/** Nombre de marca para siteName / Open Graph. */
export const SITE_NAME = 'Miawseo';
