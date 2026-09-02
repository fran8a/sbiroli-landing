import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Utensils } from 'lucide-react';
import { Button } from '../Button/Button';

const STATS = [
  { value: '8 Años',    label: 'De Tradición Fideera' },
  { value: '100%',      label: 'Trigo Candeal Duro' },
  { value: '18 Horas',  label: 'Secado Lento Serrano' },
  { value: '+18 Prov.', label: 'Cobertura Nacional' },
];

export const VideoBand: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion || videoFailed) return;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => setVideoFailed(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [prefersReducedMotion, videoFailed]);

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

  return (
    <section
      ref={sectionRef}
      className="relative bg-sbiroli-navy-950 flex flex-col items-stretch text-white"
      style={{ minHeight: '100svh' }}
      aria-label="Hero – Pastas Sbiroli"
    >
      <div className="h-20 sm:h-24 md:h-28 shrink-0" aria-hidden="true" />

      <div className="relative z-30 flex flex-col items-center gap-2 pb-3 sm:pb-4 shrink-0">
        <span className="inline-block px-4 py-1 rounded-full border border-sbiroli-gold/45 bg-sbiroli-navy-950/55 backdrop-blur-sm text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-sbiroli-gold/95 uppercase select-none">
          Desde 1938 · Cruz del Eje, Córdoba
        </span>

        <img
          src="/logo_sbiroli.png"
          alt="Pastas Sbiroli"
          className="w-28 sm:w-40 md:w-52 lg:w-60 h-auto object-contain drop-shadow-[0_0_40px_rgba(244,211,94,0.28)] select-none"
          draggable={false}
        />
      </div>

      <div className="flex-1 min-h-0 relative">
        <div
          className="absolute inset-0 mx-4 sm:mx-10 md:mx-14 lg:mx-18 xl:mx-24"
          style={{
            filter:
              'drop-shadow(0 22px 50px rgba(0,0,0,0.80)) drop-shadow(0 5px 16px rgba(0,0,0,0.55))',
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: CLIP }}
          >
            {prefersReducedMotion || videoFailed ? (
              <img
                src="/posters/poster_para_video1.jpeg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                poster="/posters/poster_para_video1.jpeg"
                onError={() => setVideoFailed(true)}
                className="absolute inset-0 w-full h-full object-cover scale-105"
              >
                <source src="/videos/fideos_video1.mp4" type="video/mp4" />
              </video>
            )}

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 5,
                background:
                  'linear-gradient(to bottom, rgba(10,14,40,0.55) 0%, rgba(10,14,40,0.10) 40%, rgba(10,14,40,0.10) 70%, rgba(10,14,40,0.60) 100%)',
              }}
              aria-hidden="true"
            />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 6,
                background:
                  'radial-gradient(ellipse at center, transparent 35%, rgba(10,14,40,0.58) 100%)',
              }}
              aria-hidden="true"
            />

            <div
              className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center"
              style={{ zIndex: 20 }}
            >
              <Button
                asAnchor
                href="#catalogo"
                variant="rosso"
                size="lg"
                leftIcon={<Utensils className="w-4 h-4" />}
                className="font-bold shadow-2xl shadow-sbiroli-rosso/40 hover:shadow-sbiroli-rosso/65 transition-shadow"
              >
                Descubrir Catálogo
              </Button>
            </div>

            <a
              href="#historia"
              aria-label="Ir al contenido principal"
              className="absolute left-1/2 -translate-x-1/2 bottom-16 sm:bottom-20 flex flex-col items-center gap-1 text-white/40 hover:text-sbiroli-gold/80 transition-colors duration-300 group"
              style={{ zIndex: 20 }}
            >
              <span className="text-[9px] tracking-[0.22em] uppercase font-semibold select-none">
                Explorar
              </span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: CLIP,
              boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.07)',
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        className="relative shrink-0 bg-sbiroli-navy-950 pt-3 pb-5 sm:pt-4 sm:pb-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="grid grid-cols-4 divide-x divide-white/10 px-4 sm:px-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center px-1 sm:px-3"
            >
              <span className="text-sm sm:text-xl md:text-2xl font-black font-display text-sbiroli-gold tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="mt-0.5 text-[8px] sm:text-[10px] font-semibold tracking-widest uppercase text-white/55 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
