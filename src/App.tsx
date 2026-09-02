import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { HeroSection } from './features/hero/HeroSection';
import { StorySection } from './features/history-story/StorySection';
import { CatalogSection } from './features/catalog/CatalogSection';
import { DistributorFunnelSection } from './features/b2b-funnel/DistributorFunnelSection';
import { LocationsSection } from './features/locations/LocationsSection';
import { Footer } from './components/Footer/Footer';
import { BackToTop } from './components/BackToTop/BackToTop';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-sbiroli-semolina-100 text-sbiroli-navy font-sans antialiased selection:bg-sbiroli-rosso selection:text-white flex flex-col justify-between">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <StorySection />
        <CatalogSection />
        <DistributorFunnelSection />
        <LocationsSection />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
