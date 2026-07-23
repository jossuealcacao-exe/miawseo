/**
 * Cabecera de "línea de metro": distintivo cuadrado con el código (M1, M2…),
 * nombre de la línea y una breve descripción.
 */
export function LineHeader({
  line,
  name,
  color,
  desc,
}: {
  line: string;
  name: string;
  color: string;
  desc?: string;
}) {
  return (
    <div className="line-header">
      <span className="line-badge" style={{ background: color }}>
        {line}
      </span>
      <div>
        <h2 className="line-name">{name}</h2>
        {desc ? <p className="line-desc">{desc}</p> : null}
      </div>
    </div>
  );
}
