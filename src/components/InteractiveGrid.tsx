import React, { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

export interface TechCardItem {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'tools';
  icon: string; // SVG data URI or online SVG
  color: string;
  level: string;
}

export const TECH_ITEMS: TechCardItem[] = [
  {
    name: 'React 19',
    category: 'frontend',
    color: '#61DAFB',
    level: '98%',
    icon: `data:image/svg+xml,%3Csvg viewBox='-11.5 -10.23174 23 20.46348' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='0' cy='0' r='2.05' fill='%2361dafb'/%3E%3Cg stroke='%2361dafb' stroke-width='1' fill='none'%3E%3Cellipse rx='11' ry='4.2'/%3E%3Cellipse rx='11' ry='4.2' transform='rotate(60)'/%3E%3Cellipse rx='11' ry='4.2' transform='rotate(120)'/%3E%3C/g%3E%3C/svg%3E`,
  },
  {
    name: 'Next.js 15',
    category: 'frontend',
    color: '#FFFFFF',
    level: '95%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 180 180' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='mask' mask-type='alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='180' height='180'%3E%3Ccircle cx='90' cy='90' r='90' fill='black'/%3E%3C/mask%3E%3Cg mask='url(%23mask)'%3E%3Ccircle cx='90' cy='90' r='90' fill='black' stroke='%23333' stroke-width='6'/%3E%3Cpath d='M149.508 157.438L69.1555 54H54V125.967H66.8837V69.7891L139.789 164.215C143.208 162.203 146.46 159.932 149.508 157.438Z' fill='white'/%3E%3Cpath d='M115 54H127.884V125.967H115V54Z' fill='white'/%3E%3C/g%3E%3C/svg%3E`,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    color: '#3178C6',
    level: '96%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='%233178C6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM12.75 14.888h-2.222V20H8.341v-5.112H6.119V13.06h6.631v1.828zm6.544.757c0 1.341-.75 2.193-2.072 2.658l-.667.227c-.773.261-1.045.545-1.045.977 0 .5.409.841 1.068.841.773 0 1.341-.364 1.636-.955l1.636.955c-.568 1.182-1.75 1.773-3.272 1.773-2.114 0-3.364-1.159-3.364-2.886 0-1.409.818-2.295 2.273-2.795l.682-.227c.727-.25 1-.5 1-.886 0-.432-.386-.75-.955-.75-.682 0-1.182.318-1.477.818l-1.568-1c.545-1.045 1.614-1.568 3.045-1.568 2.068 0 3.273 1.091 3.273 2.796z'/%3E%3C/svg%3E`,
  },
  {
    name: 'Python 3.12',
    category: 'backend',
    color: '#FFD43B',
    level: '95%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.914 0C5.82 0 6.2 2.64 6.2 2.64l.006 2.738h5.807v.826H3.84s-3.84.437-3.84 6.326c0 5.888 3.35 5.674 3.35 5.674h2.001v-2.81s-.107-3.35 3.284-3.35h5.635s3.177.053 3.177-3.07V3.177S17.902 0 11.914 0zm-3.23 1.802a1.07 1.07 0 1 1 0 2.14 1.07 1.07 0 0 1 0-2.14z' fill='%233776AB'/%3E%3Cpath d='M12.086 24c6.094 0 5.714-2.64 5.714-2.64l-.006-2.738H11.99v-.826h8.173s3.84-.437 3.84-6.326c0-5.888-3.35-5.674-3.35-5.674h-2.001v2.81s.107 3.35-3.284 3.35H9.733s-3.177-.053-3.177 3.07v5.787S6.098 24 12.086 24zm3.23-1.802a1.07 1.07 0 1 1 0-2.14 1.07 1.07 0 0 1 0 2.14z' fill='%23FFD43B'/%3E%3C/svg%3E`,
  },
  {
    name: 'FastAPI',
    category: 'backend',
    color: '#059669',
    level: '94%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='%23059669' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.88 18.75l-4.5-9h4.5v-6l4.5 9h-4.5v6z'/%3E%3C/svg%3E`,
  },
  {
    name: 'Node.js',
    category: 'backend',
    color: '#5FA04E',
    level: '92%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='%235FA04E' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm0 2.31l8.392 4.845v9.69L12 21.69l-8.392-4.845V7.155L12 2.31z'/%3E%3C/svg%3E`,
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    color: '#4169E1',
    level: '90%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='%234169E1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7h2v2.5z'/%3E%3C/svg%3E`,
  },
  {
    name: 'Docker',
    category: 'tools',
    color: '#2496ED',
    level: '93%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='%232496ED' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.714h2.118a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.953 0h2.118a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.185H8.076a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.954 0h2.119a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.185H5.122a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186z'/%3E%3C/svg%3E`,
  },
  {
    name: 'Three.js / WebGL',
    category: 'frontend',
    color: '#04D9FF',
    level: '92%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='%2304D9FF' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 1L2 6.5v11L12 23l10-5.5v-11L12 1zm0 2.22l7.7 4.23-3.2 1.76-7.7-4.23L12 3.22zM3.9 8.28l6.85 3.77v7.92L3.9 16.2V8.28zm8.6 11.69v-7.92l6.85-3.77v7.92l-6.85 3.77z'/%3E%3C/svg%3E`,
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    color: '#38BDF8',
    level: '97%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='%2338BDF8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 6c-4 0-6.5 2-7.5 6 1.5-2 3.5-2.5 6-1.5 1.5.6 2.5 1.6 3.5 2.7C15.8 15 18 17 23 17c4 0 6.5-2 7.5-6-1.5 2-3.5 2.5-6 1.5-1.5-.6-2.5-1.6-3.5-2.7C19.2 8 17 6 12 6z'/%3E%3C/svg%3E`,
  },
  {
    name: 'PyTorch & AI',
    category: 'ai',
    color: '#EE4C2C',
    level: '91%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='%23EE4C2C' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.65 0a11.96 11.96 0 00-6.85 2.15l1.62 1.62A9.66 9.66 0 0112.65 2.3c5.36 0 9.7 4.34 9.7 9.7 0 5.35-4.34 9.7-9.7 9.7a9.66 9.66 0 01-5.23-1.47l-1.62 1.62A11.96 11.96 0 0012.65 24C19.27 24 24 18.63 24 12S19.27 0 12.65 0zm-1.8 4.25l-4.5 4.5 4.5 4.5V4.25z'/%3E%3C/svg%3E`,
  },
  {
    name: 'LangChain & Agents',
    category: 'ai',
    color: '#10B981',
    level: '94%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%2310B981' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3Cpath d='M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636'/%3E%3C/svg%3E`,
  },
  {
    name: 'Redis K-V',
    category: 'backend',
    color: '#DC382D',
    level: '92%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='%23DC382D' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zm0 8l-8.5-4.25L12 3.65l8.5 2.1L12 10zm-10 4l10 5 10-5-2-1-8 4-8-4-2 1zm0 5l10 5 10-5-2-1-8 4-8-4-2 1z'/%3E%3C/svg%3E`,
  },
  {
    name: 'Supabase BaaS',
    category: 'backend',
    color: '#3ECF8E',
    level: '95%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='%233ECF8E' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.362 9.354H12V.396a.396.396 0 00-.716-.247L.344 14.21a.792.792 0 00.613 1.287H12v8.958a.396.396 0 00.716.247l10.94-14.061a.792.792 0 00-.613-1.287z'/%3E%3C/svg%3E`,
  },
  {
    name: 'Qdrant / Vector DB',
    category: 'ai',
    color: '#FF6F61',
    level: '90%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%23FF6F61' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z'/%3E%3Cpolyline points='3.27 6.96 12 12.01 20.73 6.96'/%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'/%3E%3C/svg%3E`,
  },
  {
    name: 'Linux / VPS Nginx',
    category: 'tools',
    color: '#FCC624',
    level: '93%',
    icon: `data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='%23FCC624' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2C9.5 2 7.5 3.5 7 6c-.5 2 .5 4 1 5-1 1-3 3-3 6 0 3 3 5 7 5s7-2 7-5c0-3-2-5-3-6 .5-1 1.5-3 1-5-.5-2.5-2.5-4-5-4zm-2 5a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z'/%3E%3C/svg%3E`,
  },
];

const NS = 'framer-animate-grid';

const CSS = `
.${NS}-container {
  perspective: 1200px;
}
.${NS}-card {
  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 220ms ease, border-color 220ms ease, background 220ms ease;
  transform-style: preserve-3d;
  will-change: transform, box-shadow;
}
.${NS}-small {
  transform: scale(1.04) translateY(-4px) translateZ(8px);
  border-color: rgba(255, 215, 0, 0.35) !important;
}
.${NS}-big {
  transform: scale(1.14) translateY(-12px) translateZ(24px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 28px -4px var(--card-glow, rgba(0, 240, 255, 0.4));
  border-color: var(--card-glow, #00F0FF) !important;
  background: rgba(18, 22, 34, 0.95) !important;
}
`;

export interface InteractiveGridProps {
  items?: TechCardItem[];
  columns?: number;
  gap?: number;
  glowColor?: string;
  onSelect?: (item: TechCardItem) => void;
}

export function InteractiveGrid({
  items = TECH_ITEMS,
  columns = 4,
  gap = 16,
  glowColor = '#00F0FF',
  onSelect,
}: InteractiveGridProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  const count = items.length;
  const cols = columns;

  const neighbours = useMemo(() => {
    if (hovered === null) return [];
    const out: number[] = [];
    if (hovered % cols !== 0) out.push(hovered - 1);
    if (hovered % cols !== cols - 1) out.push(hovered + 1);
    out.push(hovered - cols);
    out.push(hovered + cols);
    return out.filter((n) => n >= 0 && n < count);
  }, [hovered, cols, count]);

  const onEnter = (i: number) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHovered(i);
  };

  const onLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(null), 180);
  };

  return (
    <div className={`${NS}-container relative w-full select-none py-6`}>
      <style>{CSS}</style>
      
      {/* Background ambient mesh */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 blur-3xl transition-opacity duration-700"
        style={{
          background: hovered !== null 
            ? `radial-gradient(circle 350px at 50% 50%, ${items[hovered]?.color || glowColor}25, transparent)`
            : 'radial-gradient(circle 300px at 50% 50%, rgba(0,240,255,0.08), transparent)'
        }}
      />

      <div
        onPointerLeave={onLeave}
        className="grid w-full gap-4 sm:gap-5"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(240px, 1fr))`,
          gap: `${gap}px`,
          transform: 'perspective(1400px) rotateX(1deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, i) => {
          const isBig = hovered === i;
          const isSmall = !isBig && neighbours.includes(i);

          return (
            <div
              key={item.name}
              onPointerEnter={() => onEnter(i)}
              onClick={() => onSelect?.(item)}
              className={[
                `${NS}-card`,
                'group relative flex flex-col justify-between p-5 rounded-2xl cursor-pointer overflow-hidden backdrop-blur-xl',
                'bg-[#0a0d14]/80 border border-white/[0.08]',
                isBig && `${NS}-big`,
                isSmall && `${NS}-small`,
              ]
                .filter(Boolean)
                .join(' ')}
              style={
                {
                  '--card-glow': item.color,
                  zIndex: isBig ? 30 : isSmall ? 20 : 10,
                } as CSSProperties
              }
            >
              {/* Border Beam Neon Spark */}
              {isBig && (
                <div 
                  className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-80"
                  style={{
                    background: `linear-gradient(135deg, ${item.color} 0%, transparent 60%)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    padding: '1px',
                  }}
                />
              )}

              {/* Header: Icon + Mastery Level */}
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${item.color}15`,
                    border: `1px solid ${item.color}35`,
                    boxShadow: isBig ? `0 0 20px ${item.color}40` : 'none'
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-contain pointer-events-none"
                    draggable={false}
                  />
                </div>

                <div className="flex flex-col items-end">
                  <span 
                    className="text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      color: item.color,
                      backgroundColor: `${item.color}15`,
                      border: `1px solid ${item.color}30`
                    }}
                  >
                    {item.level}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Body: Tech Name & Progress bar */}
              <div>
                <h4 className="text-white font-semibold text-base tracking-wide flex items-center gap-2 mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h4>

                {/* Animated micro progress-bar */}
                <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: item.level,
                      backgroundColor: item.color,
                      boxShadow: isBig ? `0 0 10px ${item.color}` : 'none',
                    }}
                  />
                </div>
              </div>

              {/* Cyber coordinate tag */}
              <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-gray-300 font-mono">
                <span>SYS_{i < 9 ? `0${i+1}` : i+1}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">
                  ACTIVE ➔
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InteractiveGrid;
