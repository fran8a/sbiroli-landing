import React, { useState } from 'react';
import { MOCK_TIMELINE } from '../../data/timeline.mock';
import { Wheat, Wind, ShieldCheck, HeartHandshake, History, Sparkles, Check, Flame } from 'lucide-react';
import { Card } from '../../components/Card/Card';
import { Badge } from '../../components/Badge/Badge';

export const StorySection: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const pillars = [
    {
      icon: <Wheat className="w-6 h-6 text-sbiroli-gold" />,
      title: '100% Trigo Candeal Seleccionado',
      description: 'Utilizamos exclusivamente sémola de trigo duro (*Triticum durum*) con más del 12% de tenor proteico. Esto otorga el característico color ámbar dorado natural y una elasticidad inigualable sin agregados artificiales.',
    },
    {
      icon: <Wind className="w-6 h-6 text-sky-400" />,
      title: 'Secado Lento a Baja Temperatura',
      description: 'Fieles a la escuela del norte de Italia, nuestras pastas reposan durante 18 horas en cámaras estáticas con ventilación serrana controlada. No quemamos el grano, preservando nutrientes y sabor.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-sbiroli-rosso" />,
      title: 'Trefilado de Alta Retención',
      description: 'Matricería de precisión que imprime micro-rugosidades en la superficie del fideo. La salsa no resbala al fondo del plato: se adhiere y emulsiona en cada bocado.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Inocuidad y Calidad Certificada',
      description: 'Planta modelo con certificaciones de Buenas Prácticas de Manufactura (BPM) y sistema HACCP. Control de loteo y trazabilidad desde el silo hasta el palet final.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-sbiroli-semolina-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 1: TRADICIÓN 1938 (HISTORIA & LÍNEA DE TIEMPO) */}
        <div id="historia" className="scroll-mt-36">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="navy" size="md" icon={<History className="w-3.5 h-3.5 text-sbiroli-gold" />}>
              NUESTRA HERENCIA DESDE 1938
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-sbiroli-navy mt-3 tracking-tight">
              El noble arte fideero nacido en el corazón de Córdoba
            </h2>
            <p className="text-base sm:text-lg text-sbiroli-navy-800/80 mt-4 leading-relaxed">
              Cruz del Eje fue el lugar elegido en 1938 por maestros inmigrantes para plantar bandera. Más de ocho décadas después, tres generaciones mantienen intacto el compromiso con la verdadera pasta seca italo-argentina.
            </p>
          </div>

          {/* Interactive Timeline Showcase */}
          <div className="bg-sbiroli-navy-950 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden border-2 border-sbiroli-navy-800 mb-24">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-sbiroli-navy-800">
              <div>
                <span className="text-xs font-bold text-sbiroli-gold uppercase tracking-widest flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-sbiroli-rosso" />
                  Línea de Tiempo Histórica
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
                  88 Años Forjando la Tradición Fideera
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md">
                Hacé clic en cada hito histórico para descubrir los momentos que convirtieron a Pastas Sbiroli en un emblema nacional.
              </p>
            </div>

            {/* Timeline Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8" role="tablist">
              {MOCK_TIMELINE.map((item, index) => {
                const isSelected = selectedMilestone === index;
                return (
                  <button
                    key={item.year}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedMilestone(index)}
                    className={`p-3.5 rounded-xl text-center transition-all duration-200 cursor-pointer flex flex-col items-center gap-1 border ${
                      isSelected
                        ? 'bg-sbiroli-rosso text-white border-sbiroli-rosso shadow-sbiroli-glow-rosso/60 scale-[1.03]'
                        : 'bg-sbiroli-navy-900 text-gray-300 border-sbiroli-navy-800 hover:bg-sbiroli-navy-800 hover:text-white'
                    }`}
                  >
                    <span className="text-xl font-black font-display tracking-tight">{item.year}</span>
                    <span className="text-[11px] font-semibold opacity-90 truncate max-w-full">
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Card */}
            <div className="bg-sbiroli-navy-900/90 rounded-2xl p-6 sm:p-8 border border-sbiroli-navy-700/80">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-sbiroli-gold uppercase tracking-wider">
                    Año {MOCK_TIMELINE[selectedMilestone].year}
                  </span>
                  <h4 className="text-2xl font-bold font-display text-white mt-0.5">
                    {MOCK_TIMELINE[selectedMilestone].title}
                  </h4>
                </div>
                <Badge variant="gold" size="md">
                  {MOCK_TIMELINE[selectedMilestone].badge}
                </Badge>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl">
                {MOCK_TIMELINE[selectedMilestone].description}
              </p>

              <div className="mt-6 p-3.5 rounded-xl bg-sbiroli-navy-950/80 border border-sbiroli-gold/30 flex items-center gap-3 text-xs sm:text-sm font-semibold text-sbiroli-gold">
                <span className="text-base">📌</span>
                <span>Hito Clave: {MOCK_TIMELINE[selectedMilestone].highlight}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: ELABORACIÓN (PROCESO PRODUCTIVO & 4 PILARES) */}
        <div id="elaboracion" className="scroll-mt-36">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="gold" size="md" icon={<Flame className="w-3.5 h-3.5 text-sbiroli-navy" />}>
              EL SECRETO DE NUESTRO SABOR
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-sbiroli-navy mt-3 tracking-tight">
              Los 4 Pilares de la Elaboración Candeal
            </h2>
            <p className="text-base sm:text-lg text-sbiroli-navy-800/80 mt-4 leading-relaxed">
              Cada paquete encierra un proceso riguroso donde el clima de montaña, el trigo puro y la paciencia artesanal se combinan con tecnología industrial de última generación.
            </p>
          </div>

          {/* 4 Pillars Grid (Bento Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <Card
                key={idx}
                variant="semolina"
                elevation="sm"
                interactive
                className="p-6 flex flex-col justify-between border-2 border-sbiroli-semolina-200 hover:border-sbiroli-navy-600 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sbiroli-navy flex items-center justify-center mb-5 shadow-md">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-bold font-display text-sbiroli-navy mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-sbiroli-navy-800/85 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-sbiroli-semolina-300/70 flex items-center gap-1 text-xs font-bold text-sbiroli-rosso">
                  <Check className="w-3.5 h-3.5" />
                  <span>Estándar Sbiroli</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
