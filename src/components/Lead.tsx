import type { ReactNode } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Texto introductorio/ayuda con estilo señal de metro: un pequeño cuadrado rojo
 * con el icono de información a la izquierda del texto.
 */
export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="lead lead--sign">
      <span className="info-sq" aria-hidden="true">
        <Icon name="info" size={15} />
      </span>
      <span>{children}</span>
    </p>
  );
}
