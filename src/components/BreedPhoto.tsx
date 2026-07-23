'use client';

import { useEffect, useRef, useState } from 'react';
import { BreedPortrait } from '@/components/BreedPortrait';
import type { Breed } from '@/lib/types';

/**
 * Deriva la URL del archivo original a partir de la miniatura de Wikimedia.
 * thumb: …/commons/thumb/x/xx/File.jpg/330px-File.jpg
 * full:  …/commons/x/xx/File.jpg
 * (Wikimedia solo acepta ANCHOS de thumbnail predefinidos por archivo, así que
 *  no reescalamos a anchos arbitrarios: usamos el thumb dado o el original.)
 */
function fullUrl(thumb: string): string {
  return thumb.replace('/thumb/', '/').replace(/\/\d+px-[^/]+$/, '');
}

/**
 * Foto real de la raza (Wikimedia Commons). Si la imagen no carga (URL caída o
 * sin red), cae al retrato SVG generado para no dejar el hueco vacío.
 */
export function BreedPhoto({
  breed,
  full = false,
}: {
  breed: Breed;
  /** true = imagen original (panel de arte); false = miniatura 330px (tarjetas). */
  full?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Captura fallos ocurridos antes de la hidratación (onError ya no dispararía).
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (!breed.photo || failed) {
    return <BreedPortrait palette={breed.palette} seed={breed.seed} title={breed.name} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={full ? fullUrl(breed.photo) : breed.photo}
      alt={`Gato de raza ${breed.name}`}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}
