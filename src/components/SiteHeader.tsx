import Link from 'next/link';
import { Icon } from '@/components/Icon';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <Link className="wordmark" href="/" aria-label="Miawseo, inicio">
          <span className="roundel" aria-hidden="true">
            <Icon name="roundel" size={22} />
          </span>
          Miawseo
        </Link>
        <nav className="nav" aria-label="Navegación principal">
          <Link href="/michiteca">
            <Icon name="michiteca" size={24} />
            <span>Michiteca</span>
          </Link>
          <Link href="/michi-plaza">
            <Icon name="miawsoleo" size={24} />
            <span>Michi Plaza</span>
          </Link>
          <Link href="/nosotros" data-optional="true">
            <Icon name="info" size={18} />
            <span>El museo</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
