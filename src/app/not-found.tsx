import Link from 'next/link';
import { Icon } from '@/components/Icon';

export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-9)', textAlign: 'center' }}>
      <span className="roundel" aria-hidden="true" style={{ width: 56, height: 56, marginInline: 'auto' }}>
        <Icon name="close" size={30} />
      </span>
      <p className="eyebrow" style={{ marginTop: 'var(--space-4)' }}>
        Andén 404
      </p>
      <h1 style={{ fontSize: 'var(--fs-h1)', margin: '1rem 0' }}>
        Este michi tomó otra línea
      </h1>
      <p className="lead" style={{ marginInline: 'auto' }}>
        La parada que buscas no está en la red. Vuelve a la entrada o continúa el
        recorrido.
      </p>
      <div className="actions" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
        <Link className="btn btn--primary" href="/">
          <Icon name="home" size={18} />
          Ir al inicio
        </Link>
        <Link className="btn btn--ghost" href="/michiteca">
          <Icon name="michiteca" size={24} />
          Ir a la Michiteca
        </Link>
      </div>
    </div>
  );
}
