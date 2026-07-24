'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Consentimiento + Google Analytics 4.
 * GA NO se carga hasta que el visitante pulsa "Aceptar" (gtag.js solo se inyecta
 * con consentimiento). La decisión se guarda en localStorage. En desarrollo el
 * banner se ve para poder probarlo, pero GA solo carga en producción.
 * El Measurement ID es público (va en el HTML); la CSP permite los dominios de
 * Google (ver next.config.mjs).
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-CX08FFS75C';
const IS_PROD = process.env.NODE_ENV === 'production';
const LS_KEY = 'miawseo:consent';

type Consent = 'granted' | 'denied' | null;

export function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(LS_KEY);
    } catch {
      /* almacenamiento no disponible */
    }
    setConsent(stored === 'granted' ? 'granted' : stored === 'denied' ? 'denied' : null);
    setReady(true);
  }, []);

  function decide(value: 'granted' | 'denied') {
    try {
      localStorage.setItem(LS_KEY, value);
    } catch {
      /* noop */
    }
    setConsent(value);
  }

  if (!GA_ID) return null;

  return (
    <>
      {IS_PROD && consent === 'granted' && (
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
      )}

      {ready && consent === null && (
        <section className="consent" role="region" aria-label="Consentimiento de cookies">
          <p className="consent__text">
            Usamos <strong>Google Analytics</strong> para medir las visitas de forma
            anónima. Solo se activa si aceptas.
          </p>
          <div className="consent__actions">
            <button
              type="button"
              className="consent__btn consent__btn--ghost"
              onClick={() => decide('denied')}
            >
              Rechazar
            </button>
            <button
              type="button"
              className="consent__btn consent__btn--accept"
              onClick={() => decide('granted')}
            >
              Aceptar
            </button>
          </div>
        </section>
      )}
    </>
  );
}
