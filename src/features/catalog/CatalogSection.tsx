import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '../../data/products.mock';
import { Product, PastaCategory } from '../../types/product.types';
import { ProductCard } from './ProductCard';
import { TechnicalSheetModal } from './TechnicalSheetModal';
import { Badge } from '../../components/Badge/Badge';
import { Search, UtensilsCrossed, Package } from 'lucide-react';

export const CatalogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PastaCategory>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  const categories: { id: PastaCategory; label: string; count?: number }[] = [
    { id: 'todas', label: 'Todas las Variedades' },
    { id: 'largas', label: 'Pastas Largas' },
    { id: 'cortas', label: 'Pastas Cortas' },
    { id: 'nidos', label: 'Nidos & Cintas' },
    { id: 'guiseras', label: 'Línea Guisera & Sopas' },
  ];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'todas' ? true : product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.line.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shapeType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="catalogo" className="py-20 lg:py-28 bg-semolina-texture border-b border-sbiroli-semolina-300 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="rosso" size="md" icon={<UtensilsCrossed className="w-3.5 h-3.5" />}>
            CATÁLOGO TRADICIONAL & MAYORISTA
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-sbiroli-navy mt-3 tracking-tight">
            Nuestra familia de pastas secas
          </h2>
          <p className="text-base text-sbiroli-navy-800/80 mt-3 leading-relaxed">
            Explorá los cortes clásicos italo-argentinos elaborados en Cruz del Eje. Hacé clic en <em>"Ficha Mayorista"</em> para consultar paletizado, códigos EAN y tabla nutricional.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-sbiroli-semolina-300">
          
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto" role="tablist" aria-label="Filtro de categorías de pasta">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-sbiroli-navy text-white shadow-sbiroli-md scale-[1.02]'
                      : 'bg-white text-sbiroli-navy-700 hover:bg-sbiroli-semolina-200 border border-sbiroli-semolina-300'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por fideo o corte..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-sbiroli-semolina-300 bg-white text-xs sm:text-sm text-sbiroli-navy focus:outline-none focus:ring-2 focus:ring-sbiroli-navy placeholder:text-gray-400"
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenSpecs={(p) => setSelectedProductForModal(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-sbiroli-semolina-300 p-8 max-w-md mx-auto">
            <Package className="w-12 h-12 text-sbiroli-navy-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold font-display text-sbiroli-navy">No se encontraron productos</h3>
            <p className="text-xs text-gray-500 mt-1">
              Probá limpiando el buscador o seleccionando otra categoría.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todas');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-sbiroli-semolina-200 text-xs font-bold text-sbiroli-navy hover:bg-sbiroli-semolina-300 transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

        <TechnicalSheetModal
          product={selectedProductForModal}
          isOpen={Boolean(selectedProductForModal)}
          onClose={() => setSelectedProductForModal(null)}
        />

      </div>
    </section>
  );
};
