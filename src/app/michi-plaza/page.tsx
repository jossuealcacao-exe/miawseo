import type { Metadata } from 'next';
import Link from 'next/link';
import { getBreed } from '@/data/breeds';
import { Icon } from '@/components/Icon';
import { Lead } from '@/components/Lead';
import { PhotoWall } from '@/components/PhotoWall';
import { listPhotos } from '@/lib/store';
import type { MichiPhotoView } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Michi Plaza — El muro de los michis',
  description:
    'La Michi Plaza es el muro público de gatos reales de la comunidad Miawseo. Explora las fotos, filtra por raza y reacciona con un corazón. Cada foto pasa por moderación.',
};

export const dynamic = 'force-dynamic';

export default async function MichiPlazaPage() {
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
  const total = photos.length;

  return (
    <div className="container">
      <nav className="ribbon" aria-label="Ruta">
        <Link href="/">
          <Icon name="home" size={16} />
          Inicio
        </Link>
        <span className="sep" aria-hidden="true">
          <Icon name="arrow" size={14} />
        </span>
        <span aria-current="page">Michi Plaza</span>
      </nav>

      <div className="section__head">
        <p className="eyebrow">Muro de la comunidad</p>
        <h1>La Michi Plaza</h1>
        <Lead>
          El muro de los michis reales de la comunidad.
          {total > 0
            ? ` ${total} ${total === 1 ? 'foto' : 'fotos'} en exhibición. Filtra por raza y deja un corazón a tu favorito.`
            : ' Aún no hay fotos aprobadas — ¡sé el primero en colgar la tuya!'}
        </Lead>
      </div>

      {total === 0 ? (
        <div className="empty-state">
          <Icon name="camera" size={32} />
          Todavía no hay michis en el muro. Sube el tuyo desde la ficha de su raza
          en la Michiteca; tras moderación aparecerá aquí.
        </div>
      ) : (
        <PhotoWall photos={photos} />
      )}

      <div className="actions" style={{ marginTop: '3rem' }}>
        <Link className="btn btn--primary" href="/michiteca">
          <Icon name="michiteca" size={24} />
          Subir mi michi en la Michiteca
        </Link>
        <Link className="btn btn--ghost" href="/">
          <Icon name="home" size={18} />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
