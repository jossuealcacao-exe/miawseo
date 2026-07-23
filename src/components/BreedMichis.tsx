'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { UploadDialog } from '@/components/UploadDialog';

interface MichiPhoto {
  id: string;
  catName: string;
  note: string;
  file: string;
  width: number;
  height: number;
}

/**
 * Contador de dueños de la raza + carrusel de los primeros 6 michis subidos
 * (aprobados) a la Michi Plaza. Se hidrata en cliente para no romper el SSG de la
 * ficha de raza.
 */
export function BreedMichis({
  breedSlug,
  breedName,
}: {
  breedSlug: string;
  breedName: string;
}) {
  const [count, setCount] = useState<number | null>(null);
  const [photos, setPhotos] = useState<MichiPhoto[]>([]);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    let live = true;
    fetch(`/api/photos?breed=${encodeURIComponent(breedSlug)}`)
      .then((r) => r.json())
      .then((d: { ok?: boolean; count?: number; limit?: number; photos?: MichiPhoto[] }) => {
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
        <>
          <div className="rail-hint" style={{ marginTop: 'var(--space-4)' }}>
            Desliza
            <Icon name="arrow" size={16} />
          </div>
          <div className="michi-rail">
            {photos.map((p) => (
              <figure key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/media/${p.file}`}
                  alt={`Gato ${breedName} llamado ${p.catName}`}
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
    </section>
  );
}
