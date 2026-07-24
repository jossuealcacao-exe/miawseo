# AHP — Agent Handoff Protocol

## Identidad
- Proyecto: **Miawseo** — museo inmersivo de razas felinas con muro público moderado. En vivo en **https://michimuseum.com**.
- Origen: Claude Code (Web Architect OS 2.0; BUILD inicial + múltiples iteraciones de diseño, comunidad, despliegue y SEO/analytics).
- Destino: cualquier agente/dev que continúe o migre el proyecto a una nueva versión del sistema web.
- Fecha: 2026-07-24.
- Estado: **COMPLETED / EN PRODUCCIÓN** (build verde, desplegado en Railway, dominio propio activo).

## Objetivo activo
Galería inmersiva donde se recorren razas de gato como una **red de metro** (Michiteca) y la comunidad cuelga fotos reales de sus michis en un **muro público moderado** (Michi Plaza), con reacciones de corazón. Front + back monolítico con candados anti-abuso. Portafolio personal.

## Contexto mínimo
- Idioma UI: español (es-MX).
- Dirección visual: **Minimal Metro UX** — señalética de metro sobre andén oscuro; líneas de color, wayfinding con flechas, chips, tipografía sans tipo transporte, esquinas rectas. Spec en `DESIGN_MINIMAL_METRO.md` (proyecto) y `_web-os/reference/DESIGN-SYSTEM-MINIMAL-METRO.md` (SO). Tokens en `src/app/globals.css` (4 capas); iconos inline en `src/components/Icon.tsx`.
- Michiteca organizada en **líneas**: **M1 "Razas"** (20 estaciones, lila `--m1:#7c3aed`), **M2 "Michis y humanos"** (8 estaciones históricas cronológicas, azul `--m2`, cada una con galería de 3 imágenes en `/historia/[slug]`), **M3** ("en obras", gris).
- Contenido de razas e historia = divulgación general.

## Fuente de verdad
- Contenido curatorial de razas: `src/data/breeds.ts` (20 razas, slides por sala).
- Contenido histórico M2: `src/data/history.ts` (8 estaciones + galerías).
- Datos de usuarios (fotos + corazones): `photos.json` + `uploads/` dentro de `DATA_DIR` (volumen persistente en prod; `.data/` local, no versionado).
- URL pública / marca: `src/lib/site.ts` (`SITE_URL`, `SITE_NAME`).

## Arquitectura
- **Next.js 15.5.21 (App Router) + TypeScript estricto**, monolito full-stack, React 19.
- Perfil SELF_CONTAINED: sin BD ni servicios externos en runtime; solo GA4 opcional en cliente.
- Render: fichas de raza (`/michiteca/[breed]`) e historia (`/historia/[slug]`) son **SSG** (`generateStaticParams`); Michiteca, Michi Plaza y las APIs son **dinámicas** (`force-dynamic`, node runtime).
- Persistencia: filesystem en `DATA_DIR` (default `process.cwd()/.data`; en prod `/data`), escritura serializada (tmp + rename).
- Imágenes de razas/historia: Wikimedia Commons vía `upload.wikimedia.org` (permitido en CSP). Fotos de usuarios servidas por API solo si aprobadas.

## Decisiones confirmadas
- Imágenes de usuarios servidas por `/api/media/[file]` **solo si `status === approved`**; binarios NO viven en `/public` → la moderación es el candado real.
- Validación de imagen por magic bytes + dimensiones, sin dependencias nativas para subir.
- Rate limit en memoria por IP (parametrizable); honeypot + tiempo mínimo + consentimiento obligatorio en subida.
- Moderación con token único `ADMIN_TOKEN` en `/admin` + `/api/admin` (timingSafeEqual).
- **Corazones**: `/api/photos/heart` (add/remove), rate limit propio (60/min); "1 por navegador" vía `localStorage` (`miawseo:hearts`); optimista + propagación inmediata al grid; corazón **relleno rojo sólido** siempre (visibilidad). Total por foto en `Photo.hearts`.
- **CSP** sin nonce (compatible con SSG): `script-src 'self' 'unsafe-inline'` (+`'unsafe-eval'` dev) + googletagmanager; `img-src`/`connect-src` incluyen Wikimedia y Google Analytics. En `next.config.mjs`.
- **Analytics**: GA4 (`G-CX08FFS75C`) vía `next/script`, **solo en producción** y **solo tras aceptar** el banner de consentimiento (`src/components/Analytics.tsx`, `localStorage: miawseo:consent`).
- **SEO**: `SITE_URL` como fuente única (metadataBase, sitemap con rutas de historia, robots con Host, OG/Twitter, JSON-LD WebSite, canonical por página en detalle). Favicon `app/icon.svg` (roundel) y OG `app/opengraph-image.png` (1200×630 de marca).
- **Despliegue Opción B** (disco persistente): `DATA_DIR` configurable; `render.yaml` + `railway.json` versionados; `outputFileTracingRoot` fija el root ante múltiples lockfiles; `engines.node >=20`.

## Estado
### Completado
- Home: hero con imagen "mesh" (placeholder Wikimedia; ver Pendiente), explicativo "Cómo funciona la red" (líneas→estaciones→andén), señales Michiteca (M1) / Michi Plaza, bloque **Arenero** (donaciones, `mailto:jossue.alcala@bloqio.app`), autoría "Jossué Alcalá" en footer.
- Michiteca: buscador + líneas M1/M2/M3; fichas de raza (slideshow por salas, quick-facts, navegación entre estaciones); páginas de historia M2 con `PeriodGallery`.
- Michi Plaza: **muro grid** (`PhotoWall`) con filtro de razas y orden por corazones; **Lightbox** accesible (imagen completa, mensaje, corazón, teclado ESC/flechas); grid reutilizado en la ficha de raza (`BreedMichis`, hasta 12).
- Backend: upload con 6 candados, media gating, admin list/approve/reject, corazones.
- Producción: repo GitHub, deploy en Railway con volumen `/data`, dominio `michimuseum.com` (Cloudflare, CNAME flattening, proxied). Next actualizado a 15.5.21 por CVEs; overrides postcss/sharp.
- SEO + favicon + OG image + GA4 con consentimiento.
### En progreso
- (ninguno)
### Pendiente (mejoras, no bloqueantes)
- **Stripping de EXIF** + resize con `sharp` en `/api/upload` (aún NO hecho; `sharp` ya está instalado). Prioridad de privacidad.
- Sustituir persistencia FS y rate limit en memoria por object storage + BD + Redis para multi-instancia.
- Sustituir la imagen "mesh" del hero (placeholder Wikimedia) por la imagen IA definitiva: dejar `public/hero-michis.jpg` y cambiar `HERO_IMG` en `src/app/page.tsx`.
- Roles de moderación reales; paginación del muro y la cola a volumen alto; backups de `DATA_DIR`.
- Verificar `sitemap.xml` en Google Search Console.

## Repositorio
- Ruta: `/Users/eljochuaxd/Web-Architect-OS-Claude-Code-Ready-v2.0.0/miawseo` (repo Git aislado; el HOME es otro repo accidental que NO se toca).
- Remoto: `https://github.com/jossuealcacao-exe/miawseo.git`
- Rama: `main`.
- Último commit: `3e7eb97` — "fix(corazones): corazón siempre relleno en el botón para visibilidad".
- Working tree: limpio (`.data/` gitignored con datos de prueba locales; NO va a prod).
- Comandos usados: `npm install`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run start` / `start:prod-preview` (:3200). Flujo estándar ante `.next` corrupto: detener dev → `rm -rf .next` → build/dev.

## Variables de entorno (Railway / prod)
| Variable | Requerida | Uso |
|---|---|---|
| `ADMIN_TOKEN` | **Sí** | Panel `/admin` y `/api/admin`. Sin ella cae a `dev-moderacion` (inseguro). |
| `DATA_DIR` | Sí (prod) | Carpeta de datos persistentes; en Railway `=/data` con volumen montado ahí. |
| `NEXT_PUBLIC_SITE_URL` | No | Default `https://michimuseum.com`. |
| `NEXT_PUBLIC_GA_ID` | No | Default `G-CX08FFS75C`. |
| `UPLOAD_RATE_MAX` / `UPLOAD_RATE_WINDOW_MS` | No | Límite de subidas por IP. |

## Archivos (clave; nuevos/modificados en esta fase)
| Ruta | Estado | Función | Observaciones |
|---|---|---|---|
| `src/app/page.tsx` | mod | Home hero mesh + red + Arenero | `HERO_IMG` placeholder |
| `src/app/layout.tsx` | mod | Metadata SEO, OG/Twitter, JSON-LD, Analytics | metadataBase=SITE_URL |
| `src/app/michi-plaza/page.tsx` | mod | Muro grid (PhotoWall) | reemplaza línea de razas |
| `src/app/michi-plaza/[breed]/page.tsx` | mod | Muro filtrado por raza | reusa PhotoWall |
| `src/app/api/photos/route.ts` | mod | Lista fotos (límite 12, +hearts) | por raza |
| `src/app/api/photos/heart/route.ts` | nuevo | +/- corazón | rate limit propio |
| `src/lib/store.ts` | mod | Persistencia + `hearts` + `adjustHearts` | `DATA_DIR` |
| `src/lib/site.ts` | nuevo | `SITE_URL` / `SITE_NAME` | fuente única |
| `src/lib/types.ts` | mod | `Photo.hearts`, `MichiPhotoView` | — |
| `src/components/PhotoWall.tsx` | nuevo | Filtro razas + grid | orden por corazones |
| `src/components/MichiGrid.tsx` | nuevo | Grid uniforme + lightbox | propagación de corazones |
| `src/components/Lightbox.tsx` | nuevo | Visor modal accesible | ESC/flechas, foco |
| `src/components/HeartButton.tsx` | nuevo | Reacción + contador | optimista, localStorage |
| `src/components/BreedMichis.tsx` | mod | Comunidad en ficha de raza | usa MichiGrid |
| `src/components/Analytics.tsx` | nuevo | Consentimiento + GA4 | prod + tras aceptar |
| `src/components/Icon.tsx` | mod | +`heart`, `heart-fill`, `donate` | — |
| `src/app/icon.svg` | nuevo | Favicon (roundel Miawseo) | — |
| `src/app/opengraph-image.png` | nuevo | OG 1200×630 de marca | — |
| `src/app/sitemap.ts` / `robots.ts` | mod | SITE_URL + rutas historia | — |
| `next.config.mjs` | mod | CSP (+GA), outputFileTracingRoot | — |
| `render.yaml` / `railway.json` | nuevo | Config despliegue Opción B | volumen /data |

## QA
- Typecheck: **PASS** (`tsc --noEmit`, strict).
- Lint: **PASS** (`next lint`, 0 warnings; aviso de deprecación de `next lint` en Next 16, no bloquea).
- Tests: sin suite unitaria (proporcional; QA funcional/visual en su lugar).
- Build: **PASS** (compila; SSG de razas/historia; rutas dinámicas y estáticas correctas).
- Visual: **EJECUTADO** en dev (:3000), preview de prod (:3200) y **producción en vivo** (`michimuseum.com`). Verificado: muro grid uniforme, filtro por raza, lightbox (foto completa, corazón), corazones inmediatos (lightbox + badge del grid), banner de consentimiento (GA solo tras aceptar), OG/robots/sitemap con dominio real, favicon.
- Accessibility: semántica, landmarks, skip-link, foco, teclado en lightbox, reduced-motion en código; falta auditoría con lector real.
- Performance: First Load JS ~103–120 kB (dentro de presupuesto); sin métricas de campo.

## Bugs y limitaciones
- **EXIF NO se elimina** en subidas (pendiente `sharp`).
- Persistencia y rate limit por proceso/volumen único (no multi-instancia).
- Moderación con un solo token (sin roles).
- Hero usa foto placeholder de Wikimedia (no la imagen IA definitiva).
- Bug de despliegue resuelto: el dominio custom apuntaba a puerto 3200 (preview local) → 502; se corrigió re-agregando el dominio en Railway para que autodetecte el puerto del `$PORT`.

## Supuestos
- 20 razas (M1) y 8 estaciones (M2) son suficientes para el alcance; ampliables en `breeds.ts` / `history.ts`.
- El Measurement ID de GA es público (va en el HTML), por eso vive en cliente.
- Corazones "1 por navegador" es aceptable sin autenticación (guardado en localStorage; el total lo persiste el servidor).

## Riesgos
- Contenido subido por usuarios: mitigado con moderación previa; revisar textos legales/consentimiento y aviso de privacidad (GA/cookies) con asesoría antes de escalar.
- Sin backups automáticos del volumen `DATA_DIR`.

## Próxima acción exacta
1. Integrar `sharp` en `/api/upload` para **strip EXIF + resize** (privacidad + tamaños uniformes).
2. (Opcional) migrar a Bucket S3 de Railway u object storage + BD si crece el volumen.
3. Sustituir imagen del hero por la IA definitiva.

## Criterio de terminado
Sitio en producción con dominio propio, flujo subir→moderar→publicar operativo, muro con lightbox y corazones inmediatos, SEO/analytics con consentimiento y build verde. **Cumplido.**

## Instrucción al receptor
Continúa desde el estado descrito. Verifica el repo (`git log`, `git status`) y no repitas trabajo ni reviertas decisiones sin declararlo. Local: `npm install && npm run dev`; para moderar copia `.env.example` a `.env.local` y define `ADMIN_TOKEN`. Producción: Railway (Node + volumen `/data`, `DATA_DIR=/data`), dominio vía Cloudflare. Ante `.next` corrupto: detener dev → `rm -rf .next` → build/dev.
