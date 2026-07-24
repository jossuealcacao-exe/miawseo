import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Imagen del hero (efecto "mesh": se funde con el andén oscuro).
 * PLACEHOLDER temporal (Wikimedia Commons, CC BY-SA). Para sustituir por la
 * imagen IA (azul ruso esponjoso + tabby point con estambre): deja el archivo
 * en `public/hero-michis.jpg` y cambia esta constante a '/hero-michis.jpg'.
 */
const HERO_IMG =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Tabby_kitten_playing_with_lure.jpg/1280px-Tabby_kitten_playing_with_lure.jpg';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div
          className="hero__media"
          aria-hidden="true"
          style={{ backgroundImage: `url("${HERO_IMG}")` } as CSSProperties}
        />
        <div className="hero__inner">
          <span className="roundel" aria-hidden="true">
            <Icon name="roundel" size={40} />
          </span>
          <p className="eyebrow" style={{ marginTop: 'var(--space-4)' }}>
            Museo inmersivo felino
          </p>
          <h1>Miawseo</h1>
          <p className="lead">
            Una red de razas de gato para recorrer como un metro. Sigue las
            señales, entra a cada andén y cuelga tu michi en el muro público.
          </p>

          <div className="signs">
            <Link className="wayfind wayfind--m1" href="/michiteca">
              <span className="chip" aria-hidden="true">
                <Icon name="michiteca" size={34} />
              </span>
              <span className="wayfind__label">
                <span className="wayfind__title">Michiteca</span>
                <span className="wayfind__sub">Exposición de razas</span>
              </span>
              <Icon name="arrow" size={26} className="wayfind__arrow" />
            </Link>

            <Link className="wayfind wayfind--green" href="/michi-plaza">
              <span className="chip" aria-hidden="true">
                <Icon name="miawsoleo" size={34} />
              </span>
              <span className="wayfind__label">
                <span className="wayfind__title">Michi Plaza</span>
                <span className="wayfind__sub">Muro de la comunidad</span>
              </span>
              <Icon name="arrow" size={26} className="wayfind__arrow" />
            </Link>
          </div>

          <a
            className="wayfind wayfind--ink arenero"
            href="mailto:jossue.alcala@bloqio.app?subject=Galer%C3%ADa%20Miawseo%20para%20mi%20michi"
          >
            <span className="arenero__badge">Donaciones al proyecto</span>
            <span className="arenero__row">
              <span className="chip" aria-hidden="true">
                <Icon name="donate" size={30} />
              </span>
              <span className="wayfind__label">
                <span className="wayfind__title">Arenero</span>
                <span className="wayfind__sub">¿Quieres una galería para tu michi?</span>
              </span>
              <Icon name="arrow" size={26} className="wayfind__arrow" />
            </span>
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Cómo funciona la red</p>
            <h2>Líneas, estaciones y andenes</h2>
            <p className="lead">
              La <Link href="/michiteca">Michiteca</Link> es una red de líneas de
              metro. Cada línea agrupa <strong>estaciones</strong>, y cada estación
              tiene su <strong>andén</strong> con la información.
            </p>
          </div>
          <ol className="gallery-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li className="quickfacts" style={{ marginTop: 0, display: 'block' }}>
              <span className="k">1 · Elige una línea</span>
              <p style={{ margin: '0.25rem 0 0' }}>
                La <strong>M1</strong> recorre las razas de gato; la{' '}
                <strong>M2</strong>, la historia entre michis y humanos.
              </p>
            </li>
            <li className="quickfacts" style={{ marginTop: 0, display: 'block' }}>
              <span className="k">2 · Baja en una estación</span>
              <p style={{ margin: '0.25rem 0 0' }}>
                Cada estación es un tema. En su andén encuentras origen, carácter,
                cuidados, curiosidades o una galería histórica.
              </p>
            </li>
            <li className="quickfacts" style={{ marginTop: 0, display: 'block' }}>
              <span className="k">3 · Cuelga tu michi</span>
              <p style={{ margin: '0.25rem 0 0' }}>
                ¿Tienes uno? Súbelo y, tras moderación, viajará a la{' '}
                <Link href="/michi-plaza">Michi Plaza</Link>.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
