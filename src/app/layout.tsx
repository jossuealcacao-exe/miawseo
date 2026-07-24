import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Analytics } from '@/components/Analytics';
import { SITE_URL, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Miawseo — Museo inmersivo de razas felinas',
    template: '%s · Miawseo',
  },
  description:
    'Miawseo es una galería de arte inmersiva donde recorres, sala por sala, las razas de gato del mundo. Explora la Michiteca y comparte tu michi en la Michi Plaza.',
  applicationName: SITE_NAME,
  keywords: ['gatos', 'razas de gato', 'michis', 'museo', 'galería', 'felinos'],
  openGraph: {
    title: 'Miawseo — Museo inmersivo de razas felinas',
    description:
      'Recorre las razas de gato como obras de arte y comparte tu michi en la Michi Plaza.',
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miawseo — Museo inmersivo de razas felinas',
    description:
      'Recorre las razas de gato como obras de arte y comparte tu michi en la Michi Plaza.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#0c0f14',
  width: 'device-width',
  initialScale: 1,
};

const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'Michi Museum',
  url: SITE_URL,
  inLanguage: 'es-MX',
  description:
    'Museo inmersivo de razas felinas: recorre las razas de gato como obras de arte y comparte tu michi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="dark">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
        <a className="skip-link" href="#main">
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
