import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba de la página"
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-sbiroli-navy text-sbiroli-gold shadow-sbiroli-lg hover:bg-sbiroli-rosso hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sbiroli-gold/70"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
