'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { GallerySlide } from '@/data/history';
import { Icon } from '@/components/Icon';

/**
 * Galería de un periodo (línea M2): carrusel donde cada diapositiva es
 * imagen + panel de info. Se puede deslizar lateralmente (incluida la imagen),
 * con flechas y puntos. SIN botón de compartir.
 */
export function PeriodGallery({
  slides,
  periodTitle,
}: {
  slides: GallerySlide[];
  periodTitle: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const go = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(total - 1, i));
      track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
    },
    [total],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = track.clientWidth || 1;
        setIndex(Math.round(track.scrollLeft / w));
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      if (el && ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return;
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go]);

  return (
    <section aria-roledescription="galería" aria-label={`Galería de ${periodTitle}`}>
      <div className="gtrack" ref={trackRef} tabIndex={0} aria-label={`Imágenes de ${periodTitle}. Desliza para verlas.`}>
        {slides.map((s, i) => (
          <article
            className="gslide"
            key={s.title}
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${total}: ${s.title}`}
            aria-hidden={i !== index}
          >
            <div className="expo__art">
              {s.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.image} alt={s.title} loading={i === 0 ? undefined : 'lazy'} />
              ) : (
                <span className="gallery-ph" aria-hidden="true">
                  <Icon name="clock" size={56} />
                </span>
              )}
            </div>
            <div className="info-panel info-panel--m2">
              <span className="platform-tag">
                <Icon name="info" size={15} />
                Imagen {i + 1} de {total}
              </span>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="expo__controls">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="arrow-btn"
            onClick={() => go(index - 1)}
            aria-label="Imagen anterior"
            disabled={index === 0}
          >
            <Icon name="arrow" size={22} rotate={180} />
          </button>
          <button
            type="button"
            className="arrow-btn"
            onClick={() => go(index + 1)}
            aria-label="Imagen siguiente"
            disabled={index === total - 1}
          >
            <Icon name="arrow" size={22} />
          </button>
        </div>

        <div className="line-progress line-progress--m2" role="tablist" aria-label="Ir a una imagen">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className="stop"
              aria-current={i === index}
              aria-label={`Ir a: ${s.title}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>

      <p className="muted" aria-live="polite" style={{ marginTop: '0.75rem' }}>
        Imagen {index + 1} de {total}
      </p>
    </section>
  );
}
