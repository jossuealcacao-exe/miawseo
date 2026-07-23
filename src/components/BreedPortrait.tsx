import type { BreedPalette } from '@/lib/types';

/**
 * Retrato generativo de cada raza como "obra" del museo.
 * SVG determinista (mismo seed => mismo trazo), sin recursos externos,
 * para respetar la CSP y evitar dependencias de imagenes.
 */
export function BreedPortrait({
  palette,
  seed,
  title,
}: {
  palette: BreedPalette;
  seed: number;
  title: string;
}) {
  // PRNG determinista simple (mulberry32).
  let s = seed >>> 0;
  const rnd = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const earTilt = 4 + rnd() * 10;
  const eyeOffset = 26 + rnd() * 6;
  const cheek = 118 + rnd() * 14;
  const whisker = rnd() > 0.5;

  return (
    <svg
      viewBox="0 0 320 400"
      role="img"
      aria-label={`Retrato estilizado de ${title}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Lienzo plano (estética de póster de señal) */}
      <rect width="320" height="400" fill={palette.base} />

      {/* Banda de color de línea arriba */}
      <rect x="0" y="0" width="320" height="10" fill={palette.accent} />

      {/* Marco interior */}
      <rect
        x="14"
        y="20"
        width="292"
        height="366"
        fill="none"
        stroke={palette.accent}
        strokeOpacity="0.55"
        strokeWidth="2"
      />

      {/* Cabeza */}
      <g fill={palette.ink}>
        {/* Orejas */}
        <path d={`M110 ${150 - earTilt} L96 96 L150 132 Z`} />
        <path d={`M210 ${150 - earTilt} L224 96 L170 132 Z`} />
        {/* Cara */}
        <path
          d={`M160 130
             C ${cheek} 130, 92 168, 96 226
             C 100 292, 132 330, 160 330
             C 188 330, 220 292, 224 226
             C 228 168, ${320 - cheek} 130, 160 130 Z`}
        />
      </g>

      {/* Interior de orejas */}
      <path d={`M112 140 L104 108 L138 130 Z`} fill={palette.accent} opacity="0.85" />
      <path d={`M208 140 L216 108 L182 130 Z`} fill={palette.accent} opacity="0.85" />

      {/* Ojos */}
      <g fill={palette.accent}>
        <ellipse cx={160 - eyeOffset} cy="214" rx="14" ry="18" />
        <ellipse cx={160 + eyeOffset} cy="214" rx="14" ry="18" />
      </g>
      <g fill={palette.base}>
        <ellipse cx={160 - eyeOffset} cy="214" rx="5" ry="14" />
        <ellipse cx={160 + eyeOffset} cy="214" rx="5" ry="14" />
      </g>

      {/* Nariz + boca */}
      <path d="M154 250 L166 250 L160 260 Z" fill={palette.accent} />
      <path
        d="M160 260 C 160 272, 148 276, 142 270 M160 260 C 160 272, 172 276, 178 270"
        fill="none"
        stroke={palette.accent}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Bigotes */}
      {whisker && (
        <g stroke={palette.base} strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round">
          <line x1="120" y1="256" x2="60" y2="248" />
          <line x1="120" y1="264" x2="62" y2="270" />
          <line x1="200" y1="256" x2="260" y2="248" />
          <line x1="200" y1="264" x2="258" y2="270" />
        </g>
      )}

      {/* Placa de museo */}
      <rect x="120" y="352" width="80" height="4" rx="2" fill={palette.accent} opacity="0.7" />
    </svg>
  );
}
