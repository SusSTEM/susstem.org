import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhatIsSusSTEM } from "./components/WhatIsSusSTEM";
import { ImpactStats } from "./components/ImpactStats";
import { GetInvolved } from "./components/GetInvolved";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { CTASection } from "./components/CTASection";
import { AboutUs } from "./components/AboutUs";
import { Testimonials } from "./components/Testimonials";
import { ContactPreview } from "./components/ContactPreview";
import { Footer } from "./components/Footer";
import { VolunteerPage } from "./components/VolunteerPage";
import { DonatePage } from "./components/DonatePage";
import { PartnerPage } from "./components/PartnerPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render form pages
  if (currentPage === "volunteer") {
    return (
      <div className="min-h-screen bg-[#eff2e7]">
        <Navbar onNavigate={handleNavigate} />
        <VolunteerPage />
        <Footer />
      </div>
    );
  }

  if (currentPage === "donate") {
    return (
      <div className="min-h-screen bg-[#eff2e7]">
        <Navbar onNavigate={handleNavigate} />
        <DonatePage />
        <Footer />
      </div>
    );
  }

  if (currentPage === "partner") {
    return (
      <div className="min-h-screen bg-[#eff2e7]">
        <Navbar onNavigate={handleNavigate} />
        <PartnerPage />
        <Footer />
      </div>
    );
  }

  // Render homepage
  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigate} />
      <Hero />
      <WhatIsSusSTEM />
      <ImpactStats />
      <FeaturedProjects />
      <GetInvolved onNavigate={handleNavigate} />
      <CTASection />
      <AboutUs />
      <Testimonials />
      <ContactPreview />
      <Footer />
    </div>
  );
}