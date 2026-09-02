import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { DistributorFormData, FormValidationErrors, BusinessType } from '../../types/distributor.types';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';
import { Modal } from '../../components/Modal/Modal';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  MessageSquare, 
  PhoneCall
} from 'lucide-react';

export const DistributorFunnelSection: React.FC = () => {
  const [formData, setFormData] = useState<DistributorFormData>({
    fullName: '',
    companyName: '',
    cuit: '',
    email: '',
    phone: '',
    province: 'Córdoba',
    city: '',
    businessType: 'distribuidor_mayorista',
    estimatedMonthlyTons: 5,
    hasOwnLogistics: false,
    notes: '',
    acceptTerms: true,
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const provinces = [
    { value: 'Buenos Aires', label: 'Buenos Aires / AMBA' },
    { value: 'Córdoba', label: 'Córdoba' },
    { value: 'Santa Fe', label: 'Santa Fe' },
    { value: 'Mendoza', label: 'Mendoza' },
    { value: 'Tucumán', label: 'Tucumán' },
    { value: 'Salta', label: 'Salta' },
    { value: 'Entre Ríos', label: 'Entre Ríos' },
    { value: 'Chaco', label: 'Chaco' },
    { value: 'Corrientes', label: 'Corrientes' },
    { value: 'Misiones', label: 'Misiones' },
    { value: 'San Juan', label: 'San Juan' },
    { value: 'San Luis', label: 'San Luis' },
    { value: 'Santiago del Estero', label: 'Santiago del Estero' },
    { value: 'Neuquén', label: 'Neuquén' },
    { value: 'Río Negro', label: 'Río Negro' },
    { value: 'Chubut', label: 'Chubut' },
    { value: 'Catamarca', label: 'Catamarca' },
    { value: 'La Rioja', label: 'La Rioja' },
    { value: 'Jujuy', label: 'Jujuy' },
    { value: 'La Pampa', label: 'La Pampa' },
    { value: 'Santa Cruz', label: 'Santa Cruz' },
    { value: 'Tierra del Fuego', label: 'Tierra del Fuego' },
  ];

  const businessTypes: { value: BusinessType; label: string }[] = [
    { value: 'distribuidor_mayorista', label: 'Distribuidor Mayorista de Alimentos' },
    { value: 'cadena_supermercados', label: 'Cadena de Supermercados / Autoservicio' },
    { value: 'autoservicio_regional', label: 'Autoservicio / Mayorista Regional' },
    { value: 'gastronomia_horeca', label: 'Gastronomía / Cadena HORECA' },
    { value: 'exportador', label: 'Comercio Exterior / Exportador' },
    { value: 'otro', label: 'Otro tipo de comercio' },
  ];

  const validate = (): boolean => {
    const newErrors: FormValidationErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ingresá tu nombre y apellido';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Ingresá la Razón Social o Nombre de Fantasía';
    }

    const cuitClean = formData.cuit.replace(/\D/g, '');
    if (!cuitClean || cuitClean.length < 10) {
      newErrors.cuit = 'Ingresá un CUIT válido (11 dígitos)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresá un correo electrónico corporativo válido';
    }

    const phoneClean = formData.phone.replace(/\D/g, '');
    if (!phoneClean || phoneClean.length < 8) {
      newErrors.phone = 'Ingresá un teléfono de contacto / WhatsApp';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Ingresá la localidad o ciudad';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar las condiciones de contacto comercial';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#182463', '#E8342A', '#F4D35E'],
        });
      } catch {
      }
    }, 900);
  };

  const getTierInfo = (tons: number) => {
    if (tons < 3) {
      return {
        name: 'Escala Inicial / Minorista Especial',
        benefit: 'Compra por pallet surtido con bonificación de bienvenida.',
        badgeColor: 'semolina' as const,
      };
    }
    if (tons <= 10) {
      return {
        name: 'Distribuidor Regional Certificado',
        benefit: 'Lista de precios mayorista A1 y material POP para puntos de venta.',
        badgeColor: 'navy' as const,
      };
    }
    return {
      name: 'Master Partner / Grandes Cadenas',
      benefit: 'Atención personalizada directa de Directorio, flete bonificado y reserva de cupo de producción.',
      badgeColor: 'gold' as const,
    };
  };

  const currentTier = getTierInfo(formData.estimatedMonthlyTons);

  return (
    <section id="distribuidores" className="py-20 lg:py-28 bg-sbiroli-navy-950 text-white relative overflow-hidden scroll-mt-32">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sbiroli-rosso/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sbiroli-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="md" icon={<Building2 className="w-3.5 h-3.5 text-sbiroli-navy" />}>
            CANAL MAYORISTA & DISTRIBUCIÓN NACIONAL
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mt-3 tracking-tight">
            Sumá Pastas Sbiroli a tu portfolio comercial
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mt-4 leading-relaxed">
            Abastecemos a los principales distribuidores mayoristas, cadenas regionales y canal HORECA del país con despacho directo desde nuestra planta en Cruz del Eje.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-2xl font-bold font-display text-sbiroli-gold">
              ¿Por qué elegir Pastas Sbiroli como aliado estratégico?
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sbiroli-navy-900/90 border border-sbiroli-navy-800 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-sbiroli-rosso/20 text-sbiroli-rosso flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Alta Rotación & Excelente Margen</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Producto de consumo masivo con fidelidad comprobada: la combinación de precio competitivo y calidad 100% candeal asegura rotación constante en góndola.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sbiroli-navy-900/90 border border-sbiroli-navy-800 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-sbiroli-gold/20 text-sbiroli-gold flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Logística Predecible y Paletizado Seguro</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Embalajes reforzados termocontraíbles con esquineros protectores para transporte de larga distancia sin mermas por rotura.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sbiroli-navy-900/90 border border-sbiroli-navy-800 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Abastecimiento Continuo Todo el Año</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Capacidad fabril de más de 1.200 toneladas mensuales con silos propios de acopio de trigo duro cordobés.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-sbiroli-navy-900 to-sbiroli-navy-800 border-2 border-sbiroli-gold/40 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-sbiroli-gold uppercase tracking-wide">
                  Atención Inmediata a Distribuidores
                </div>
                <div className="text-sm font-black text-white mt-0.5">
                  (03549) 42-2000
                </div>
                <div className="text-[11px] text-gray-400">
                  Mesa de Entrada Comercial · Lun a Vie 07 a 17 hs
                </div>
              </div>
              <a
                href="tel:+543549422000"
                className="p-3 rounded-full bg-sbiroli-rosso text-white hover:bg-sbiroli-rosso-600 transition-colors shadow-md"
                aria-label="Llamar a mesa de entrada de ventas"
              >
                <PhoneCall className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white text-sbiroli-navy rounded-3xl p-6 sm:p-8 shadow-2xl border border-sbiroli-semolina-300">
              
              <div className="pb-4 mb-6 border-b border-sbiroli-semolina-200">
                <h3 className="text-2xl font-bold font-display text-sbiroli-navy">
                  Solicitud de Apertura de Cuenta Comercial
                </h3>
                <p className="text-xs text-sbiroli-navy-700 mt-1">
                  Completá el formulario para recibir la lista de precios mayorista oficial, condiciones de pago y esquema de bonificaciones por volumen.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nombre y Apellido del Contacto"
                    required
                    placeholder="Ej: Martín Rodríguez"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    error={errors.fullName}
                  />
                  <Input
                    label="Razón Social / Empresa"
                    required
                    placeholder="Ej: Distribuidora Alimentos del Centro S.R.L."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    error={errors.companyName}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="CUIT (sin guiones)"
                    required
                    placeholder="30712345678"
                    value={formData.cuit}
                    onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
                    error={errors.cuit}
                  />
                  <Input
                    label="Email Corporativo"
                    type="email"
                    required
                    placeholder="compras@tuempresa.com.ar"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Teléfono / WhatsApp de Compras"
                    type="tel"
                    required
                    placeholder="+54 9 351 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                  />
                  <Select
                    label="Tipo de Empresa / Canal"
                    required
                    options={businessTypes}
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value as BusinessType })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Provincia de Operación"
                    required
                    options={provinces}
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  />
                  <Input
                    label="Localidad / Ciudad Base"
                    required
                    placeholder="Ej: Río Cuarto, Rosario, etc."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    error={errors.city}
                  />
                </div>

                <div className="p-4 rounded-2xl bg-sbiroli-semolina-100 border border-sbiroli-semolina-300 flex flex-col gap-3 mt-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="volume-slider" className="text-xs sm:text-sm font-bold text-sbiroli-navy">
                      Volumen Mensual Estimado:
                    </label>
                    <span className="text-base font-black font-display text-sbiroli-rosso bg-white px-3 py-0.5 rounded-lg border border-sbiroli-semolina-300">
                      {formData.estimatedMonthlyTons} {formData.estimatedMonthlyTons === 1 ? 'Tonelada' : 'Toneladas'} / mes
                    </span>
                  </div>

                  <input
                    id="volume-slider"
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={formData.estimatedMonthlyTons}
                    onChange={(e) => setFormData({ ...formData, estimatedMonthlyTons: Number(e.target.value) })}
                    className="w-full h-2 bg-sbiroli-semolina-300 rounded-lg appearance-none cursor-pointer accent-sbiroli-rosso"
                  />

                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold px-1">
                    <span>1 tn (Mínimo paletizado)</span>
                    <span>15 tn (Semi equipo)</span>
                    <span>50+ tn (Equipo completo)</span>
                  </div>

                  <div className="mt-1 pt-2.5 border-t border-sbiroli-semolina-200 flex items-start gap-2">
                    <Badge variant={currentTier.badgeColor} size="sm">
                      {currentTier.name}
                    </Badge>
                    <p className="text-xs text-sbiroli-navy-800 font-medium">
                      {currentTier.benefit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="own-logistics"
                    type="checkbox"
                    checked={formData.hasOwnLogistics}
                    onChange={(e) => setFormData({ ...formData, hasOwnLogistics: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-sbiroli-rosso focus:ring-sbiroli-rosso cursor-pointer"
                  />
                  <label htmlFor="own-logistics" className="text-xs text-sbiroli-navy-800 cursor-pointer select-none">
                    Contamos con flota / transporte propio para retiro en planta Cruz del Eje.
                  </label>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    id="accept-terms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-sbiroli-rosso focus:ring-sbiroli-rosso cursor-pointer"
                  />
                  <label htmlFor="accept-terms" className="text-xs text-gray-600 cursor-pointer select-none">
                    Acepto ser contactado por el equipo de ventas mayoristas de Pastas Sbiroli.
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-xs text-sbiroli-rosso font-semibold">{errors.acceptTerms}</p>
                )}

                <Button
                  type="submit"
                  variant="rosso"
                  size="lg"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-4 h-4" />}
                  className="w-full mt-2 font-bold text-base shadow-xl"
                >
                  Enviar Solicitud Mayorista
                </Button>

                <p className="text-[11px] text-center text-gray-500">
                  Respuesta comercial garantizada en menos de 24 horas hábiles.
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="¡Solicitud Mayorista Recibida con Éxito!"
        subtitle="Pastas Sbiroli · Planta Industrial Cruz del Eje"
        maxWidth="lg"
      >
        <div className="flex flex-col items-center text-center gap-4 py-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h4 className="text-xl font-bold font-display text-sbiroli-navy">
            Gracias por confiar en nuestra tradición, {formData.fullName.split(' ')[0]}
          </h4>

          <p className="text-xs sm:text-sm text-gray-600 max-w-md leading-relaxed">
            Hemos asignado tu cuenta comercial para <strong>{formData.companyName}</strong> ({formData.province}) a nuestro representante zonal. En breve te enviaremos la lista de precios y condiciones.
          </p>

          <div className="w-full mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left">
              <span className="text-xs font-bold text-emerald-900 block">¿Querés cotización urgente para despachos esta semana?</span>
              <span className="text-[11px] text-emerald-700">Comunicate directo con nuestro Gerente Comercial por WhatsApp:</span>
            </div>

            <a
              href={`https://wa.me/5493512345678?text=Hola%20Pastas%20Sbiroli,%20acabo%20de%20enviar%20la%20solicitud%20para%20${encodeURIComponent(formData.companyName)}%20(${encodeURIComponent(formData.province)})%20por%20${formData.estimatedMonthlyTons}%20toneladas.%20Quisiera%20agilizar%20la%20cotización.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-md flex-shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>

          <Button
            type="button"
            variant="outline-navy"
            size="md"
            onClick={() => setIsSuccessModalOpen(false)}
            className="mt-3 w-full"
          >
            Cerrar Ventana
          </Button>
        </div>
      </Modal>

    </section>
  );
};
