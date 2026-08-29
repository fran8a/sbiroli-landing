import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronDown, Utensils } from 'lucide-react';
import { Button } from '../../components/Button/Button';

type ActiveVideo = 'v2' | 'v1';

/**
 * HeroSection – Cinematic Dual-Video Frame
 *
 * Ambos videos (fideos_video2 + fideos_video1) conviven dentro del MISMO
 * marco/ventana cinematográfico con bordes orgánicos redondeados.
 * La transición entre ellos es un crossfade suave de 1.5s, creando la ilusión
 * de un solo video continuo.
 *
 * Flujo:
 *   video2 autoplay → onEnded → fade a video1 → onEnded → fade a video2 → ∞
 */
export const HeroSection: React.FC = () => {
  const [active, setActive] = useState<ActiveVideo>('v2');
  const v2Ref = useRef<HTMLVideoElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const switchingRef = useRef(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Autoplay inicial
  useEffect(() => {
    if (prefersReducedMotion) return;
    v2Ref.current?.play().catch(() => {});
  }, [prefersReducedMotion]);

  // Pause / resume on scroll visibility
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

  /** Crossfade al video contrario cuando el activo termina */
  const handleVideoEnded = useCallback(
    (finished: ActiveVideo) => {
      if (switchingRef.current) return;
      switchingRef.current = true;

      const next: ActiveVideo = finished === 'v2' ? 'v1' : 'v2';
      const nextRef = next === 'v2' ? v2Ref : v1Ref;
      const prevRef = finished === 'v2' ? v2Ref : v1Ref;

      // Prepara el siguiente video desde el inicio y lo inicia
      if (nextRef.current) {
        nextRef.current.currentTime = 0;
        nextRef.current.play().catch(() => {});
      }

      // Cambia el estado → triggerea la transición CSS de opacidad
      setActive(next);

      // Después de la transición pausa y reinicia el anterior
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
      className="relative bg-sbiroli-navy-950 flex flex-col items-stretch text-white overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Hero principal – Pastas Sbiroli"
    >
      {/* ── Navbar height spacer ────────────────────────────────────── */}
      <div className="h-24 sm:h-28 md:h-32 shrink-0" aria-hidden="true" />

      {/* ══════════════════════════════════════════════════════════════
          MARCO CINEMÁTICO ÚNICO — ambos videos viven aquí dentro
          ══════════════════════════════════════════════════════════════ */}
      <div
        className="relative flex-1 mx-3 sm:mx-8 lg:mx-14 xl:mx-20 mb-6 sm:mb-8 overflow-hidden min-h-[340px]"
        style={{
          /* Bordes orgánicos asimétricos – no cuadrado, no círculo: ventana de cine */
          borderRadius: '1.25rem 2.5rem 2.75rem 1.75rem',
          boxShadow:
            '0 32px 100px -8px rgba(0,0,0,0.90), 0 0 0 1px rgba(255,255,255,0.07)',
        }}
        role="img"
        aria-label="Video de pastas Sbiroli"
      >
        {prefersReducedMotion ? (
          /* ── Static poster fallback ──────────────────────────────── */
          <img
            src="/posters/poster_para_video2.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            {/* ── Video 2 (inicial: pasta en caldo/sopa) ────────────── */}
            <video
              ref={v2Ref}
              muted
              playsInline
              poster="/posters/poster_para_video2.jpeg"
              onEnded={() => handleVideoEnded('v2')}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: active === 'v2' ? 1 : 0,
                transition: 'opacity 1500ms cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: active === 'v2' ? 2 : 1,
              }}
            >
              <source src="/videos/fideos_video2.mp4" type="video/mp4" />
            </video>

            {/* ── Video 1 (segundo: pasta con salsa/tenedor) ────────── */}
            <video
              ref={v1Ref}
              muted
              playsInline
              poster="/posters/poster_para_video1.jpeg"
              onEnded={() => handleVideoEnded('v1')}
              className="absolute inset-0 w-full h-full object-cover"
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

        {/* ── Overlay: gradiente que enmarca y da legibilidad ──────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 10,
            background:
              'linear-gradient(to bottom, rgba(10,14,40,0.80) 0%, rgba(10,14,40,0.20) 35%, rgba(10,14,40,0.20) 65%, rgba(10,14,40,0.82) 100%)',
          }}
          aria-hidden="true"
        />

        {/* ── Viñeta radial: suaviza los bordes internos del frame ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 11,
            background:
              'radial-gradient(ellipse at center, transparent 48%, rgba(10,14,40,0.60) 100%)',
          }}
          aria-hidden="true"
        />

        {/* ── Contenido central: badge · logo · esencia · CTA ──────── */}
        <div
          className="relative h-full flex flex-col items-center justify-center text-center px-6 sm:px-12 gap-5 py-16 sm:py-20 animate-hero-in"
          style={{ zIndex: 20 }}
        >
          {/* Micro-tagline badge */}
          <span className="inline-block px-4 py-1.5 rounded-full border border-sbiroli-gold/45 bg-sbiroli-navy-950/55 backdrop-blur-sm text-[11px] sm:text-xs font-bold tracking-[0.25em] text-sbiroli-gold/95 uppercase select-none">
            Desde 1938 · Cruz del Eje, Córdoba
          </span>

          {/* Logo protagonista */}
          <img
            src="/logo_sbiroli.png"
            alt="Pastas Sbiroli"
            className="w-44 sm:w-60 md:w-72 lg:w-88 xl:w-96 h-auto object-contain drop-shadow-[0_0_40px_rgba(244,211,94,0.28)] select-none"
            draggable={false}
          />

          {/* Divider ornamental */}
          <div className="flex items-center justify-center gap-4 w-full max-w-[240px]" aria-hidden="true">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-sbiroli-gold/50" />
            <svg className="w-6 h-4 shrink-0" viewBox="0 0 60 24" fill="none">
              <path d="M0,12 Q15,2 30,12 T60,12" stroke="#F4D35E" strokeWidth="2" strokeOpacity="0.7" />
              <circle cx="30" cy="12" r="3" fill="#F4D35E" fillOpacity="0.85" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-sbiroli-gold/50" />
          </div>

          {/* Frase de esencia */}
          <p className="text-[11px] sm:text-sm font-semibold tracking-[0.2em] text-sbiroli-semolina-200/80 uppercase select-none">
            100% Trigo Candeal · Secado Lento Serrano
          </p>

          {/* CTA único */}
          <div className="mt-1">
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
        </div>

        {/* ── Scroll indicator (dentro del frame) ─────────────────── */}
        <a
          href="#historia"
          aria-label="Ir al contenido principal"
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/45 hover:text-sbiroli-gold/80 transition-colors duration-300 animate-scroll-bounce group"
          style={{ zIndex: 21 }}
        >
          <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-semibold select-none">
            Explorar
          </span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
        </a>
      </div>
      {/* ═══════════════════════ fin del marco ══════════════════════ */}

      {/* ── Fade oscuro en la parte inferior → StatsStrip (navy) ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-sbiroli-navy-950 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
};
