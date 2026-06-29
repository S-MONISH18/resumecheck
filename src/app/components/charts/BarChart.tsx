import { useState } from "react";

export function BarChart({ 
  data, 
  color = "#2563EB",
}: { 
  data: { label: string; value: number }[];
  color?: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  // Use a fixed coordinate system that scales beautifully
  const width = 1000;
  const height = 240;
  
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  const padding = { top: 40, right: 20, bottom: 40, left: 20 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  
  const barWidth = Math.min((innerWidth / data.length) * 0.6, 50);
  const step = innerWidth / data.length;

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        {/* Grid Lines */}
        {[0, 0.5, 1].map((ratio, i) => {
          const y = padding.top + innerHeight * ratio;
          return (
            <line 
              key={i} 
              x1={padding.left} 
              y1={y} 
              x2={width - padding.right} 
              y2={y} 
              stroke="#334155" 
              strokeOpacity="0.4"
              strokeWidth="2" 
            />
          );
        })}

        {/* Bars */}
        {data.map((item, i) => {
          const percent = item.value / maxValue;
          const barHeight = Math.max(percent * innerHeight, 4); // min height of 4px
          const x = padding.left + (i * step) + (step - barWidth) / 2;
          const y = padding.top + innerHeight - barHeight;
          
          return (
            <g 
              key={i} 
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx={4}
                className="transition-all duration-300"
                fillOpacity={hoveredIdx === i ? 0.7 : 0.9}
              />
              
              {/* X Axis Label */}
              <text
                x={x + barWidth / 2}
                y={height - 10}
                fill="#64748B"
                fontSize="14"
                textAnchor="middle"
                className="font-sans font-medium"
              >
                {item.label}
              </text>
              
              {/* Tooltip text - visible on hover */}
              <g 
                className="transition-opacity duration-200" 
                style={{ opacity: hoveredIdx === i ? 1 : 0 }}
              >
                <rect 
                  x={x + barWidth / 2 - 35} 
                  y={y - 36} 
                  width={70} 
                  height={28} 
                  fill="#0F172A" 
                  rx={6}
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 17}
                  fill="#F8FAFC"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="font-mono"
                >
                  {item.value}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
