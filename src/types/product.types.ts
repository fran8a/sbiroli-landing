export type PastaCategory = 'todas' | 'largas' | 'cortas' | 'nidos' | 'guiseras';

export interface NutritionalInfo {
  servingSize: string; // ej: "80g (1 plato)"
  energyKcal: number;
  proteinsG: number;
  carbsG: number;
  fatsG: number;
  dietaryFiberG: number;
  sodiumMg: number;
}

export interface TechnicalSpecs {
  sku: string;
  ean13: string;
  dun14: string;
  unitsPerBox: number;
  boxWeightKg: number;
  boxesPerPallet: number;
  palletTiHi: string; // ej: "10 x 6 (60 cajas)"
  shelfLifeMonths: number;
  storageConditions: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  line: 'Tradicional Candeal' | 'Especial al Huevo' | 'Espinaca & Verdura' | 'Línea Guisera';
  category: 'largas' | 'cortas' | 'nidos' | 'guiseras';
  tagline: string;
  description: string;
  cookingTimeMinutes: {
    alDente: number;
    suave: number;
  };
  weightGrams: number;
  shapeType: string;
  ingredients: string[];
  nutritionalInfo: NutritionalInfo;
  technicalSpecs: TechnicalSpecs;
  culinaryPairing: string;
  featured?: boolean;
}
