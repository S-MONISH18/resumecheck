import { useState } from "react";

export function DonutChart({ 
  data, 
  size = 200,
  thickness = 24,
  centerLabel = "",
  centerValue = ""
}: { 
  data: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const radius = (size / 2) - (thickness / 2);
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let currentOffset = 0;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 drop-shadow-md">
        {data.map((item, i) => {
          const percentage = item.value / total;
          const strokeLength = percentage * circumference;
          
          const strokeDasharray = `${strokeLength} ${circumference}`;
          const strokeDashoffset = -currentOffset;
          
          currentOffset += strokeLength;

          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={thickness}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="transition-all duration-300 cursor-pointer origin-center"
              style={{
                strokeOpacity: hoveredIdx === null || hoveredIdx === i ? 1 : 0.4,
                transform: hoveredIdx === i ? 'scale(1.02)' : 'scale(1)',
              }}
            />
          );
        })}
      </svg>
      {(centerLabel || centerValue || hoveredIdx !== null) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {hoveredIdx !== null ? (
            <>
              <div className="text-[28px] font-bold text-white leading-none font-mono">
                {data[hoveredIdx].value}
              </div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1">
                {data[hoveredIdx].label}
              </div>
            </>
          ) : (
            <>
              {centerValue && <div className="text-[28px] font-bold text-white leading-none font-mono">{centerValue}</div>}
              {centerLabel && <div className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1">{centerLabel}</div>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
