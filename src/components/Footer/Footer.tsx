import React from 'react';
import { MapPin, Phone, Mail, Award, Clock, ShieldCheck, Download, ExternalLink } from 'lucide-react';


export const Footer: React.FC = () => {
  return (
    <footer className="bg-sbiroli-navy-950 text-white pt-16 pb-12 border-t-4 border-sbiroli-rosso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-sbiroli-navy-800">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a href="#" className="inline-block" aria-label="Pastas Sbiroli">
              <img
                src="/logo_sbiroli.png"
                alt="Pastas Sbiroli Desde 1938"
                className="h-20 sm:h-24 w-auto object-contain drop-shadow-md"
              />
            </a>
            <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
              Fábrica tradicional italo-argentina fundada en 1938 en Cruz del Eje, Córdoba. Maestros fideeros dedicados a la elaboración de pastas secas de calidad superior con 100% trigo candeal y secado lento.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sbiroli-navy-900 border border-sbiroli-gold/40 text-sbiroli-gold text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                88 Años de Tradición
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sbiroli-navy-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Normas HACCP / BPM
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-base font-bold font-display text-sbiroli-gold tracking-wide">
              Planta Industrial
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sbiroli-rosso flex-shrink-0 mt-0.5" />
                <span>Ruta Nacional 38 Km 122, Cruz del Eje (X5280), Córdoba, Argentina.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sbiroli-gold flex-shrink-0" />
                <span>(03549) 42-2000 / 42-2001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Lun a Vie: 07:00 a 17:00 hs</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-base font-bold font-display text-sbiroli-gold tracking-wide">
              Productos & Negocio
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-300">
              <li>
                <a href="#catalogo" className="hover:text-sbiroli-gold transition-colors">
                  Pastas Largas Tradicionales
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-sbiroli-gold transition-colors">
                  Pastas Cortas & Guiseras
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-sbiroli-gold transition-colors">
                  Nidos al Huevo y a la Espinaca
                </a>
              </li>
              <li>
                <a href="#distribuidores" className="hover:text-sbiroli-rosso transition-colors font-semibold text-white">
                  Formulario para Distribuidores
                </a>
              </li>
              <li>
                <a href="#puntos-de-venta" className="hover:text-sbiroli-gold transition-colors">
                  Red de Cobertura Logística
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-base font-bold font-display text-sbiroli-gold tracking-wide">
              Canal Comercial
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Atención directa a cadenas de supermercados, autoservicios mayoristas y distribuidores regionales.
            </p>
            <a
              href="mailto:ventas@pastassbiroli.com.ar"
              className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-sbiroli-gold transition-colors"
            >
              <Mail className="w-4 h-4 text-sbiroli-gold" />
              <span>ventas@pastassbiroli.com.ar</span>
            </a>
            <div className="pt-2">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sbiroli-navy-800 hover:bg-sbiroli-navy-700 text-sbiroli-gold text-xs font-bold border border-sbiroli-gold/30 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ficha Mayorista Digital</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Pastas Sbiroli S.A. Todos los derechos reservados. Hecho en Córdoba, Argentina.</p>
          <div className="flex items-center gap-6">
            <span>R.N.P.A. N° 04031289</span>
            <span>R.N.E. N° 04001938</span>
            <a href="#distribuidores" className="hover:text-white flex items-center gap-1">
              <span>Portal Mayorista</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
