import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HISTORY, getHistoryStop, historySlugs } from '@/data/history';
import { PeriodGallery } from '@/components/PeriodGallery';
import { Lead } from '@/components/Lead';
import { Icon } from '@/components/Icon';

export function generateStaticParams() {
  return historySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stop = getHistoryStop(slug);
  if (!stop) return { title: 'Periodo no encontrado' };
  return {
    title: `${stop.title} — Línea M2`,
    description: `${stop.date}: ${stop.body}`,
  };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stop = getHistoryStop(slug);
  if (!stop) notFound();

  const total = HISTORY.length;
  const idx = HISTORY.findIndex((h) => h.slug === stop.slug);
  const isFirst = idx === 0;
  const isLast = idx === total - 1;
  const prev = isFirst ? undefined : HISTORY[idx - 1];
  const next = isLast ? undefined : HISTORY[idx + 1];

  return (
    <div className="container" style={{ '--line-color': 'var(--m2)' } as CSSProperties}>
      <nav className="ribbon" aria-label="Ruta">
        <Link href="/">
          <Icon name="home" size={16} />
          Inicio
        </Link>
        <span className="sep" aria-hidden="true">
          <Icon name="arrow" size={14} />
        </span>
        <Link href="/michiteca">Michiteca</Link>
        <span className="sep" aria-hidden="true">
          <Icon name="arrow" size={14} />
        </span>
        <span aria-current="page">M2 · {stop.title}</span>
      </nav>

      <header className="section__head">
        <p className="eyebrow">Línea M2 · {stop.date}</p>
        <h1 style={{ fontSize: 'var(--fs-h1)' }}>{stop.title}</h1>
        <Lead>{stop.body}</Lead>
      </header>

      <PeriodGallery slides={stop.gallery} periodTitle={stop.title} />

      <section
        className="section"
        style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}
        aria-label="Recorrer la línea M2"
      >
        <p className="line-pos">
          <span className="line-badge line-badge--sm" style={{ background: 'var(--m2)' }}>
            M2
          </span>
          {isFirst
            ? 'Inicio de línea'
            : isLast
              ? 'Fin de línea'
              : `Estación ${idx + 1} de ${total}`}
        </p>
        <div className="station-nav">
          {prev ? (
            <Link className="btn btn--ghost btn--nav" href={`/historia/${prev.slug}`}>
              <Icon name="arrow" size={18} rotate={180} />
              <span className="btn--nav__lbl">
                <span className="btn--nav__kicker">Estación anterior</span>
                <span className="btn--nav__name">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span className="btn btn--ghost btn--nav btn--nav-off" aria-hidden="true">
              <Icon name="arrow" size={18} rotate={180} />
              <span className="btn--nav__lbl">
                <span className="btn--nav__kicker">Terminal</span>
                <span className="btn--nav__name">Inicio de línea</span>
              </span>
            </span>
          )}
          {next ? (
            <Link className="btn btn--ghost btn--nav btn--nav-end" href={`/historia/${next.slug}`}>
              <span className="btn--nav__lbl">
                <span className="btn--nav__kicker">Próxima estación</span>
                <span className="btn--nav__name">{next.title}</span>
              </span>
              <Icon name="arrow" size={18} />
            </Link>
          ) : (
            <span className="btn btn--ghost btn--nav btn--nav-end btn--nav-off" aria-hidden="true">
              <span className="btn--nav__lbl">
                <span className="btn--nav__kicker">Terminal</span>
                <span className="btn--nav__name">Fin de línea</span>
              </span>
              <Icon name="arrow" size={18} />
            </span>
          )}
        </div>
      </section>

      <div className="actions" style={{ marginTop: '2rem' }}>
        <Link className="btn btn--ghost" href="/michiteca">
          <Icon name="michiteca" size={24} />
          Volver a la Michiteca
        </Link>
      </div>
    </div>
  );
}
