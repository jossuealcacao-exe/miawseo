'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { Lightbox } from '@/components/Lightbox';
import type { MichiPhotoView } from '@/lib/types';

/**
 * Muro/grid de miniaturas cuadradas y uniformes. Cada celda abre el lightbox.
 * La miniatura muestra el nombre y el contador de corazones (lectura); la
 * reacción se hace dentro del lightbox.
 */
export function MichiGrid({
  photos,
  showBreed = false,
}: {
  photos: MichiPhotoView[];
  showBreed?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <>
      <ul className="michi-grid" role="list">
        {photos.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              className="michi-cell"
              onClick={() => setOpen(i)}
              aria-label={`Ver a ${p.catName}${showBreed ? ` (${p.breedName})` : ''}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/media/${p.file}`}
                alt={`Gato ${p.breedName} llamado ${p.catName}`}
                loading="lazy"
              />
              <span className="michi-cell__overlay" aria-hidden="true">
                <span className="michi-cell__name">{p.catName}</span>
                {showBreed && <span className="michi-cell__breed">{p.breedName}</span>}
              </span>
              {p.hearts > 0 && (
                <span className="michi-cell__hearts" aria-hidden="true">
                  <Icon name="heart-fill" size={13} />
                  {p.hearts}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <Lightbox
          photos={photos}
          index={open}
          showBreed={showBreed}
          onClose={() => setOpen(null)}
          onNavigate={setOpen}
        />
      )}
    </>
  );
}
