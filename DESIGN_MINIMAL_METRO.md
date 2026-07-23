# Minimal Metro UX — Lenguaje de diseño de Miawseo

Sistema visual inspirado en la **señalética de metro**: minimalismo funcional,
wayfinding claro, pictogramas simples y jerarquía inmediata. El usuario "viaja"
por la red de razas siguiendo señales.

## Principios
1. **Wayfinding primero.** Cada navegación es una señal: pictograma + etiqueta + flecha.
2. **Paneles planos de color.** Sin gradientes decorativos ni sombras plásticas.
3. **Código de color por función:**
   - Azul = información / rutas de contenido (`--info`)
   - Verde = acción / "adelante" (subir, aprobar) (`--go`)
   - Rojo = identidad de línea / estado activo / borde de andén (`--line-color`)
   - Tinta = paneles neutros (`--surface-1/2`)
4. **Iconografía en chips.** Pictogramas en `currentColor` dentro de recuadros con borde.
5. **Tipografía de transporte.** Una sola sans; etiquetas en MAYÚSCULAS con tracking; títulos gruesos.
6. **Base: andén oscuro.** Fondo casi negro, señales brillantes encima.

## Metáforas de la interfaz
| Elemento del sitio | Metáfora metro |
|---|---|
| Home | Entrada de estación (roundel + señales a andenes) |
| Michiteca | Mapa de la red; cada raza = **estación** |
| Ficha de raza | **Andén**; slides = salas; panel azul = tablero de información |
| Puntos del slideshow | **Progreso de línea** (estaciones conectadas) |
| Michi Plaza | Muro de la comunidad por estación |
| Breadcrumb | **Ruta** con flechas |
| 404 | "Tomó otra línea" |

## Tokens (ver `src/app/globals.css`)
- **Color:** `--c-bg #0c0f14`, señales `--c-blue #0b57d0`, `--c-green #128a54`, `--c-red #e11f1a`, foco `--c-yellow`.
- **Tipo:** `--font-sans` (Helvetica Neue/Arial/system); labels con `--track-wide 0.24em`.
- **Radio:** `--r-chip 10px`, `--r-panel 14px`, `--r-pill`.
- **Motion:** `--motion-fast/base`, `--ease`; respeta `prefers-reduced-motion`.
- **Borde de andén:** `--edge 4px` (línea roja en header/footer).

## Componentes clave
- `.wayfind` (+`--blue/--green/--ink`): señal grande [chip] título/subtítulo [flecha].
- `.station-card`: tarjeta con `__linebar` (color de la raza), póster, nombre, flecha.
- `.info-panel`: tablero azul del andén con `.platform-tag`.
- `.line-progress .stop`: estaciones conectadas (activa en rojo).
- `.chip`: recuadro de pictograma. `.roundel`: identidad de línea.
- `.btn--primary` (azul), `.btn--go` (verde), `.btn--ghost`. `.arrow-btn`: control cuadrado.
- Iconos: **set Zondicons/Zappicon** (carpeta `/icons`) inlineados en
  `src/components/Icon.tsx` con `currentColor` (recoloreables a blanco/rojo,
  sin `<img>`, CSP-safe). El logo es un **gato blanco en disco rojo** (roundel).
  Los iconos del header van en blanco.

## Accesibilidad
- Contraste AA: texto blanco sobre azul/verde/tinta; muted ≥4.5:1 sobre el fondo.
- Foco visible de alto contraste (anillo amarillo 3px).
- Rojo se usa para stripes/bordes/iconos y estados, no como fondo de texto corrido.
- Touch targets ≥ 46–52px; `prefers-reduced-motion` neutraliza transiciones.

## Refinamientos (v2)
- **Esquinas rectas** en todo (radios `--r-chip/panel/sm = 0`). Solo permanecen
  circulares el roundel (logo) y las estaciones del progreso.
- **Michiteca = rail horizontal** (`.stations-rail`): scroll lateral con snap y
  "peek" de la siguiente tarjeta + hint "DESLIZA →".
- **Ficha = carrusel horizontal** (`.track`/`.slide`, `scroll-snap-type: x
  mandatory; scroll-snap-stop: always`): cada deslizamiento/flecha/punto = una
  sala. Índice sincronizado por listener de scroll.
- **Fotos reales** de cada raza (Wikimedia Commons) vía `BreedPhoto`, con retrato
  SVG como fallback. `img-src` permite `upload.wikimedia.org`.
- Grid del andén con `minmax(0, …)` para evitar overflow horizontal del carrusel.

## Comunidad y contenido (v3)
- **20 razas** (populares + 2 mestizos), cada una con 6 salas y **stats en todas**
  para que los paneles queden parejos en alto.
- **Contador de dueños por raza** y **carrusel de michis** (máx. **6**, los
  primeros en subir) en la ficha, vía `GET /api/photos?breed=` + `BreedMichis`
  (cliente, conserva el SSG). Estado vacío invita a subir ("solo 6 lugares").
- **Michiteca y Michi Plaza** navegan en **rail horizontal** con snap; cada tarjeta
  muestra su contador de michis.

## Créditos de imágenes
Fotos de razas: **Wikimedia Commons** (miniaturas hotlinkeadas). Cada archivo
tiene su propia licencia y autoría; para producción conviene descargar,
auto-hospedar y listar atribución + licencia por imagen. Wikimedia solo sirve
anchos de thumbnail predefinidos, por eso usamos la miniatura dada (330px) o el
original, sin reescalar a anchos arbitrarios.

## Cómo revertir/ajustar
Todo el color vive en la capa de tokens de `:root`. Para pasar a **estación clara**
basta remapear `--surface-0/1/2` y `--text*`; las señales (azul/verde/rojo) se
mantienen. El sistema no depende de imágenes externas (retratos y pictogramas son SVG).

## Líneas de metro (v5)
- La Michiteca es una **red de líneas**: **M1 Razas** (lila `--m1`), **M2 Historia
  michi-humano** (azul `--m2`, orden cronológico) y **M3** (en construcción).
- M1 accent = **lila** en andén (`.info-panel`), progreso, linebars de estación,
  badge y la señal Michiteca del home. Los botones ajenos a M1 (verde comunidad,
  azul Michi Plaza) conservan su color.
- M2: cada estación (`/historia/[slug]`) abre una **galería de 3 imágenes**
  (`PeriodGallery`) con presentación tipo andén, en azul y sin botón de compartir.
- Botones de navegación entre estaciones con **kickers metro** (jerarquía menor):
  "Próxima estación"/"Estación anterior" e indicador **Inicio/Fin de línea**.
- Iconos de sección: **cat-6** (Michiteca) y **cat-5** (Michi Plaza), tamaño mayor.
