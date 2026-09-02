import React from 'react';
import { Product } from '../../types/product.types';
import { Modal } from '../../components/Modal/Modal';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { ShieldCheck, Layers, Barcode, MessageSquare } from 'lucide-react';

export interface TechnicalSheetModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalSheetModal: React.FC<TechnicalSheetModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      subtitle={`Ficha Técnica y Logística Mayorista · SKU: ${product.technicalSpecs.sku}`}
      maxWidth="2xl"
    >
      <div className="flex flex-col gap-6">
        
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="navy" size="md">
            Línea {product.line}
          </Badge>
          <Badge variant="gold" size="md">
            Formato: {product.weightGrams}g
          </Badge>
          <Badge variant="semolina" size="md">
            {product.shapeType}
          </Badge>
        </div>

        <div className="p-4 rounded-xl bg-sbiroli-semolina-100 border border-sbiroli-semolina-300">
          <p className="text-xs sm:text-sm text-sbiroli-navy leading-relaxed">
            {product.description}
          </p>
          <div className="mt-2 text-xs font-semibold text-sbiroli-navy-800">
            <strong>Ingredientes:</strong> {product.ingredients.join(', ')}.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-4 rounded-xl bg-white border-2 border-sbiroli-semolina-300 shadow-sm flex flex-col gap-3">
            <h4 className="text-sm font-bold font-display text-sbiroli-navy flex items-center gap-2 pb-2 border-b border-sbiroli-semolina-200">
              <Layers className="w-4 h-4 text-sbiroli-rosso" />
              Especificaciones Logísticas
            </h4>

            <dl className="grid grid-cols-2 gap-y-2.5 text-xs">
              <dt className="text-gray-600">Unidades por caja:</dt>
              <dd className="font-bold text-sbiroli-navy text-right">{product.technicalSpecs.unitsPerBox} paquetes</dd>

              <dt className="text-gray-600">Peso caja cerrada:</dt>
              <dd className="font-bold text-sbiroli-navy text-right">{product.technicalSpecs.boxWeightKg} kg</dd>

              <dt className="text-gray-600">Cajas por pallet:</dt>
              <dd className="font-bold text-sbiroli-navy text-right">{product.technicalSpecs.boxesPerPallet} cajas</dd>

              <dt className="text-gray-600">Distribución Ti/Hi:</dt>
              <dd className="font-bold text-sbiroli-navy text-right">{product.technicalSpecs.palletTiHi}</dd>

              <dt className="text-gray-600">Vida útil:</dt>
              <dd className="font-bold text-emerald-700 text-right">{product.technicalSpecs.shelfLifeMonths} meses</dd>
            </dl>

            <div className="pt-2 border-t border-sbiroli-semolina-200 flex flex-col gap-1 text-[11px] font-mono">
              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center gap-1 font-bold">
                  <Barcode className="w-3.5 h-3.5" /> EAN-13:
                </span>
                <span>{product.technicalSpecs.ean13}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center gap-1 font-bold">
                  <Barcode className="w-3.5 h-3.5" /> DUN-14:
                </span>
                <span>{product.technicalSpecs.dun14}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border-2 border-sbiroli-semolina-300 shadow-sm flex flex-col gap-3">
            <h4 className="text-sm font-bold font-display text-sbiroli-navy flex items-center gap-2 pb-2 border-b border-sbiroli-semolina-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Información Nutricional ({product.nutritionalInfo.servingSize})
            </h4>

            <table className="w-full text-xs text-left" aria-label="Tabla de información nutricional">
              <tbody>
                <tr className="border-b border-gray-100 py-1">
                  <td className="py-1 text-gray-600">Valor Energético</td>
                  <td className="py-1 font-bold text-sbiroli-navy text-right">{product.nutritionalInfo.energyKcal} kcal</td>
                </tr>
                <tr className="border-b border-gray-100 py-1">
                  <td className="py-1 text-gray-600">Carbohidratos</td>
                  <td className="py-1 font-bold text-sbiroli-navy text-right">{product.nutritionalInfo.carbsG} g</td>
                </tr>
                <tr className="border-b border-gray-100 py-1">
                  <td className="py-1 text-gray-600">Proteínas</td>
                  <td className="py-1 font-bold text-sbiroli-navy text-right">{product.nutritionalInfo.proteinsG} g</td>
                </tr>
                <tr className="border-b border-gray-100 py-1">
                  <td className="py-1 text-gray-600">Grasas Totales</td>
                  <td className="py-1 font-bold text-sbiroli-navy text-right">{product.nutritionalInfo.fatsG} g</td>
                </tr>
                <tr className="border-b border-gray-100 py-1">
                  <td className="py-1 text-gray-600">Fibra Alimentaria</td>
                  <td className="py-1 font-bold text-sbiroli-navy text-right">{product.nutritionalInfo.dietaryFiberG} g</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600">Sodio</td>
                  <td className="py-1 font-bold text-sbiroli-navy text-right">{product.nutritionalInfo.sodiumMg} mg</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <div className="p-4 rounded-xl bg-sbiroli-navy-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-sbiroli-gold uppercase tracking-wider">
              ¿Querés cotizar este producto por equipo o pallet cerrado?
            </div>
            <div className="text-xs text-gray-300 mt-0.5">
              Contactá a nuestro equipo comercial de planta o completá el formulario.
            </div>
          </div>

          <Button
            asAnchor
            href="#distribuidores"
            variant="rosso"
            size="sm"
            onClick={onClose}
            rightIcon={<MessageSquare className="w-4 h-4" />}
            className="flex-shrink-0 font-bold"
          >
            Solicitar Lista de Precios
          </Button>
        </div>

      </div>
    </Modal>
  );
};
