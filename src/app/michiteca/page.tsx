import type { Metadata } from 'next';
import Link from 'next/link';
import { BREEDS } from '@/data/breeds';
import { BreedSearch } from '@/components/BreedSearch';
import { Icon } from '@/components/Icon';
import { Lead } from '@/components/Lead';
import { LineHeader } from '@/components/LineHeader';
import { HistoryLine } from '@/components/HistoryLine';
import { approvedCountByBreed } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Michiteca — Exposición de razas',
  description:
    'La Michiteca reúne las razas de gato del museo Miawseo. Busca una raza y entra a su exposición inmersiva.',
};

// Los conteos de la Michi Plaza dependen de datos dinamicos.
export const dynamic = 'force-dynamic';

export default async function MichitecaPage() {
  const counts = await approvedCountByBreed();
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
        <span aria-current="page">Michiteca</span>
      </nav>

      <div className="section__head">
        <p className="eyebrow">Exposición permanente</p>
        <h1>La Michiteca</h1>
        <Lead>
          Una red de líneas de metro felino: la <strong>M1</strong> recorre las
          razas y la <strong>M2</strong> cuenta la historia entre michis y
          humanos. Usa el buscador para ir directo a tu michi favorito.
        </Lead>
      </div>

      <LineHeader
        line="M1"
        name="Razas"
        color="var(--m1)"
        desc="Cada estación es una raza. 20 paradas por recorrer."
      />
      <BreedSearch breeds={BREEDS} counts={counts} />

      <LineHeader
        line="M2"
        name="Michis y humanos"
        color="#0B57D0"
        desc="La historia felina, estación por estación, en orden cronológico."
      />
      <HistoryLine />

      <LineHeader
        line="M3"
        name="Nueva línea"
        color="#5b6472"
        desc="Próxima ruta en obras."
      />
      <div className="construction">
        <span className="info-sq" aria-hidden="true">
          <Icon name="clock" size={22} />
        </span>
        <span>
          <strong>En construcción.</strong> Estamos tendiendo nuevas vías para
          la M3. Vuelve pronto para descubrir la siguiente parada.
        </span>
      </div>

      <div className="actions" style={{ marginTop: '3rem' }}>
        <Link className="btn btn--ghost" href="/michi-plaza">
          <Icon name="miawsoleo" size={24} />
          Ver la Michi Plaza
        </Link>
        <Link className="btn btn--ghost" href="/">
          <Icon name="home" size={18} />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
