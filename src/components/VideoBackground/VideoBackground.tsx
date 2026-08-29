import React, { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  /** Path to the video source (mp4) */
  src: string;
  /** Path to the poster image shown before video loads or as fallback */
  poster: string;
  /** Tailwind gradient overlay classes – controls the loop-hiding gradient */
  overlayClass?: string;
  /** Additional className for the root container */
  className?: string;
  /** Children rendered on top of the video overlay */
  children?: React.ReactNode;
}

/**
 * VideoBackground
 *
 * A cinematic, accessible video background component for Pastas Sbiroli.
 *
 * Features:
 * - autoPlay / muted / loop / playsInline (required for Safari iOS)
 * - prefers-reduced-motion: renders static poster instead of video
 * - IntersectionObserver: pauses when out of viewport, resumes when visible
 * - Autoplay fallback: if the browser blocks autoplay (battery/data saver),
 *   the poster image is displayed gracefully
 * - Configurable overlay gradient to mask loop restart point
 */
export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  poster,
  overlayClass = 'from-sbiroli-navy-950/70 via-sbiroli-navy-900/45 to-sbiroli-navy-950/85',
  className = '',
  children,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Respect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // IntersectionObserver: pause/resume based on viewport visibility
  useEffect(() => {
    if (prefersReducedMotion || videoFailed) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => setVideoFailed(true));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion, videoFailed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Static poster fallback (reduced-motion or autoplay blocked) */}
      {(prefersReducedMotion || videoFailed) ? (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-700"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay – masks loop restart & ensures text legibility */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${overlayClass} pointer-events-none`}
      />

      {/* Slot for content rendered above the overlay */}
      {children}
    </div>
  );
};
