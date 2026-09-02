import React, { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  poster: string;
  overlayClass?: string;
  className?: string;
  children?: React.ReactNode;
}

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

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

      <div
        className={`absolute inset-0 bg-gradient-to-b ${overlayClass} pointer-events-none`}
      />

      {children}
    </div>
  );
};
