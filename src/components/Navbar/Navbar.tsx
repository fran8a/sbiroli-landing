import React, { useState } from 'react';
import { Menu, X, MessageSquare, Phone } from 'lucide-react';
import { Button } from '../Button/Button';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 3 modules left (in top-to-bottom reading order)
  const leftNavLinks = [
    { label: 'Tradición 1938', href: '#historia' },
    { label: 'Elaboración', href: '#elaboracion' },
    { label: 'Catálogo', href: '#catalogo' },
  ];

  // 2 text links + 1 CTA button on the right = 3 modules right (in top-to-bottom reading order)
  const rightNavLinks = [
    { label: 'Mayoristas', href: '#distribuidores' },
    { label: 'Puntos de Venta', href: '#puntos-de-venta' },
  ];

  const allMobileLinks = [
    { label: 'Tradición 1938', href: '#historia' },
    { label: 'Elaboración', href: '#elaboracion' },
    { label: 'Catálogo de Pastas', href: '#catalogo' },
    { label: 'Canal Mayorista', href: '#distribuidores' },
    { label: 'Puntos de Venta', href: '#puntos-de-venta' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-sbiroli-navy-950/98 backdrop-blur-md shadow-2xl border-b-2 border-sbiroli-rosso/90 h-24 sm:h-28 md:h-32 flex items-center"
    >
      {/* Full-width Expanded Container */}
      <div className="w-full max-w-[96%] xl:max-w-[94%] 2xl:max-w-[1880px] mx-auto px-4 sm:px-8 lg:px-12 h-full">
        <div className="flex items-center justify-between h-full relative">
          
          {/* Left Navigation (3 Modules in Order: Tradición -> Elaboración -> Catálogo) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-end pr-4 lg:pr-8 xl:pr-14 h-full" aria-label="Navegación izquierda">
            {leftNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm lg:text-[15px] font-medium tracking-normal text-gray-200 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all duration-200 flex items-center justify-center drop-shadow-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Center: Factory Logo (Clicking leads to top / Inicio) */}
          <div className="flex-shrink-0 flex items-center justify-center px-4 sm:px-8 h-full">
            <a
              href="#"
              className="flex items-center justify-center p-1 rounded-2xl transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sbiroli-gold"
              aria-label="Pastas Sbiroli - Volver al Inicio"
            >
              <img
                src="/logo_sbiroli.png"
                alt="Pastas Sbiroli Desde 1938"
                className="w-auto h-20 sm:h-24 md:h-28 lg:h-32 max-h-[92%] object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
              />
            </a>
          </div>

          {/* Right Navigation (3 Modules in Order: Mayoristas -> Puntos de Venta -> Ser Distribuidor CTA) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-start pl-4 lg:pl-8 xl:pl-14 h-full" aria-label="Navegación derecha">
            {rightNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm lg:text-[15px] font-medium tracking-normal text-gray-200 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all duration-200 flex items-center justify-center drop-shadow-sm"
              >
                {link.label}
              </a>
            ))}

            <Button
              asAnchor
              href="#distribuidores"
              variant="rosso"
              size="md"
              className="ml-3 rounded-full font-semibold text-xs lg:text-sm px-6 py-2.5 shadow-lg hover:shadow-sbiroli-glow-rosso/60 transition-all hover:scale-105 active:scale-95"
            >
              Ser Distribuidor
            </Button>
          </nav>

          {/* Mobile Actions & Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="https://wa.me/5493512345678"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Ventas"
              className="p-2.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-md flex items-center gap-1.5 text-xs font-semibold"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              className="p-2.5 rounded-2xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sbiroli-gold"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 border-b border-sbiroli-navy-800 bg-sbiroli-navy-950/98 backdrop-blur-xl p-6 shadow-2xl animate-fade-in text-white">
            <nav className="flex flex-col gap-2 max-w-md mx-auto" aria-label="Menú móvil">
              {allMobileLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-center"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="pt-4 mt-2 border-t border-sbiroli-navy-800 flex flex-col gap-2.5">
                <Button
                  asAnchor
                  href="#distribuidores"
                  variant="rosso"
                  size="md"
                  className="w-full rounded-full font-semibold py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Quiero ser Distribuidor
                </Button>
                <a
                  href="tel:+543549422000"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white/5 border border-white/10 text-sbiroli-gold text-xs font-semibold hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Planta Cruz del Eje: (03549) 42-2000</span>
                </a>
              </div>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
};
