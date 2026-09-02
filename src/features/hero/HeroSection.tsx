import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronDown, Utensils } from 'lucide-react';
import { Button } from '../../components/Button/Button';

const HERO_STATS = [
  { value: '88 Años', label: 'De Tradición Fideera' },
  { value: '100%', label: 'Trigo Candeal Duro' },
  { value: '18 Horas', label: 'Secado Lento Serrano' },
  { value: '+18 Prov.', label: 'Cobertura Nacional' },
];

type ActiveVideo = 'v2' | 'v1';

const CLIP = [
  'polygon(',
  '5% 8%,',
  '12% 2%,',
  '30% 5%,',
  '50% 0%,',
  '68% 4%,',
  '85% 1%,',
  '95% 6%,',
  '100% 15%,',
  '97% 38%,',
  '100% 62%,',
  '98% 80%,',
  '92% 98%,',
  '75% 95%,',
  '58% 100%,',
  '40% 96%,',
  '22% 100%,',
  '8% 94%,',
  '2% 80%,',
  '4% 58%,',
  '0% 38%,',
  '3% 18%',
  ')',
].join('');

export const HeroSection: React.FC = () => {
  const [active, setActive] = useState<ActiveVideo>('v2');
  const v2Ref = useRef<HTMLVideoElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const switchingRef = useRef(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) return;
    v2Ref.current?.play().catch(() => {});
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const current = active === 'v2' ? v2Ref.current : v1Ref.current;
        if (!current) return;
        entry.isIntersecting ? current.play().catch(() => {}) : current.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [active, prefersReducedMotion]);

  const handleVideoEnded = useCallback(
    (finished: ActiveVideo) => {
      if (switchingRef.current) return;
      switchingRef.current = true;

      const next: ActiveVideo = finished === 'v2' ? 'v1' : 'v2';
      const nextRef = next === 'v2' ? v2Ref : v1Ref;
      const prevRef = finished === 'v2' ? v2Ref : v1Ref;

      if (nextRef.current) {
        nextRef.current.currentTime = 0;
        nextRef.current.play().catch(() => {});
      }

      setActive(next);

      setTimeout(() => {
        if (prevRef.current) {
          prevRef.current.pause();
          prevRef.current.currentTime = 0;
        }
        switchingRef.current = false;
      }, 1600);
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-sbiroli-navy-950 flex flex-col justify-between text-white overflow-hidden h-[100svh] max-h-[100svh]"
      aria-label="Hero principal – Pastas Sbiroli"
    >
      <div className="h-16 sm:h-20 lg:h-24 shrink-0" aria-hidden="true" />

      <div className="flex-1 min-h-0 w-full flex flex-col justify-center items-center px-3 sm:px-6 md:px-8 py-1 relative">
        <div className="relative w-full max-w-5xl 2xl:max-w-6xl h-full max-h-[430px] 2xl:max-h-[540px] flex items-center justify-center">

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              filter:
                'drop-shadow(0 20px 50px rgba(0,0,0,0.90)) drop-shadow(0 6px 20px rgba(0,0,0,0.65))',
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: CLIP }}
              role="img"
              aria-label="Video de pastas artesanales Sbiroli"
            >
              {prefersReducedMotion ? (
                <img
                  src="/posters/poster_para_video2.jpeg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover scale-[1.45]"
                />
              ) : (
                <>
                  <video
                    ref={v2Ref}
                    muted
                    playsInline
                    poster="/posters/poster_para_video2.jpeg"
                    onEnded={() => handleVideoEnded('v2')}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.45]"
                    style={{
                      opacity: active === 'v2' ? 1 : 0,
                      transition: 'opacity 1500ms cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: active === 'v2' ? 2 : 1,
                    }}
                  >
                    <source src="/videos/fideos_video2.mp4" type="video/mp4" />
                  </video>

                  <video
                    ref={v1Ref}
                    muted
                    playsInline
                    poster="/posters/poster_para_video1.jpeg"
                    onEnded={() => handleVideoEnded('v1')}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.45]"
                    style={{
                      opacity: active === 'v1' ? 1 : 0,
                      transition: 'opacity 1500ms cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: active === 'v1' ? 2 : 1,
                    }}
                  >
                    <source src="/videos/fideos_video1.mp4" type="video/mp4" />
                  </video>
                </>
              )}

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  zIndex: 10,
                  background:
                    'linear-gradient(to bottom, rgba(10,14,40,0.65) 0%, rgba(10,14,40,0.08) 35%, rgba(10,14,40,0.08) 65%, rgba(10,14,40,0.72) 100%)',
                }}
                aria-hidden="true"
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  zIndex: 11,
                  background:
                    'radial-gradient(ellipse at center, transparent 40%, rgba(10,14,40,0.50) 100%)',
                }}
                aria-hidden="true"
              />
            </div>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath: CLIP,
                boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.12)',
              }}
              aria-hidden="true"
            />
          </div>

          <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8 py-3 sm:py-5 gap-2 sm:gap-3 md:gap-3.5 animate-hero-in pointer-events-auto">
            <span className="inline-block px-3.5 py-1 rounded-full border border-sbiroli-gold/50 bg-sbiroli-navy-950/80 backdrop-blur-md text-[9px] sm:text-[10.5px] md:text-[11.5px] font-bold tracking-[0.25em] text-sbiroli-gold uppercase select-none shadow-lg">
              Desde 1938 · Cruz del Eje, Córdoba
            </span>

            <div className="flex items-center justify-center gap-3 w-full max-w-[200px]" aria-hidden="true">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-sbiroli-gold/60" />
              <svg className="w-4 h-3 shrink-0" viewBox="0 0 60 24" fill="none">
                <path d="M0,12 Q15,2 30,12 T60,12" stroke="#F4D35E" strokeWidth="2" strokeOpacity="0.8" />
                <circle cx="30" cy="12" r="3" fill="#F4D35E" fillOpacity="0.9" />
              </svg>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-sbiroli-gold/60" />
            </div>

            <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] text-sbiroli-semolina-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] uppercase select-none">
              100% Trigo Candeal · Secado Lento Serrano
            </p>

            <div className="mt-1 sm:mt-2">
              <Button
                asAnchor
                href="#catalogo"
                variant="rosso"
                size="md"
                leftIcon={<Utensils className="w-4 h-4" />}
                className="font-bold shadow-2xl shadow-sbiroli-rosso/50 hover:shadow-sbiroli-rosso/75 hover:scale-105 transition-all text-xs sm:text-sm md:text-base px-6 sm:px-8 py-2.5 sm:py-3"
              >
                Descubrir Catálogo
              </Button>
            </div>

            <a
              href="#historia"
              aria-label="Ir al contenido principal"
              className="mt-0.5 sm:mt-1 flex flex-col items-center gap-0.5 text-white/50 hover:text-sbiroli-gold transition-colors duration-300 animate-scroll-bounce group"
            >
              <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.22em] uppercase font-semibold select-none">
                Explorar
              </span>
              <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>

        </div>
      </div>

      <div
        className="relative z-30 bg-sbiroli-navy-950 pt-1.5 pb-2.5 sm:pt-2 sm:pb-3.5 md:pt-2.5 md:pb-4 shrink-0"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="grid grid-cols-4 divide-x divide-white/10 px-3 sm:px-8 max-w-5xl mx-auto">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center px-1 sm:px-3">
              <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-black font-display text-sbiroli-gold tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="mt-0.5 text-[7px] sm:text-[8.5px] md:text-[10px] font-semibold tracking-widest uppercase text-white/65 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
