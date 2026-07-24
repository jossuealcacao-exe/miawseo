'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Icon } from '@/components/Icon';
import { HeartButton } from '@/components/HeartButton';
import type { MichiPhotoView } from '@/lib/types';

/**
 * Visor modal (lightbox) de una foto de la comunidad: imagen completa sin
 * recorte, nombre/mensaje del michi, reacción con corazón y navegación entre
 * fotos del set. Accesible: rol dialog, foco inicial, ESC y flechas, bloqueo
 * de scroll del fondo.
 */
export function Lightbox({
  photos,
  index,
  showBreed = false,
  onClose,
  onNavigate,
}: {
  photos: MichiPhotoView[];
  index: number;
  showBreed?: boolean;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  const go = useCallback(
    (dir: -1 | 1) => {
      const next = index + dir;
      if (next >= 0 && next < photos.length) onNavigate(next);
    },
    [index, photos.length, onNavigate],
  );

  useEffect(() => {
    closeRef.current?.focus();
  }, [index]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    }
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, go]);

  if (!photo) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Foto de ${photo.catName}`}
      onClick={onClose}
    >
      <button
        type="button"
        className="lightbox__close"
        onClick={onClose}
        aria-label="Cerrar"
        ref={closeRef}
      >
        <Icon name="close" size={22} />
      </button>

      {hasPrev && (
        <button
          type="button"
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label="Foto anterior"
        >
          <Icon name="arrow" size={24} rotate={180} />
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label="Foto siguiente"
        >
          <Icon name="arrow" size={24} />
        </button>
      )}

      <figure className="lightbox__panel" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox__stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/media/${photo.file}`}
            alt={`Gato ${photo.breedName} llamado ${photo.catName}`}
            className="lightbox__img"
          />
        </div>
        <figcaption className="lightbox__info">
          <div className="lightbox__meta">
            <span className="lightbox__name">{photo.catName}</span>
            {showBreed && <span className="lightbox__breed">{photo.breedName}</span>}
            {photo.note ? <p className="lightbox__note">{photo.note}</p> : null}
          </div>
          <HeartButton photoId={photo.id} initialHearts={photo.hearts} size="lg" />
        </figcaption>
      </figure>
    </div>
  );
}
