import React from 'react';
import { Product } from '../../types/product.types';
import { Clock, FileText, Package, ChefHat } from 'lucide-react';
import { Card } from '../../components/Card/Card';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';

export interface ProductCardProps {
  product: Product;
  onOpenSpecs: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenSpecs }) => {
  const getLineBadgeVariant = (line: Product['line']) => {
    switch (line) {
      case 'Especial al Huevo':
        return 'gold';
      case 'Espinaca & Verdura':
        return 'success';
      case 'Línea Guisera':
        return 'rosso';
      default:
        return 'navy';
    }
  };

  return (
    <Card
      variant="white"
      elevation="sm"
      interactive
      className="flex flex-col justify-between overflow-hidden border-2 border-sbiroli-semolina-300 hover:border-sbiroli-navy transition-all duration-300 group"
    >
      <div className="relative bg-gradient-to-br from-sbiroli-semolina-100 to-amber-50/70 p-6 flex flex-col items-center justify-center border-b border-sbiroli-semolina-200 min-h-[190px]">
        <div className="absolute top-3 left-3">
          <Badge variant={getLineBadgeVariant(product.line)} size="sm">
            {product.line}
          </Badge>
        </div>

        <div className="absolute top-3 right-3 text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/80 border border-sbiroli-semolina-300 text-sbiroli-navy">
          {product.weightGrams}g
        </div>

        <div className="w-20 h-20 rounded-2xl bg-white shadow-md border-2 border-sbiroli-semolina-300 flex flex-col items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
          <Package className="w-8 h-8 text-sbiroli-navy group-hover:text-sbiroli-rosso transition-colors" />
          <span className="text-[9px] font-bold font-display text-sbiroli-navy uppercase mt-1">Sbiroli</span>
        </div>

        <span className="text-[11px] font-bold text-sbiroli-navy-600 mt-3 uppercase tracking-wider">
          {product.shapeType}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-display text-sbiroli-navy group-hover:text-sbiroli-rosso transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-sbiroli-navy-800/80 mt-1.5 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          <div className="mt-4 flex items-center justify-between p-2.5 rounded-xl bg-sbiroli-semolina-100 border border-sbiroli-semolina-200 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-sbiroli-navy">
              <Clock className="w-3.5 h-3.5 text-sbiroli-rosso" />
              <span>Al Dente: <strong className="text-sbiroli-rosso">{product.cookingTimeMinutes.alDente}'</strong></span>
            </div>
            <span className="text-gray-400">|</span>
            <div className="text-gray-600">
              <span>Suave: {product.cookingTimeMinutes.suave}'</span>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-1.5 text-[11px] text-sbiroli-navy-700 bg-amber-50/50 p-2 rounded-lg border border-amber-100">
            <ChefHat className="w-3.5 h-3.5 text-sbiroli-gold-700 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2"><strong>Maridaje:</strong> {product.culinaryPairing}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-sbiroli-semolina-200 flex items-center justify-between gap-2">
          <div className="text-[11px] text-gray-500">
            Caja x {product.technicalSpecs.unitsPerBox} un.
          </div>
          <Button
            type="button"
            variant="outline-navy"
            size="sm"
            onClick={() => onOpenSpecs(product)}
            leftIcon={<FileText className="w-3.5 h-3.5" />}
            className="text-xs py-1.5"
          >
            Ficha Mayorista
          </Button>
        </div>
      </div>
    </Card>
  );
};
