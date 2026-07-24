import Link from 'next/link';
import { Icon } from '@/components/Icon';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <p
            className="wordmark"
            style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}
          >
            <span className="roundel" aria-hidden="true" style={{ width: 28, height: 28 }}>
              <Icon name="roundel" size={18} />
            </span>
            Miawseo
          </p>
          <p style={{ margin: 0, maxWidth: '42ch' }}>
            Museo inmersivo de razas felinas. Contenido curatorial de
            divulgación; no sustituye la orientación veterinaria.
          </p>
          <p className="footer-credit">
            Proyecto interactivo creado por <strong>Jossué Alcalá</strong>.
          </p>
        </div>
        <nav aria-label="Rutas del sitio" style={{ display: 'grid', gap: '0.5rem' }}>
          <Link href="/michiteca">Michiteca</Link>
          <Link href="/michi-plaza">Michi Plaza</Link>
          <Link href="/nosotros">El museo</Link>
        </nav>
      </div>
    </footer>
  );
}
