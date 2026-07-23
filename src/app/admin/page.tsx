'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icon';

interface PendingPhoto {
  id: string;
  breedSlug: string;
  catName: string;
  note: string;
  width: number;
  height: number;
  createdAt: string;
  dataUri: string | null;
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [authed, setAuthed] = useState(false);
  const [pending, setPending] = useState<PendingPhoto[]>([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function load(tk: string) {
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/admin', { headers: { 'x-admin-token': tk } });
      if (res.status === 401) {
        setMsg('Token incorrecto.');
        setAuthed(false);
        return;
      }
      const data = (await res.json()) as { ok: boolean; pending: PendingPhoto[] };
      setPending(data.pending ?? []);
      setAuthed(true);
    } catch {
      setMsg('Error de red.');
    } finally {
      setLoading(false);
    }
  }

  async function act(id: string, action: 'approve' | 'reject') {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id, action }),
    });
    if (res.ok) {
      setPending((prev) => prev.filter((p) => p.id !== id));
      setMsg(action === 'approve' ? 'Foto aprobada.' : 'Foto rechazada.');
    } else {
      setMsg('No se pudo actualizar.');
    }
  }

  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <div className="section__head">
        <p className="eyebrow">Panel interno</p>
        <h1 style={{ fontSize: 'var(--fs-h1)' }}>Moderación de la Michi Plaza</h1>
        <p className="lead">
          Revisa las fotos pendientes. Solo las aprobadas se muestran al público.
        </p>
      </div>

      {!authed ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(token);
          }}
          style={{ maxWidth: 420 }}
        >
          <div className="field">
            <label htmlFor="tk">Token de moderación</label>
            <input
              id="tk"
              className="input"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              autoComplete="off"
              required
            />
            <span className="hint">
              Se define en la variable de entorno ADMIN_TOKEN.
            </span>
          </div>
          {msg && (
            <p className="notice notice--err" role="alert">
              {msg}
            </p>
          )}
          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading ? 'Verificando…' : 'Entrar'}
          </button>
        </form>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button className="btn btn--ghost" onClick={() => load(token)}>
              Refrescar
            </button>
            <span className="muted" style={{ alignSelf: 'center' }}>
              {pending.length} pendiente(s)
            </span>
          </div>

          {msg && (
            <p className="notice notice--info" role="status" style={{ marginBottom: '1rem' }}>
              {msg}
            </p>
          )}

          {pending.length === 0 ? (
            <div className="empty-state">No hay fotos pendientes. 🎉</div>
          ) : (
            <div className="mod-grid">
              {pending.map((p) => (
                <div key={p.id} className="mod-card">
                  {p.dataUri ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.dataUri}
                      alt={`Pendiente: ${p.catName}`}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  ) : (
                    <div className="empty-state">Sin previsualización</div>
                  )}
                  <div style={{ padding: '0.5rem 0.75rem' }}>
                    <strong style={{ color: 'var(--text-strong)' }}>{p.catName}</strong>
                    <div className="muted" style={{ fontSize: '0.8rem' }}>
                      {p.breedSlug} · {p.width}×{p.height}
                    </div>
                    {p.note ? <p style={{ fontSize: '0.85rem' }}>{p.note}</p> : null}
                  </div>
                  <div className="actions">
                    <button className="btn btn--go" onClick={() => act(p.id, 'approve')}>
                      <Icon name="check" size={18} />
                      Aprobar
                    </button>
                    <button className="btn btn--ghost" onClick={() => act(p.id, 'reject')}>
                      <Icon name="close" size={18} />
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
