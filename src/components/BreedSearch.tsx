'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { BreedPhoto } from '@/components/BreedPhoto';
import { Icon } from '@/components/Icon';
import type { Breed } from '@/lib/types';

/** Buscador cliente sobre el catálogo de razas (nombre, origen, tagline). */
export function BreedSearch({
  breeds,
  counts,
}: {
  breeds: Breed[];
  counts: Record<string, number>;
}) {
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return breeds;
    return breeds.filter((b) =>
      [b.name, b.origin, b.tagline].join(' ').toLowerCase().includes(needle),
    );
  }, [q, breeds]);

  return (
    <div>
      <div className="search" style={{ marginBottom: '2rem' }}>
        <label htmlFor="breed-q" className="visually-hidden">
          Buscar raza de gato
        </label>
        <Icon name="search" size={22} />
        <input
          id="breed-q"
          className="input"
          type="search"
          placeholder="Busca una raza… (ej. siamés, maine, sphynx)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <p className="muted" aria-live="polite" style={{ margin: 0 }}>
          {results.length} {results.length === 1 ? 'estación' : 'estaciones'} en la red
        </p>
        {results.length > 1 && (
          <span className="rail-hint">
            Desliza
            <Icon name="arrow" size={16} />
          </span>
        )}
      </div>

      {results.length === 0 ? (
        <div className="empty-state">
          <Icon name="search" size={32} />
          No encontramos esa raza en la Michiteca todavía. Prueba con otro nombre.
        </div>
      ) : (
        <div className="stations-rail">
          {results.map((b) => {
            const pos = breeds.indexOf(b);
            const terminus =
              pos === 0 ? 'Inicio de línea' : pos === breeds.length - 1 ? 'Fin de línea' : null;
            return (
            <Link key={b.slug} className="station-card" href={`/michiteca/${b.slug}`}>
              <span
                className="station-card__linebar"
                style={{ background: 'var(--m1)' }}
                aria-hidden="true"
              />
              <span className="station-card__dot" aria-hidden="true" />
              {terminus ? (
                <span className="line-terminus" style={{ background: 'var(--m1)' }}>
                  {terminus}
                </span>
              ) : null}
              <div className="station-card__art">
                <BreedPhoto breed={b} />
              </div>
              <div className="station-card__body">
                <span className="txt">
                  <span className="station-card__name">{b.name}</span>
                  <span className="station-card__meta" style={{ display: 'block' }}>
                    {b.origin}
                  </span>
                  {counts[b.slug] ? (
                    <span className="badge" style={{ marginTop: 6 }}>
                      <Icon name="camera" size={13} />
                      {counts[b.slug]}
                    </span>
                  ) : null}
                </span>
                <Icon name="arrow" size={22} className="station-card__arrow" />
              </div>
            </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
