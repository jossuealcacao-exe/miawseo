import Link from 'next/link';
import { HISTORY } from '@/data/history';
import { Icon } from '@/components/Icon';

/**
 * Línea M2 — rail horizontal de estaciones históricas (fecha + imagen + título),
 * en orden cronológico ascendente. Cada tarjeta abre la galería del periodo.
 */
export function HistoryLine() {
  return (
    <div className="hist-rail" aria-label="Historia entre michis y humanos">
      {HISTORY.map((h, i) => {
        const terminus =
          i === 0 ? 'Inicio de línea' : i === HISTORY.length - 1 ? 'Fin de línea' : null;
        return (
        <Link className="hist-card" href={`/historia/${h.slug}`} key={h.slug}>
          <span className="hist-stop" aria-hidden="true" />
          {terminus ? (
            <span className="line-terminus" style={{ background: 'var(--m2)' }}>
              {terminus}
            </span>
          ) : null}
          <span className="hist-thumb">
            {h.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={h.image} alt={h.title} loading="lazy" />
            ) : (
              <span className="hist-ph" aria-hidden="true">
                <Icon name="clock" size={28} />
              </span>
            )}
          </span>
          <span className="hist-date">{h.date}</span>
          <h3 className="hist-title">{h.title}</h3>
          <p className="hist-body">{h.body}</p>
          <span className="hist-cta">
            Ver galería
            <Icon name="arrow" size={14} />
          </span>
        </Link>
        );
      })}
    </div>
  );
}
