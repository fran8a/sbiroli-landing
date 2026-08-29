import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { HeroSection } from './features/hero/HeroSection';
import { StatsStrip } from './components/StatsStrip/StatsStrip';
import { StorySection } from './features/history-story/StorySection';
import { CatalogSection } from './features/catalog/CatalogSection';
import { DistributorFunnelSection } from './features/b2b-funnel/DistributorFunnelSection';
import { LocationsSection } from './features/locations/LocationsSection';
import { Footer } from './components/Footer/Footer';
import { BackToTop } from './components/BackToTop/BackToTop';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-sbiroli-semolina-100 text-sbiroli-navy font-sans antialiased selection:bg-sbiroli-rosso selection:text-white flex flex-col justify-between">
      {/* 1. Header Fijo con Navegación y CTA Comercial */}
      <Navbar />

      {/* 2. Main Landmark */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Hero: Marco cinemático único con crossfade video2↔video1 */}
        <HeroSection />

        {/* Franja de métricas: 88 Años · 100% Candeal · 18h · +18 Prov. */}
        <StatsStrip />

        {/* Historia & Herencia: Cruz del Eje 1938, Secado Lento & Timeline */}
        <StorySection />

        {/* Catálogo Interactivo con Ficha Mayorista Modal */}
        <CatalogSection />

        {/* Funnel B2B Mayorista con Slider de Volumen & Validaciones */}
        <DistributorFunnelSection />

        {/* Red Logística & Puntos de Distribución Nacional */}
        <LocationsSection />
      </main>

      {/* 3. Footer Institucional */}
      <Footer />

      {/* 4. Utilidad Accesible Back-To-Top */}
      <BackToTop />
    </div>
  );
};

export default App;
