import Script from 'next/script';

/**
 * Google Analytics 4 (gtag.js). Solo se carga en producción para no ensuciar
 * las métricas con tráfico de desarrollo/preview. El Measurement ID es público
 * (aparece en el HTML), por eso puede ir en el cliente. Requiere que la CSP
 * permita googletagmanager.com y google-analytics.com (ver next.config.mjs).
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-CX08FFS75C';

export function Analytics() {
  if (process.env.NODE_ENV !== 'production' || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
