'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { UploadDialog } from '@/components/UploadDialog';
import { MichiGrid } from '@/components/MichiGrid';
import type { MichiPhotoView } from '@/lib/types';

/**
 * Contador de dueños de la raza + grid de los primeros michis subidos
 * (aprobados) a la Michi Plaza, con lightbox y corazones. Se hidrata en cliente
 * para no romper el SSG de la ficha de raza.
 */
export function BreedMichis({
  breedSlug,
  breedName,
}: {
  breedSlug: string;
  breedName: string;
}) {
  const [count, setCount] = useState<number | null>(null);
  const [photos, setPhotos] = useState<MichiPhotoView[]>([]);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    let live = true;
    fetch(`/api/photos?breed=${encodeURIComponent(breedSlug)}`)
      .then((r) => r.json())
      .then((d: { ok?: boolean; count?: number; limit?: number; photos?: MichiPhotoView[] }) => {
        if (!live || !d.ok) return;
        setCount(d.count ?? 0);
        setPhotos(d.photos ?? []);
        if (d.limit) setLimit(d.limit);
      })
      .catch(() => {
        if (live) setCount(0);
      });
    return () => {
      live = false;
    };
  }, [breedSlug]);

  const n = count ?? 0;

  return (
    <section className="section" aria-label={`Michis ${breedName} de la comunidad`}>
      <p className="eyebrow">Comunidad</p>
      <h2 style={{ fontSize: 'var(--fs-h3)', marginTop: '0.5rem' }}>
        Dueños de {breedName}
      </h2>

      <div className="owner-count" aria-live="polite">
        <span className="chip chip--sm" aria-hidden="true">
          <Icon name="paw" size={18} />
        </span>
        <span>
          <strong>{count === null ? '—' : n}</strong>{' '}
          {n === 1 ? 'michi comparte' : 'michis comparten'} esta raza en la Michi Plaza
          {n > limit ? ` · mostrando los primeros ${limit}` : ''}
        </span>
      </div>

      {n === 0 ? (
        <div className="empty-state" style={{ marginTop: 'var(--space-4)' }}>
          <Icon name="camera" size={32} />
          Los primeros {limit} michis {breedName} en subir su foto quedarán
          exhibidos en esta estación de la Michi Plaza. ¡Aún hay lugar!
          <div style={{ marginTop: 'var(--space-3)' }}>
            <UploadDialog breedSlug={breedSlug} breedName={breedName} />
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 'var(--space-4)' }}>
          <MichiGrid photos={photos} />
        </div>
      )}
    </section>
  );
}
