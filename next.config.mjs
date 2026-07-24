import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Fija el root de file-tracing a esta carpeta. Evita que Next infiera un root
  // equivocado si existe otro lockfile en un directorio superior.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  async headers() {
    // CSP compatible con generación estática (SSG).
    //
    // Nota de seguridad: usamos 'unsafe-inline' en script-src porque una CSP
    // basada en nonce es incompatible con páginas prerenderizadas (el nonce se
    // fija en build y no coincide por request). Mantenerlo permite conservar el
    // SSG (mejor SEO/performance). El riesgo de 'unsafe-inline' se acota porque
    // no hay scripts de terceros, React escapa el output y las entradas se
    // sanitizan en servidor. Para una CSP estricta con nonce habría que renderizar
    // todo dinámicamente. En desarrollo se añade 'unsafe-eval' (HMR de Next).
    const isDev = process.env.NODE_ENV !== 'production';
    // Google Analytics (gtag.js): carga el script desde googletagmanager y
    // envía beacons a google-analytics (incluye endpoints regionales).
    const GA = 'https://www.googletagmanager.com';
    const GA_COLLECT =
      'https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com';
    const scriptSrc = isDev
      ? `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${GA}`
      : `script-src 'self' 'unsafe-inline' ${GA}`;
    const csp = [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      // upload.wikimedia.org: fotos reales de razas (Wikimedia Commons).
      `img-src 'self' data: blob: https://upload.wikimedia.org ${GA} ${GA_COLLECT}`,
      "font-src 'self'",
      `connect-src 'self' ${GA} ${GA_COLLECT}`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; ');
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
