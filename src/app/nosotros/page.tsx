import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'El museo',
  description:
    'Qué es Miawseo, cómo funciona la Michiteca y la Michi Plaza, y las reglas del muro público.',
};

export default function NosotrosPage() {
  return (
    <div className="container" style={{ paddingBlock: '2rem', maxWidth: '80ch' }}>
      <nav className="ribbon" aria-label="Ruta">
        <Link href="/">
          <Icon name="home" size={16} />
          Inicio
        </Link>
        <span className="sep" aria-hidden="true">
          <Icon name="arrow" size={14} />
        </span>
        <span aria-current="page">El museo</span>
      </nav>

      <div className="section__head">
        <p className="eyebrow">Sobre Miawseo</p>
        <h1 style={{ fontSize: 'var(--fs-h1)' }}>Un museo para los michis</h1>
      </div>

      <div className="stack" style={{ maxWidth: '68ch' }}>
        <p>
          <strong>Miawseo</strong> es una galería inmersiva donde cada raza de
          gato se presenta como una obra. La <Link href="/michiteca">Michiteca</Link>{' '}
          es la exposición permanente: entras a la sala de cada raza y recorres
          su origen, anatomía, carácter, cuidados y curiosidades.
        </p>
        <p>
          La <Link href="/michi-plaza">Michi Plaza</Link> es el muro de la comunidad:
          fotos reales de michis, organizadas por raza. Cualquiera puede subir la
          foto de su gato desde la exposición de su raza con el botón{' '}
          <em>“Yo tengo uno”</em>.
        </p>

        <h2 style={{ fontSize: 'var(--fs-h2)', marginTop: '1.5rem' }}>
          Reglas del muro público
        </h2>
        <ul>
          <li>Toda foto pasa por moderación antes de publicarse.</li>
          <li>Solo imágenes de gatos; sin personas identificables.</li>
          <li>Formatos JPG, PNG o WebP, hasta 5 MB.</li>
          <li>
            Debes tener derecho a publicar la imagen y aceptar que se muestre
            públicamente.
          </li>
          <li>Nada de contenido ofensivo, violento o ajeno a la temática.</li>
        </ul>

        <p className="muted">
          El contenido curatorial es divulgación general sobre razas felinas y no
          sustituye la orientación de un veterinario.
        </p>
      </div>

      <div className="actions" style={{ marginTop: '2rem' }}>
        <Link className="btn btn--primary" href="/michiteca">
          <Icon name="michiteca" size={24} />
          Explorar la Michiteca
        </Link>
        <Link className="btn btn--ghost" href="/michi-plaza">
          <Icon name="miawsoleo" size={24} />
          Ver la Michi Plaza
        </Link>
      </div>
    </div>
  );
}
