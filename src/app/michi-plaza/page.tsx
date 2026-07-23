import type { Metadata } from 'next';
import Link from 'next/link';
import { BREEDS } from '@/data/breeds';
import { BreedPhoto } from '@/components/BreedPhoto';
import { Icon } from '@/components/Icon';
import { Lead } from '@/components/Lead';
import { approvedCountByBreed } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Michi Plaza — El muro de los michis',
  description:
    'La Michi Plaza es la galería pública de gatos reales de la comunidad Miawseo, organizada por raza. Cada foto pasa por moderación.',
};

export const dynamic = 'force-dynamic';

export default async function MichiPlazaPage() {
  const counts = await approvedCountByBreed();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="container">
      <nav className="ribbon" aria-label="Ruta">
        <Link href="/">
          <Icon name="home" size={16} />
          Inicio
        </Link>
        <span className="sep" aria-hidden="true">
          <Icon name="arrow" size={14} />
        </span>
        <span aria-current="page">Michi Plaza</span>
      </nav>

      <div className="section__head">
        <p className="eyebrow">Muro de la comunidad</p>
        <h1>La Michi Plaza</h1>
        <Lead>
          Aquí viven los michis reales de la comunidad, organizados por raza.
          {total > 0
            ? ` ${total} ${total === 1 ? 'foto aprobada' : 'fotos aprobadas'} hasta ahora.`
            : ' Aún no hay fotos aprobadas — ¡sé el primero en colgar la tuya!'}
        </Lead>
      </div>

      <div className="rail-hint">
        Desliza para recorrer las razas
        <Icon name="arrow" size={16} />
      </div>
      <div className="stations-rail">
        {BREEDS.map((b) => (
          <Link key={b.slug} className="station-card" href={`/michi-plaza/${b.slug}`}>
            <span
              className="station-card__linebar"
              style={{ background: 'var(--m1)' }}
              aria-hidden="true"
            />
            <span className="station-card__dot" aria-hidden="true" />
            <div className="station-card__art">
              <BreedPhoto breed={b} />
            </div>
            <div className="station-card__body">
              <span className="txt">
                <span className="station-card__name">{b.name}</span>
                <span className="station-card__meta" style={{ display: 'block' }}>
                  {counts[b.slug]
                    ? `${counts[b.slug]} ${counts[b.slug] === 1 ? 'michi' : 'michis'}`
                    : 'Sin fotos aún'}
                </span>
              </span>
              <Icon name="arrow" size={22} className="station-card__arrow" />
            </div>
          </Link>
        ))}
      </div>

      <div className="actions" style={{ marginTop: '3rem' }}>
        <Link className="btn btn--primary" href="/michiteca">
          <Icon name="michiteca" size={24} />
          Ir a la Michiteca para subir mi michi
        </Link>
        <Link className="btn btn--ghost" href="/">
          <Icon name="home" size={18} />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
