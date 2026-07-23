'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { BreedSlide } from '@/lib/types';
import { UploadDialog } from '@/components/UploadDialog';
import { Icon } from '@/components/Icon';

export function Slideshow({
  slides,
  art,
  breedSlug,
  breedName,
}: {
  slides: BreedSlide[];
  art: ReactNode;
  breedSlug: string;
  breedName: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = slides.length;

  // Desliza el track hasta la sala i (scroll-snap hace el resto).
  const go = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(total - 1, i));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
  }, [total]);

  // Sincroniza el índice (puntos, "Andén X de N") con el scroll real.
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

  // Flechas del teclado (cuando el foco no está en un campo).
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
    <section
      className="expo"
      aria-roledescription="carrusel"
      aria-label={`Exposición de ${breedName}`}
    >
      <div className="expo__art">{art}</div>

      <div className="platform">
        <div
          className="track"
          ref={trackRef}
          tabIndex={0}
          aria-label={`Salas de ${breedName}. Desliza para recorrerlas.`}
        >
          {slides.map((slide, i) => (
            <article
              key={slide.room}
              className="slide info-panel"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${total}: ${slide.title}`}
              aria-hidden={i !== index}
            >
              <span className="platform-tag">
                <Icon name="info" size={15} />
                {slide.room}
              </span>
              <h2>{slide.title}</h2>
              <p>{slide.body}</p>

              {slide.stats && slide.stats.length > 0 && (
                <dl className="expo__stats">
                  {slide.stats.map((st) => (
                    <div key={st.label}>
                      <dt>{st.label}</dt>
                      <dd>{st.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>
          ))}
        </div>

        <div className="expo__controls">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="arrow-btn"
              onClick={() => go(index - 1)}
              aria-label="Sala anterior"
              disabled={index === 0}
            >
              <Icon name="arrow" size={22} rotate={180} />
            </button>
            <button
              type="button"
              className="arrow-btn"
              onClick={() => go(index + 1)}
              aria-label="Sala siguiente"
              disabled={index === total - 1}
            >
              <Icon name="arrow" size={22} />
            </button>
          </div>

          <div className="line-progress" role="tablist" aria-label="Ir a una sala">
            {slides.map((s, i) => (
              <button
                key={s.room}
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
          Andén {index + 1} de {total}
        </p>

        <div style={{ marginTop: '1.5rem' }}>
          <UploadDialog breedSlug={breedSlug} breedName={breedName} />
        </div>
      </div>
    </section>
  );
}
