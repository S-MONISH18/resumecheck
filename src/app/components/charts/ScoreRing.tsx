export function ScoreRing({ overall, scores }: { overall: number, scores: {label: string, weight: number, score: number, color: string}[] }) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 14;
  const radius = cx - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  // Arc calculation for inner segments
  const innerRadius = radius - 20;
  const innerCircumference = 2 * Math.PI * innerRadius;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#1E293B" strokeWidth={strokeWidth} />
        
        {/* Outer Ring - Overall */}
        <circle 
          cx={cx} cy={cy} r={radius} 
          fill="none" 
          stroke={overall >= 80 ? "#10B981" : overall >= 70 ? "#38BDF8" : "#F59E0B"} 
          strokeWidth={strokeWidth} 
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (overall / 100) * circumference}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 12px ${overall >= 80 ? 'rgba(16,185,129,0.4)' : overall >= 70 ? 'rgba(56,189,248,0.4)' : 'rgba(245,158,11,0.4)'})` }}
        />

        {/* Inner Segments */}
        <circle cx={cx} cy={cy} r={innerRadius} fill="none" stroke="#1E293B" strokeWidth={4} />
        {scores.map((s, i) => {
          // just evenly spaced arcs for visual effect
          const gap = 4;
          const arcLength = (innerCircumference / scores.length) - gap;
          const offset = i * (innerCircumference / scores.length);
          const drawLength = arcLength * (s.score / 100);
          
          return (
            <circle 
              key={i}
              cx={cx} cy={cy} r={innerRadius} 
              fill="none" 
              stroke={s.color} 
              strokeWidth={6} 
              strokeDasharray={`${drawLength} ${innerCircumference - drawLength}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
        <div className="text-[52px] font-extrabold font-mono tracking-tighter leading-none text-foreground">{overall}</div>
        <div className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">Overall Score</div>
      </div>
    </div>
  );
}
