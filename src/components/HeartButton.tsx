'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';

const LS_KEY = 'miawseo:hearts';

function readHearted(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function writeHearted(set: Set<string>): void {
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify([...set]));
  } catch {
    /* almacenamiento no disponible: la reacción sigue siendo optimista */
  }
}

/**
 * Botón de corazón con contador. Un corazón por navegador y foto (localStorage);
 * el total lo persiste el servidor. Optimista: revierte si la petición falla.
 */
export function HeartButton({
  photoId,
  initialHearts,
  size = 'sm',
  onChange,
}: {
  photoId: string;
  initialHearts: number;
  size?: 'sm' | 'lg';
  /** Se llama con el nuevo total para que el padre (grid) lo refleje al instante. */
  onChange?: (hearts: number) => void;
}) {
  const [hearts, setHearts] = useState(initialHearts);
  const [hearted, setHearted] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setHearted(readHearted().has(photoId));
  }, [photoId]);

  async function toggle() {
    if (busy) return;
    const next = !hearted;
    const action = next ? 'add' : 'remove';
    // Optimista: actualiza al instante local y avisa al padre.
    const optimistic = Math.max(0, hearts + (next ? 1 : -1));
    setHearted(next);
    setHearts(optimistic);
    onChange?.(optimistic);
    setBusy(true);

    const stored = readHearted();
    if (next) stored.add(photoId);
    else stored.delete(photoId);
    writeHearted(stored);

    try {
      const res = await fetch('/api/photos/heart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: photoId, action }),
      });
      const data: { ok?: boolean; hearts?: number } = await res.json();
      if (!res.ok || !data.ok || typeof data.hearts !== 'number') throw new Error();
      setHearts(data.hearts); // sincroniza con el total real del servidor
      onChange?.(data.hearts);
    } catch {
      // Revierte en caso de error.
      setHearted(!next);
      setHearts(hearts);
      onChange?.(hearts);
      const revert = readHearted();
      if (next) revert.delete(photoId);
      else revert.add(photoId);
      writeHearted(revert);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      className={`heart-btn heart-btn--${size}${hearted ? ' is-active' : ''}`}
      onClick={toggle}
      aria-pressed={hearted}
      aria-label={
        hearted ? 'Quitar corazón' : 'Dar corazón a este michi'
      }
    >
      {/* Siempre relleno para que el corazón se vea claro; el estado "ya lo diste"
          se distingue por el borde/escala del botón (.is-active). */}
      <Icon name="heart-fill" size={size === 'lg' ? 24 : 18} />
      <span className="heart-btn__count">{hearts}</span>
    </button>
  );
}
