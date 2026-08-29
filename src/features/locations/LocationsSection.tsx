import React, { useState, useMemo } from 'react';
import { MOCK_RETAILERS } from '../../data/retailers.mock';
import { RetailerLocation } from '../../types/retailer.types';
import { Badge } from '../../components/Badge/Badge';
import { Card } from '../../components/Card/Card';
import { MapPin, Phone, Clock, Truck, Globe2, ShieldCheck } from 'lucide-react';

export const LocationsSection: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('todas');

  const provinces = useMemo(() => {
    const unique = Array.from(new Set(MOCK_RETAILERS.map((r) => r.province)));
    return ['todas', ...unique];
  }, []);

  const filteredRetailers = useMemo(() => {
    if (selectedProvince === 'todas') return MOCK_RETAILERS;
    return MOCK_RETAILERS.filter((r) => r.province === selectedProvince);
  }, [selectedProvince]);

  return (
    <section id="puntos-de-venta" className="py-20 lg:py-28 bg-white border-b border-sbiroli-semolina-300 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="navy" size="md" icon={<Globe2 className="w-3.5 h-3.5 text-sbiroli-gold" />}>
            RED LOGÍSTICA & PUNTOS DE VENTA
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-sbiroli-navy mt-3 tracking-tight">
            Presencia federal en más de 18 provincias
          </h2>
          <p className="text-base text-sbiroli-navy-800/80 mt-3 leading-relaxed">
            Nuestra red de centros logísticos y distribuidores oficiales garantiza abastecimiento ininterrumpido con tiempos de entrega de 24 a 72 horas en todo el territorio nacional.
          </p>
        </div>

        {/* Logistics Key Metrics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-sbiroli-semolina-100 border border-sbiroli-semolina-300 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-sbiroli-navy text-sbiroli-gold flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black font-display text-sbiroli-navy">24 / 48 hs</div>
              <div className="text-xs font-semibold text-gray-600">Lead time en principales nodos urbanos</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-sbiroli-semolina-100 border border-sbiroli-semolina-300 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-sbiroli-rosso text-white flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black font-display text-sbiroli-navy">99.4%</div>
              <div className="text-xs font-semibold text-gray-600">Cumplimiento de entrega en fecha pactada</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-sbiroli-semolina-100 border border-sbiroli-semolina-300 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-sbiroli-gold text-sbiroli-navy-900 flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black font-display text-sbiroli-navy">+18 Provincias</div>
              <div className="text-xs font-semibold text-gray-600">Rutas comerciales activas semanales</div>
            </div>
          </div>
        </div>

        {/* Province Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {provinces.map((prov) => {
            const isSelected = selectedProvince === prov;
            return (
              <button
                key={prov}
                onClick={() => setSelectedProvince(prov)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-sbiroli-rosso text-white shadow-sbiroli-glow-rosso/40 scale-[1.02]'
                    : 'bg-sbiroli-semolina-100 text-sbiroli-navy-800 hover:bg-sbiroli-semolina-200 border border-sbiroli-semolina-300'
                }`}
              >
                {prov === 'todas' ? 'Todas las Regiones' : prov}
              </button>
            );
          })}
        </div>

        {/* Retailer Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRetailers.map((retailer: RetailerLocation) => (
            <Card
              key={retailer.id}
              variant="white"
              elevation="sm"
              interactive
              className="p-6 flex flex-col justify-between border-2 border-sbiroli-semolina-300 hover:border-sbiroli-navy transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge
                    variant={retailer.category === 'Centro de Distribución' ? 'navy' : 'gold'}
                    size="sm"
                  >
                    {retailer.category}
                  </Badge>
                  <span className="text-xs font-mono font-bold text-gray-500">
                    {retailer.province}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-sbiroli-navy mb-2">
                  {retailer.name}
                </h3>

                <ul className="space-y-2 text-xs text-sbiroli-navy-800/85">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-sbiroli-rosso flex-shrink-0 mt-0.5" />
                    <span>{retailer.address}, {retailer.city}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-sbiroli-navy-500 flex-shrink-0" />
                    <a href={`tel:${retailer.phone}`} className="hover:text-sbiroli-rosso font-semibold">
                      {retailer.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <Truck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Zona de influencia:</strong> {retailer.coverageArea}</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-sbiroli-semolina-200 flex items-center justify-between text-xs">
                <span className="text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  Entrega promedio: <strong>{retailer.leadTimeHours} hs</strong>
                </span>
                <a
                  href="#distribuidores"
                  className="font-bold text-sbiroli-rosso hover:underline"
                >
                  Consultar Cupo →
                </a>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
