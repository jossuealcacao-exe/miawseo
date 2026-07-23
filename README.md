# Miawseo 🐾

Museo inmersivo de razas felinas. Galería de arte donde cada raza es una obra
(**Michiteca**) y un muro público de michis reales moderado (**Michi Plaza**).

Stack: **Next.js 15 (App Router) + TypeScript**, monolito full-stack,
self-contained (sin servicios externos).

Lenguaje visual: **Minimal Metro UX** — señalética de metro sobre andén oscuro
(ver [DESIGN_MINIMAL_METRO.md](DESIGN_MINIMAL_METRO.md)).

## Requisitos

- Node.js ≥ 18.18 (probado en Node 25)
- npm

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # define ADMIN_TOKEN
npm run dev                  # http://localhost:3000
```

## Scripts

| Comando           | Descripción                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Servidor de desarrollo               |
| `npm run build`   | Build de producción                  |
| `npm run start`   | Sirve el build de producción         |
| `npm run lint`    | ESLint (next/core-web-vitals)        |
| `npm run typecheck` | Comprobación de tipos (tsc)        |

## Rutas

- `/` — Home hero con acceso a Michiteca y Michi Plaza.
- `/michiteca` — Grid + buscador de razas.
- `/michiteca/[breed]` — Exposición/slideshow de la raza (+ "Yo tengo uno").
- `/michi-plaza` — Índice del muro por razas.
- `/michi-plaza/[breed]` — Fotos aprobadas de la raza.
- `/nosotros` — Sobre el museo y reglas del muro.
- `/admin` — Panel de moderación (requiere ADMIN_TOKEN).

## API

- `POST /api/upload` — Sube una foto (queda `pending`).
- `GET /api/media/[file]` — Sirve una foto **solo si está aprobada**.
- `GET /api/photos?breed=<slug>` — Michis aprobados de una raza: `count` total +
  las **6 primeras** fotos (para el contador y el carrusel de la ficha).
- `GET /api/admin` — Lista pendientes (token). `POST` para aprobar/rechazar.

Catálogo: **20 razas** (populares + 2 mestizos) en `src/data/breeds.ts`.

## Candados anti-abuso

1. Allowlist de MIME por **magic bytes** (no se confía en el header del cliente).
2. Límite de tamaño (5 MB) y de dimensiones (200–8000 px).
3. **Rate limit** por IP (configurable por env).
4. **Honeypot** + tiempo mínimo de interacción.
5. **Consentimiento** explícito de derechos y publicación.
6. **Moderación previa**: nada es público hasta aprobarse; los binarios viven
   fuera de `/public` y se sirven tras aprobación.
7. Cabeceras de seguridad (CSP, nosniff, X-Frame-Options, etc.) en
   `next.config.mjs`.

> **Nota CSP:** `script-src` usa `'unsafe-inline'` porque una CSP con nonce es
> incompatible con las páginas estáticas (SSG) que usamos para SEO. El riesgo se
> acota: no hay scripts de terceros, React escapa el output y las entradas se
> sanitizan. Para una CSP estricta con nonce habría que renderizar todo de forma
> dinámica (SSR), perdiendo el prerender estático.

## Almacenamiento

Local, en `.data/` (no versionado): `photos.json` + `uploads/`.

## Limitaciones declaradas

- Rate limiter y persistencia son **por proceso / filesystem**: válidos para
  local/demo, no para producción multi-instancia. Migrar a Redis + BD + object
  storage para escalar.
- No se re-codifican las imágenes: el **EXIF no se elimina**. Mejora recomendada:
  procesar con `sharp` para normalizar y limpiar metadatos.
- Moderación manual con un único token. Para producción: usuarios/roles y,
  opcionalmente, un primer filtro automático de contenido.

## Producción / Despliegue

Build y arranque:

```bash
npm ci
npm run build
npm run start   # sirve el build (respeta $PORT)
```

Verificación local del build de producción:

```bash
npm run typecheck && npm run lint && npm run build
```

### Checklist antes de lanzar
- [ ] Definir `ADMIN_TOKEN` fuerte en el entorno (no usar el `dev-moderacion` por defecto).
- [ ] `metadataBase` y las URLs de `sitemap.ts`/`robots.ts` apuntan al dominio real (hoy `http://localhost:3000`).
- [ ] Persistencia: sustituir el store JSON+FS (`src/lib/store.ts`) por una BD y object storage; el `.data/` local no es apto multi-instancia.
- [ ] Rate limit (`src/lib/ratelimit.ts`) → store compartido (Redis/Upstash).
- [ ] Procesar imágenes subidas con `sharp` (resize + **stripping de EXIF**).
- [ ] **Imágenes de razas/historia:** auto-hospedar y añadir atribución (ver [CREDITS.md](CREDITS.md)); revisar licencia por archivo.
- [ ] Revisión legal del texto de consentimiento y de la política del muro público.
- [ ] Considerar `usuarios/roles` para moderación y un pre-filtro de contenido.
- [ ] Backups de los datos de usuarios.

Recomendado: hosting con Node (Vercel/Node server). Las fichas de raza e historia
son SSG; Michiteca/Michi Plaza y las APIs son dinámicas (Node runtime).

Sistema visual reutilizable documentado en
[DESIGN_MINIMAL_METRO.md](DESIGN_MINIMAL_METRO.md) y, a nivel de SO, en
`_web-os/engines/design/styles/minimal-metro.md`.
