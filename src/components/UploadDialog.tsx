'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';

type Status = 'idle' | 'submitting' | 'ok' | 'error';

const MAX_BYTES = 5 * 1024 * 1024;

export function UploadDialog({
  breedSlug,
  breedName,
}: {
  breedSlug: string;
  breedName: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const openedAt = useRef<number>(0);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    // Cierra con Escape ya lo maneja <dialog>; reseteamos estado al cerrar.
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      setStatus('idle');
      setMessage('');
      setFileName('');
      formRef.current?.reset();
    };
    dlg.addEventListener('close', onClose);
    return () => dlg.removeEventListener('close', onClose);
  }, []);

  function open() {
    openedAt.current = Date.now();
    dialogRef.current?.showModal();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Candado cliente: tiempo minimo de interaccion (anti-bot ingenuo).
    fd.set('elapsed', String(Date.now() - openedAt.current));

    const file = fd.get('photo');
    if (!(file instanceof File) || file.size === 0) {
      setStatus('error');
      setMessage('Selecciona una imagen de tu michi.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setStatus('error');
      setMessage('La imagen supera el límite de 5 MB.');
      return;
    }
    if (!fd.get('consent')) {
      setStatus('error');
      setMessage('Debes confirmar que tienes derecho a publicar la foto.');
      return;
    }

    setStatus('submitting');
    setMessage('');
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus('error');
        setMessage(data.error ?? 'No se pudo subir la foto. Intenta de nuevo.');
        return;
      }
      setStatus('ok');
      setMessage(
        '¡Recibida! Tu foto entró a revisión. Aparecerá en la Michi Plaza una vez aprobada por moderación.',
      );
      form.reset();
      setFileName('');
    } catch {
      setStatus('error');
      setMessage('Error de red. Revisa tu conexión e intenta de nuevo.');
    }
  }

  return (
    <>
      <button type="button" className="btn btn--go" onClick={open}>
        <Icon name="paw" size={20} />
        Yo tengo uno
      </button>

      <dialog className="modal" ref={dialogRef} aria-labelledby="upload-title">
        <div className="modal__head">
          <h2 className="modal__title" id="upload-title">
            <span className="chip chip--sm" aria-hidden="true">
              <Icon name="camera" size={18} />
            </span>
            Sube tu {breedName}
          </h2>
          <button
            type="button"
            className="icon-btn"
            aria-label="Cerrar"
            onClick={() => dialogRef.current?.close()}
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="modal__body">
          {status === 'ok' ? (
            <p className="notice notice--ok" role="status">
              <Icon name="check" size={20} />
              {message}
            </p>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate>
              <input type="hidden" name="breedSlug" value={breedSlug} />

              {/* Honeypot: invisible para humanos, cebo para bots. */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="nickname">No llenar</label>
                <input
                  id="nickname"
                  type="text"
                  name="nickname"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="field">
                <label htmlFor="catName">Nombre del michi *</label>
                <input
                  id="catName"
                  className="input"
                  name="catName"
                  type="text"
                  maxLength={40}
                  required
                  placeholder="Ej. Michi Angelo"
                />
              </div>

              <div className="field">
                <label htmlFor="note">Nota (opcional)</label>
                <textarea
                  id="note"
                  className="textarea"
                  name="note"
                  maxLength={140}
                  rows={2}
                  placeholder="Algo curioso sobre tu gato…"
                />
                <span className="hint">Máx. 140 caracteres. No incluyas datos personales.</span>
              </div>

              <div className="field">
                <label htmlFor="photo">Foto (JPG, PNG o WebP · máx. 5 MB) *</label>
                <input
                  id="photo"
                  className="file"
                  name="photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  required
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                />
                {fileName && <span className="hint">Seleccionada: {fileName}</span>}
              </div>

              <div className="field">
                <label
                  htmlFor="consent"
                  style={{ display: 'flex', gap: '0.6rem', textTransform: 'none', letterSpacing: 0 }}
                >
                  <input id="consent" type="checkbox" name="consent" required />
                  <span className="hint" style={{ color: 'var(--text)' }}>
                    Confirmo que la foto es mía o tengo derecho a publicarla, no
                    contiene personas identificables ni contenido ofensivo, y
                    acepto que se muestre públicamente en la Michi Plaza.
                  </span>
                </label>
              </div>

              {status === 'error' && (
                <p className="notice notice--err" role="alert">
                  <Icon name="info" size={20} />
                  {message}
                </p>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  className="btn btn--go"
                  disabled={status === 'submitting'}
                >
                  <Icon name="upload" size={20} />
                  {status === 'submitting' ? 'Subiendo…' : 'Enviar a revisión'}
                </button>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => dialogRef.current?.close()}
                >
                  Cancelar
                </button>
              </div>
              <p className="hint" style={{ marginTop: '0.75rem' }}>
                Toda foto pasa por moderación antes de publicarse. Evitamos así
                contenido inapropiado en un espacio público.
              </p>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
