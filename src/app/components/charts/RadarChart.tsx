export function RadarChart({ data, size = 200 }: { data: any[], size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size / 2) - 30; // Leave room for labels
  
  // Assuming data structure: [{ axis: 'Skills', val1: 80, val2: 60 }, ...]
  const axes = data.map(d => d.axis);
  const angleStep = (Math.PI * 2) / axes.length;

  const getPoint = (value: number, angle: number) => {
    const r = (value / 100) * radius;
    return {
      x: cx + r * Math.cos(angle - Math.PI / 2),
      y: cy + r * Math.sin(angle - Math.PI / 2)
    };
  };

  const drawPolygon = (dataKey: string) => {
    const points = data.map((d, i) => {
      const p = getPoint(d[dataKey], i * angleStep);
      return `${p.x},${p.y}`;
    }).join(" ");
    return points;
  };

  return (
    <svg width={size} height={size}>
      {/* Grid */}
      {[20, 40, 60, 80, 100].map(level => (
        <polygon 
          key={level}
          points={axes.map((_, i) => {
            const p = getPoint(level, i * angleStep);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="#334155"
          strokeWidth="1"
        />
      ))}

      {/* Axis Lines & Labels */}
      {axes.map((axis, i) => {
        const pEdge = getPoint(100, i * angleStep);
        const pLabel = getPoint(115, i * angleStep); // Push label out a bit
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={pEdge.x} y2={pEdge.y} stroke="#334155" strokeWidth="1" />
            <text 
              x={pLabel.x} 
              y={pLabel.y} 
              fill="#94A3B8" 
              fontSize="10" 
              textAnchor="middle" 
              dominantBaseline="middle"
            >
              {axis}
            </text>
          </g>
        );
      })}

      {/* Data Polygon 1 */}
      <polygon 
        points={drawPolygon('val1')}
        fill="rgba(37,99,235,0.2)"
        stroke="#2563EB"
        strokeWidth="2"
      />
      {/* Data Polygon 2 */}
      {data[0].val2 !== undefined && (
        <polygon 
          points={drawPolygon('val2')}
          fill="rgba(124,58,237,0.15)"
          stroke="#7C3AED"
          strokeWidth="2"
        />
      )}
      {/* Data Polygon 3 */}
      {data[0].val3 !== undefined && (
        <polygon 
          points={drawPolygon('val3')}
          fill="rgba(16,185,129,0.15)"
          stroke="#10B981"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}

