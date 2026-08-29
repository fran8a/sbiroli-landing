export interface RetailerLocation {
  id: string;
  name: string;
  category: 'Centro de Distribución' | 'Mayorista Oficial' | 'Cadena Regional';
  province: string;
  city: string;
  address: string;
  phone: string;
  coverageArea: string;
  leadTimeHours: number;
}

export interface TimelineMilestone {
  year: number | string;
  title: string;
  description: string;
  highlight: string;
  badge?: string;
}
