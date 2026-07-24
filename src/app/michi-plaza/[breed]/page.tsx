import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBreed } from '@/data/breeds';
import { listPhotos } from '@/lib/store';
import { UploadDialog } from '@/components/UploadDialog';
import { PhotoWall } from '@/components/PhotoWall';
import { Icon } from '@/components/Icon';
import type { MichiPhotoView } from '@/lib/types';

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
    description: `Muro público de gatos ${data.name} compartidos por la comunidad Miawseo.`,
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

  const approved = await listPhotos({ status: 'approved' });
  const photos: MichiPhotoView[] = approved.map((p) => ({
    id: p.id,
    file: p.file,
    catName: p.catName,
    note: p.note,
    hearts: p.hearts,
    breedSlug: p.breedSlug,
    breedName: getBreed(p.breedSlug)?.name ?? p.breedSlug,
    width: p.width,
    height: p.height,
  }));
  const own = photos.filter((p) => p.breedSlug === data.slug).length;

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
          {own > 0
            ? `${own} ${own === 1 ? 'michi' : 'michis'} de esta raza en el muro. Filtra o explora el resto de la comunidad.`
            : 'Todavía no hay michis de esta raza. ¡Estrena el muro subiendo el tuyo!'}
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
          Aún no hay fotos aprobadas. Sube la de tu michi: tras pasar por
          moderación aparecerá aquí.
        </div>
      ) : (
        <PhotoWall photos={photos} initialBreed={data.slug} />
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
