import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BREEDS, getBreed, breedSlugs } from '@/data/breeds';
import { BreedPhoto } from '@/components/BreedPhoto';
import { Slideshow } from '@/components/Slideshow';
import { BreedMichis } from '@/components/BreedMichis';
import { Icon } from '@/components/Icon';
import { Lead } from '@/components/Lead';

export function generateStaticParams() {
  return breedSlugs().map((breed) => ({ breed }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ breed: string }>;
}): Promise<Metadata> {
  const { breed } = await params;
  const data = getBreed(breed);
  if (!data) return { title: 'Raza no encontrada' };
  return {
    title: `${data.name} — Exposición`,
    description: `${data.tagline} Origen: ${data.origin}. Recorre la exposición inmersiva de la raza ${data.name} en Miawseo.`,
    alternates: { canonical: `/michiteca/${data.slug}` },
  };
}

export default async function BreedPage({
  params,
}: {
  params: Promise<{ breed: string }>;
}) {
  const { breed } = await params;
  const data = getBreed(breed);
  if (!data) notFound();

  const total = BREEDS.length;
  const idx = BREEDS.findIndex((b) => b.slug === data.slug);
  const isFirst = idx === 0;
  const isLast = idx === total - 1;
  // Línea lineal: sin dar la vuelta. El inicio no tiene anterior; el fin no tiene siguiente.
  const prev = isFirst ? undefined : BREEDS[idx - 1];
  const next = isLast ? undefined : BREEDS[idx + 1];

  return (
    <div className="container" style={{ '--line-color': 'var(--m1)' } as CSSProperties}>
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
        <span aria-current="page">{data.name}</span>
      </nav>

      <header className="section__head">
        <p className="eyebrow">{data.origin}</p>
        <h1 style={{ fontSize: 'var(--fs-h1)' }}>{data.name}</h1>
        <Lead>{data.tagline}</Lead>
      </header>

      <Slideshow
        slides={data.slides}
        breedSlug={data.slug}
        breedName={data.name}
        art={<BreedPhoto breed={data} full />}
      />

      <section className="section" aria-label="Datos rápidos">
        <p className="eyebrow">Ficha de estación</p>
        <h2 style={{ fontSize: 'var(--fs-h3)', marginTop: '0.5rem' }}>Datos rápidos</h2>
        <ul className="quickfacts">
          {data.quickFacts.map((f) => (
            <li key={f.label}>
              <span className="k">{f.label}</span>
              <div className="v">{f.value}</div>
            </li>
          ))}
        </ul>
      </section>

      <BreedMichis breedSlug={data.slug} breedName={data.name} />

      <section
        className="section"
        style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}
        aria-label="Continuar el recorrido"
      >
        <p className="line-pos">
          <span className="line-badge line-badge--sm" style={{ background: 'var(--m1)' }}>
            M1
          </span>
          {isFirst
            ? 'Inicio de línea'
            : isLast
              ? 'Fin de línea'
              : `Estación ${idx + 1} de ${total}`}
        </p>
        <div className="station-nav" style={{ marginBottom: 'var(--space-5)' }}>
          {prev ? (
            <Link className="btn btn--ghost btn--nav" href={`/michiteca/${prev.slug}`}>
              <Icon name="arrow" size={18} rotate={180} />
              <span className="btn--nav__lbl">
                <span className="btn--nav__kicker">Estación anterior</span>
                <span className="btn--nav__name">{prev.name}</span>
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
            <Link className="btn btn--ghost btn--nav btn--nav-end" href={`/michiteca/${next.slug}`}>
              <span className="btn--nav__lbl">
                <span className="btn--nav__kicker">Próxima estación</span>
                <span className="btn--nav__name">{next.name}</span>
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
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="actions">
            <Link className="btn btn--primary" href={`/michi-plaza/${data.slug}`}>
              <Icon name="miawsoleo" size={24} />
              {data.name} en la Michi Plaza
            </Link>
            <Link className="btn btn--ghost" href="/michiteca">
              <Icon name="michiteca" size={24} />
              Volver a la Michiteca
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
