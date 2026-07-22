import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import WhatIsSusSTEM from "./components/WhatIsSusSTEM";
import { ImpactStats } from "./components/ImpactStats";
import { GetInvolved } from "./components/GetInvolved";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { CTASection } from "./components/CTASection";
import { AboutUs } from "./components/MissionVision";
import { Testimonials } from "./components/Testimonials";
import { ContactPreview } from "./components/ContactPreview";
import { Footer } from "./components/Footer";
import { VolunteerPage } from "./pages/VolunteerPage";
import { ContributePage } from "./pages/ContributePage";
import { PartnerPage } from "./pages/PartnerPage";
import { AirAlertPage } from "./pages/AirAlertPage";
// INNOVATOR_REMOVED: import { InnovatorPage } from "./pages/InnovatorPage";
import { ChangemakerPage } from "./pages/ChangemakerPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentPage === "volunteer") {
    return (
      <div className="min-h-screen bg-[#eff2e7]">
        <Navbar onNavigate={handleNavigate} />
        <VolunteerPage />
        <Footer />
      </div>
    );
  }

  if (currentPage === "contribute") {
    return (
      <div className="min-h-screen bg-[#eff2e7]">
        <Navbar onNavigate={handleNavigate} />
        <ContributePage />
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

  if (currentPage === "air-alert") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onNavigate={handleNavigate} />
        <AirAlertPage onNavigate={handleNavigate} />
        <Footer />
      </div>
    );
  }

  // INNOVATOR_REMOVED: uncomment to restore Level 2 Innovator page
  // if (currentPage === "innovator") {
  //   return (
  //     <div className="min-h-screen bg-white">
  //       <Navbar onNavigate={handleNavigate} />
  //       <InnovatorPage onNavigate={handleNavigate} />
  //       <Footer />
  //     </div>
  //   );
  // }

  if (currentPage === "changemaker") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onNavigate={handleNavigate} />
        <ChangemakerPage onNavigate={handleNavigate} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigate} />
      <Hero />
      <WhatIsSusSTEM />
      <FeaturedProjects onNavigate={handleNavigate} />
      <ImpactStats />
      <GetInvolved onNavigate={handleNavigate} />
      <AboutUs />
      <CTASection />
      <Testimonials />
      <ContactPreview />
      <Footer />
    </div>
  );
}
