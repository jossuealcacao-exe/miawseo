# AHP — Agent Handoff Protocol

## Identidad
- Proyecto: **Miawseo** — museo inmersivo de razas felinas con muro público moderado.
- Origen: Claude Code (Web Architect OS 2.0, modo BUILD).
- Destino: cualquier agente/dev que continúe el proyecto.
- Fecha: 2026-07-22.
- Estado: **READY_FOR_QA → COMPLETED** (build + QA funcional pasados).

## Objetivo activo
Sitio tipo galería de arte donde se recorren razas de gato (Michiteca), cada una
con su slideshow-exposición y un botón "Yo tengo uno" para subir la foto del
gato del usuario, que tras moderación vive en la Michi Plaza (muro público por
raza). Front + back con candados anti-abuso.

## Contexto mínimo
- Idioma UI: español (es-MX).
- Dirección visual: **Minimal Metro UX** — señalética de metro sobre andén
  oscuro (paneles azul/verde/rojo, pictogramas en chips, wayfinding con flechas,
  sans tipo transporte). Ver `DESIGN_MINIMAL_METRO.md`. Iconos en
  `src/components/Icon.tsx`; tokens en `src/app/globals.css`.
- El contenido de razas es divulgación general (fuente de verdad en
  `src/data/breeds.ts`).

## Fuente de verdad
- Contenido curatorial: `src/data/breeds.ts` (8 razas, slides por sala).
- Datos de usuarios: `.data/photos.json` + `.data/uploads/` (local, no versionado).

## Arquitectura
- **Next.js 15.1.6 (App Router) + TypeScript estricto**, monolito full-stack.
- Perfil SELF_CONTAINED: sin servicios externos ni secretos en runtime.
- Render: fichas de raza SSG (`generateStaticParams`); michiteca/michi-plaza y APIs
  dinámicas (`force-dynamic` / route handlers node runtime).
- Persistencia: filesystem local con escritura serializada (tmp + rename).

## Decisiones confirmadas
- Imágenes servidas por API (`/api/media/[file]`) solo si `status === approved`;
  los binarios NO viven en `/public` → la moderación es el candado real.
- Validación de imagen por magic bytes + dimensiones, sin dependencias nativas.
- Rate limit en memoria por IP; honeypot + tiempo mínimo; consentimiento
  obligatorio.
- Moderación con token único (`ADMIN_TOKEN`) en `/admin`.

## Estado
### Completado
- Home hero (2 CTAs), Michiteca (grid + buscador), exposición por raza
  (slideshow accesible + "Yo tengo uno"), Michi Plaza índice y por raza, /nosotros,
  /admin (moderación), 404, robots, sitemap.
- Backend: upload, media gating, admin list/approve/reject.
- 6 candados anti-abuso + cabeceras de seguridad (CSP, etc.).
- QA: typecheck, lint, build de producción, y pruebas funcionales de API/flujo.
### En progreso
- (ninguno)
### Pendiente (mejoras, no bloqueantes)
- Re-codificar imágenes con `sharp` para **eliminar EXIF** y normalizar tamaños.
- Sustituir rate limiter/persistencia por Redis + BD + object storage para
  producción multi-instancia.
- Roles de usuario reales para moderación; posible pre-filtro automático de
  contenido.
- Paginación del muro y de la cola de moderación a volumen alto.

## Repositorio
- Ruta: `/Users/eljochuaxd/Web-Architect-OS-Claude-Code-Ready-v2.0.0/miawseo`
- Rama: N/A (carpeta contenedora **no** es repo Git; no se inicializó por regla
  de no publicar/no tocar VCS sin autorización).
- Último commit: N/A.
- Working tree: proyecto nuevo, `.data/` limpiado tras QA.
- Comandos ejecutados: `npm install`, `npm run typecheck`, `npm run lint`,
  `npm run build`, `npm run start` (QA en :3100).

## Archivos
| Ruta | Estado | Función | Observaciones |
|---|---|---|---|
| `src/app/layout.tsx` | nuevo | Layout, metadata, skip-link | lang=es, tema oscuro |
| `src/app/page.tsx` | nuevo | Home hero + pasos | 2 CTAs |
| `src/app/michiteca/page.tsx` | nuevo | Grid + buscador | force-dynamic (counts) |
| `src/app/michiteca/[breed]/page.tsx` | nuevo | Exposición/slideshow | SSG |
| `src/app/michi-plaza/page.tsx` | nuevo | Índice del muro | force-dynamic |
| `src/app/michi-plaza/[breed]/page.tsx` | nuevo | Muro por raza | solo aprobadas |
| `src/app/nosotros/page.tsx` | nuevo | Sobre el museo + reglas | — |
| `src/app/admin/page.tsx` | nuevo | Moderación (client) | token en header |
| `src/app/api/upload/route.ts` | nuevo | Subida con candados | node runtime |
| `src/app/api/media/[file]/route.ts` | nuevo | Sirve imágenes aprobadas | gating |
| `src/app/api/admin/route.ts` | nuevo | List/approve/reject | timingSafeEqual |
| `src/lib/validation.ts` | nuevo | Magic bytes + dims + sanitizar | sin deps |
| `src/lib/store.ts` | nuevo | Persistencia JSON+fs | escritura serializada |
| `src/lib/ratelimit.ts` | nuevo | Rate limit por IP | en memoria |
| `src/data/breeds.ts` | nuevo | Contenido de razas | fuente de verdad |
| `src/components/*` | nuevo | Header, Footer, Portrait, Search, Slideshow, UploadDialog | — |
| `src/app/globals.css` | nuevo | Tokens 4 capas + estilos | — |

## QA
- Typecheck: **PASS** (`tsc --noEmit`, strict + noUncheckedIndexedAccess).
- Lint: **PASS** (`next/core-web-vitals`, 0 warnings).
- Tests: no hay suite unitaria (proporcional; QA funcional por API en su lugar).
- Build: **PASS** (18 rutas, 0 warnings tras corrección de autoprefixer).
- Funcional (curl en prod :3100): rutas 200/404 correctas; 6 candados de subida
  bloquean; flujo pending→404, aprobar→media 200, rechazar→404; admin 401 sin
  token; path traversal→404; cabeceras de seguridad presentes.
- Visual (navegador): **EJECUTADO** vía `preview_start` (dev :3000 y prod :3200).
  Verificado: home, Michiteca, exposición/slideshow (flechas avanzan de sala,
  dots), modal "Yo tengo uno" (abre con clic real), Michi Plaza, responsive móvil
  375px, hidratación (12/12 botones con fiber de React) en dev y prod.
- **Bug encontrado y corregido durante QA visual:** la CSP inicial
  (`script-src 'self'`) bloqueaba los scripts inline de arranque de Next →
  la página NO hidrataba (botones muertos). Intento con nonce+middleware falló
  en prod por incompatibilidad de nonce con SSG. Solución final: CSP sin nonce
  compatible con estático (`script-src 'self' 'unsafe-inline'`, +`'unsafe-eval'`
  solo en dev), en `next.config.mjs`. Middleware eliminado.
- Accessibility: semántica + landmarks + skip-link + foco + reduced-motion en
  código; falta auditoría con lector de pantalla real.
- Performance: First Load JS ~105–112 kB (dentro de presupuesto); sin medición
  de campo (LCP/INP/CLS) por falta de preview visual real.

## Bugs y limitaciones
- EXIF de las imágenes **no se elimina** (no se re-codifica). Ver Pendiente.
- Rate limit y persistencia son por proceso/FS (no multi-instancia).
- Moderación con un solo token (sin roles).

## Supuestos
- 8 razas iniciales son suficientes para el alcance; ampliables en `breeds.ts`.
- Retratos SVG generativos sustituyen fotografía licenciada para evitar
  dependencias de imágenes externas y respetar la CSP.
- Puerto de dev 3000; QA se hizo en 3100 para no colisionar.

## Riesgos
- Contenido público subido por usuarios: mitigado con moderación previa; revisar
  textos legales/consentimiento con asesoría antes de producción real.
- Sin backups automáticos de `.data/`.

## Próxima acción exacta
Si se pasa a producción: (1) integrar `sharp` para strip EXIF + resize en
`/api/upload`; (2) mover persistencia y rate limit a servicios gestionados;
(3) definir `ADMIN_TOKEN` fuerte y, si aplica, roles.

## Criterio de terminado
Build de producción verde + flujo completo subir→moderar→publicar funcionando y
candados anti-abuso activos. **Cumplido.**

## Instrucción al receptor
Continúa desde el estado descrito. Verifica el repo, no repitas trabajo ni
reviertas decisiones sin declararlo. `npm install && npm run dev`; para moderar,
copia `.env.example` a `.env.local` y define `ADMIN_TOKEN`.
