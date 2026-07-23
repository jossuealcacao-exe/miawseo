import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Miawseo — Museo inmersivo de razas felinas',
    template: '%s · Miawseo',
  },
  description:
    'Miawseo es una galería de arte inmersiva donde recorres, sala por sala, las razas de gato del mundo. Explora la Michiteca y comparte tu michi en la Michi Plaza.',
  keywords: ['gatos', 'razas de gato', 'michis', 'museo', 'galería', 'felinos'],
  openGraph: {
    title: 'Miawseo — Museo inmersivo de razas felinas',
    description:
      'Recorre las razas de gato como obras de arte y comparte tu michi en la Michi Plaza.',
    type: 'website',
    locale: 'es_MX',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0d0b09',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="dark">
      <body>
        <a className="skip-link" href="#main">
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
