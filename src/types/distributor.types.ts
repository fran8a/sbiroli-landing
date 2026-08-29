export type BusinessType = 
  | 'distribuidor_mayorista'
  | 'cadena_supermercados'
  | 'autoservicio_regional'
  | 'gastronomia_horeca'
  | 'exportador'
  | 'otro';

export interface DistributorFormData {
  fullName: string;
  companyName: string;
  cuit: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  businessType: BusinessType;
  estimatedMonthlyTons: number;
  hasOwnLogistics: boolean;
  notes?: string;
  acceptTerms: boolean;
}

export interface FormValidationErrors {
  fullName?: string;
  companyName?: string;
  cuit?: string;
  email?: string;
  phone?: string;
  province?: string;
  city?: string;
  businessType?: string;
  acceptTerms?: string;
}
