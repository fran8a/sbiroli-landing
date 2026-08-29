import React, { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: '88 Años', label: 'De Tradición Fideera' },
  { value: '100%', label: 'Trigo Candeal Duro' },
  { value: '18 Horas', label: 'Secado Lento Serrano' },
  { value: '+18 Prov.', label: 'Cobertura Nacional' },
];

/**
 * StatsStrip
 *
 * Franja horizontal de transición entre Hero y StorySection.
 * Muestra las 4 métricas de la marca con animación de entrada al scrollear.
 */
export const StatsStrip: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative bg-sbiroli-navy-950 pt-10 sm:pt-12 pb-16 sm:pb-20"
      aria-label="Métricas de la marca"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center transition-all duration-700 sm:border-l sm:border-sbiroli-navy-700 first:border-l-0 px-4 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : '0ms' }}
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-sbiroli-gold tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="mt-1.5 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-sbiroli-semolina-300/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Organic wave → transitions into StorySection (white bg) ── */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          className="relative block w-full h-10 sm:h-14 lg:h-16 fill-white"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C300,100 600,-20 900,50 C1050,85 1150,20 1200,10 L1200,80 L0,80 Z" />
        </svg>
      </div>
    </div>
  );
};
