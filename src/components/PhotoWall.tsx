'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { MichiGrid } from '@/components/MichiGrid';
import type { MichiPhotoView } from '@/lib/types';

/**
 * Muro público de la Michi Plaza: filtro de razas arriba + grid de fotos de la
 * comunidad (con lightbox y corazones). Ordena por corazones y luego por más
 * reciente, para que lo más querido suba.
 */
export function PhotoWall({
  photos,
  initialBreed = '',
}: {
  photos: MichiPhotoView[];
  initialBreed?: string;
}) {
  const [breed, setBreed] = useState(initialBreed);

  // Razas presentes en el muro, con su conteo, ordenadas por cantidad.
  const breedTabs = useMemo(() => {
    const map = new Map<string, { slug: string; name: string; count: number }>();
    for (const p of photos) {
      const cur = map.get(p.breedSlug);
      if (cur) cur.count += 1;
      else map.set(p.breedSlug, { slug: p.breedSlug, name: p.breedName, count: 1 });
    }
    return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [photos]);

  const visible = useMemo(() => {
    const list = breed ? photos.filter((p) => p.breedSlug === breed) : photos;
    return [...list].sort((a, b) => b.hearts - a.hearts || b.id.localeCompare(a.id));
  }, [photos, breed]);

  if (photos.length === 0) return null;

  return (
    <div>
      <div className="plaza-filter" role="tablist" aria-label="Filtrar por raza">
        <button
          type="button"
          role="tab"
          aria-selected={breed === ''}
          className={`filter-chip${breed === '' ? ' is-active' : ''}`}
          onClick={() => setBreed('')}
        >
          Todas
          <span className="filter-chip__count">{photos.length}</span>
        </button>
        {breedTabs.map((t) => (
          <button
            key={t.slug}
            type="button"
            role="tab"
            aria-selected={breed === t.slug}
            className={`filter-chip${breed === t.slug ? ' is-active' : ''}`}
            onClick={() => setBreed(t.slug)}
          >
            {t.name}
            <span className="filter-chip__count">{t.count}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="empty-state" style={{ marginTop: 'var(--space-5)' }}>
          <Icon name="camera" size={32} />
          No hay michis de esa raza todavía.
        </div>
      ) : (
        <MichiGrid photos={visible} showBreed />
      )}
    </div>
  );
}
