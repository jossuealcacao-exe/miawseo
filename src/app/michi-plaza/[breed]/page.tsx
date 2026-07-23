import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBreed } from '@/data/breeds';
import { listPhotos } from '@/lib/store';
import { UploadDialog } from '@/components/UploadDialog';
import { Icon } from '@/components/Icon';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ breed: string }>;
}): Promise<Metadata> {
  const { breed } = await params;
  const data = getBreed(breed);
  if (!data) return { title: 'Raza no encontrada' };
  return {
    title: `${data.name} en la Michi Plaza`,
    description: `Galería pública de gatos ${data.name} compartidos por la comunidad Miawseo.`,
  };
}

export default async function MichiPlazaBreedPage({
  params,
}: {
  params: Promise<{ breed: string }>;
}) {
  const { breed } = await params;
  const data = getBreed(breed);
  if (!data) notFound();

  const photos = await listPhotos({ status: 'approved', breedSlug: data.slug });

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
        <Link href="/michi-plaza">Michi Plaza</Link>
        <span className="sep" aria-hidden="true">
          <Icon name="arrow" size={14} />
        </span>
        <span aria-current="page">{data.name}</span>
      </nav>

      <div className="section__head">
        <p className="eyebrow">Michi Plaza · {data.origin}</p>
        <h1 style={{ fontSize: 'var(--fs-h1)' }}>Michis {data.name}</h1>
        <p className="lead">
          {photos.length > 0
            ? `${photos.length} ${photos.length === 1 ? 'michi aprobado' : 'michis aprobados'} de la comunidad.`
            : 'Todavía no hay michis de esta raza. ¡Estrena el muro!'}
        </p>
      </div>

      <div className="actions" style={{ marginBottom: '2rem' }}>
        <UploadDialog breedSlug={data.slug} breedName={data.name} />
        <Link className="btn btn--ghost" href={`/michiteca/${data.slug}`}>
          <Icon name="michiteca" size={24} />
          Ver la exposición de {data.name}
        </Link>
      </div>

      {photos.length === 0 ? (
        <div className="empty-state">
          <Icon name="camera" size={32} />
          Aún no hay fotos aprobadas de {data.name}. Sube la de tu michi: tras
          pasar por moderación aparecerá aquí.
        </div>
      ) : (
        <>
          {photos.length > 1 && (
            <div className="rail-hint">
              Desliza
              <Icon name="arrow" size={16} />
            </div>
          )}
          <div className="michi-rail">
            {photos.map((p) => (
              <figure key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/media/${p.file}`}
                  alt={`Gato ${data.name} llamado ${p.catName}`}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                />
                <figcaption>
                  <span className="cap-name">{p.catName}</span>
                  {p.note ? <span className="cap-note">{p.note}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}

      <div className="actions" style={{ marginTop: '3rem' }}>
        <Link className="btn btn--ghost" href="/michi-plaza">
          <Icon name="arrow" size={18} rotate={180} />
          Volver a la Michi Plaza
        </Link>
        <Link className="btn btn--ghost" href="/michiteca">
          <Icon name="michiteca" size={24} />
          Ir a la Michiteca
        </Link>
      </div>
    </div>
  );
}
