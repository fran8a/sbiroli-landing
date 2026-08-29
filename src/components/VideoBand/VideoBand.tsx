import React from 'react';
import { VideoBackground } from '../VideoBackground/VideoBackground';

/**
 * VideoBand — Cinematic Window Edition
 *
 * Zona cinematográfica inmediatamente debajo del Hero.
 * Video1 en una ventana panorámica con bordes irregulares y redondeados,
 * sobre fondo navy-950 idéntico al Hero para crear continuidad visual total.
 *
 * Diseño:
 * - El fondo de la sección es el mismo navy-950 del Hero → transición imperceptible
 * - El video vive dentro de un contenedor "ventana" con:
 *     · Bordes orgánicos asimétricos (clip-path / border-radius irregular)
 *     · Shadow exterior dramático para profundidad
 *     · Padding lateral para que el fondo navy sea visible = efecto "frame"
 * - Fade superior e inferior oscuro para que Hero y StatsStrip se fundan
 */
export const VideoBand: React.FC = () => {
  return (
    <section
      className="bg-sbiroli-navy-950 pt-0 pb-10 sm:pb-14"
      aria-label="Pastas Sbiroli en movimiento"
    >
      {/* ── Top dark continuation (seamless with Hero bottom fade) ─── */}
      {/* No top padding, content starts exactly where Hero's dark fade ends */}

      {/* ── Cinematic window container ──────────────────────────────── */}
      <div className="px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32">
        {/*
          Window shape:
          - border-radius irregular: top corners más cerrados, bottom más abiertos
          - clip-path por CSS para anular el overflow exactamente
          - Sombra exterior profunda para "el video flota sobre el fondo"
        */}
        <div
          className="relative w-full overflow-hidden shadow-[0_30px_90px_-10px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]"
          style={{
            borderRadius: '1.25rem 2rem 2.5rem 1.75rem',
            aspectRatio: '21 / 9',
          }}
        >
          <VideoBackground
            src="/videos/fideos_video1.mp4"
            poster="/posters/poster_para_video1.jpeg"
            overlayClass="from-sbiroli-navy-950/55 via-sbiroli-navy-900/30 to-sbiroli-navy-950/65"
          />

          {/* Vignette ring to soften internal edges */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 45%, rgba(10,14,40,0.50) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Quote overlay – centered on the video frame */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 sm:px-12">
            <blockquote>
              <p className="font-display text-lg sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-[0_2px_24px_rgba(10,14,40,0.9)] italic">
                "El arte de la pasta italiana{' '}
                <span className="text-sbiroli-gold not-italic">
                  nacido en el corazón serrano
                </span>
                "
              </p>
              <footer className="mt-3 sm:mt-4 text-[10px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-sbiroli-semolina-300/55">
                Cruz del Eje, Córdoba · Desde 1938
              </footer>
            </blockquote>
          </div>
        </div>

        {/* ── Responsive fallback: on very small screens use 16/9 ─── */}
        {/* (CSS aspect-ratio 21/9 is hidden on xs, 16/9 shown instead) */}
      </div>

      {/* ── Bottom fade into StatsStrip (also navy-950) ─────────────── */}
      {/* No fade needed — StatsStrip background is identical */}
    </section>
  );
};
