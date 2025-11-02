import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhatIsSusSTEM } from "./components/WhatIsSusSTEM";
import { ImpactStats } from "./components/ImpactStats";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { CTASection } from "./components/CTASection";
import { Testimonials } from "./components/Testimonials";
import { ContactPreview } from "./components/ContactPreview";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <WhatIsSusSTEM />
      <ImpactStats />
      <FeaturedProjects />
      <CTASection />
      <Testimonials />
      <ContactPreview />
      <Footer />
    </div>
  );
}
