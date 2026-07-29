import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import WhatIsSusSTEM from "./components/WhatIsSusSTEM";
import { ImpactStats } from "./components/ImpactStats";
import { GetInvolved } from "./components/GetInvolved";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { CircularGalleryShowcase } from "./pages/CircularGalleryPage";
import { CTASection } from "./components/CTASection";
import { AboutUs } from "./components/MissionVision";
import { Testimonials } from "./components/Testimonials";
import { PartnerShowcase } from "./components/PartnerShowcase";
import { ContactPreview } from "./components/ContactPreview";
import { Footer } from "./components/Footer";
import { VolunteerPage } from "./pages/VolunteerPage";
import { ContributePage } from "./pages/ContributePage";
import { PartnerPage } from "./pages/PartnerPage";
import { AirAlertPage } from "./pages/AirAlertPage";
import { CircularGalleryPage } from "./pages/CircularGalleryPage";
// INNOVATOR_REMOVED: restore this import and the route block below if Level 2 Innovator returns.
// import { InnovatorPage } from "./pages/InnovatorPage";
import { ChangemakerPage } from "./pages/ChangemakerPage";
import { ContactPage } from "./pages/ContactPage";

type PageKey =
  | "home"
  | "volunteer"
  | "contribute"
  | "partner"
  | "air-alert"
  | "gallery"
  | "contact"
  | "changemaker";

const pagePaths: Record<PageKey, string> = {
  home: "/",
  volunteer: "/volunteer",
  contribute: "/contribute",
  partner: "/partner",
  "air-alert": "/air-alert",
  gallery: "/gallery",
  contact: "/contact",
  changemaker: "/changemaker",
};

function getPageFromPath(pathname: string): PageKey {
  const normalizedPath = pathname.replace(/\/$/, "") || "/";

  switch (normalizedPath) {
    case "/volunteer":
      return "volunteer";
    case "/contribute":
      return "contribute";
    case "/partner":
      return "partner";
    case "/air-alert":
      return "air-alert";
    case "/gallery":
      return "gallery";
    case "/contact":
      return "contact";
    case "/innovator":
      return "changemaker";
    case "/changemaker":
      return "changemaker";
    default:
      return "home";
  }
}

function getSectionFromHash(hash: string) {
  const section = hash.replace(/^#/, "");
  return ["what-is-susstem", "projects", "impact", "about-us", "get-involved", "contact"].includes(section)
    ? section
    : null;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>(() =>
    getPageFromPath(window.location.pathname)
  );
  const [pendingSection, setPendingSection] = useState<string | null>(() =>
    getPageFromPath(window.location.pathname) === "home"
      ? getSectionFromHash(window.location.hash)
      : null
  );

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = getPageFromPath(window.location.pathname);
      setCurrentPage(nextPage);
      setPendingSection(nextPage === "home" ? getSectionFromHash(window.location.hash) : null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (window.location.pathname.replace(/\/$/, "") === "/innovator") {
      window.history.replaceState({}, "", "/changemaker");
    }
  }, []);

  useEffect(() => {
    if (currentPage !== "home" || !pendingSection) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const element = document.getElementById(pendingSection);
      element?.scrollIntoView({ behavior: "smooth" });
      setPendingSection(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentPage, pendingSection]);

  useEffect(() => {
    if (currentPage === "home" && pendingSection) {
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, pendingSection]);

  const handleNavigate = (page: string) => {
    const [pageName, section] = page.split("#");
    const nextPage = (pageName || "home") as PageKey;
    const nextPath = pagePaths[nextPage] ?? "/";

    setCurrentPage(nextPage);

    if (nextPage === "home" && section) {
      setPendingSection(section);
      window.history.pushState({}, "", `${nextPath}#${section}`);
      return;
    }

    setPendingSection(null);
    window.history.pushState({}, "", nextPath);
  };

  if (currentPage === "volunteer") {
    return (
      <div className="min-h-screen bg-[#eff2e7]">
        <Navbar onNavigate={handleNavigate} />
        <VolunteerPage />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "contribute") {
    return (
      <div className="min-h-screen bg-[#eff2e7]">
        <Navbar onNavigate={handleNavigate} />
        <ContributePage />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "partner") {
    return (
      <div className="min-h-screen bg-[#eff2e7]">
        <Navbar onNavigate={handleNavigate} />
        <PartnerPage />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "air-alert") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onNavigate={handleNavigate} />
        <AirAlertPage onNavigate={handleNavigate} />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  if (currentPage === "gallery") {
    return <CircularGalleryPage onNavigate={handleNavigate} />;
  }

  if (currentPage === "contact") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onNavigate={handleNavigate} />
        <ContactPage onNavigate={handleNavigate} />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  // INNOVATOR_REMOVED: restore this block if Level 2 Innovator returns.
  // if (currentPage === "innovator") {
  //   return (
  //     <div className="min-h-screen bg-white">
  //       <Navbar onNavigate={handleNavigate} />
  //       <InnovatorPage onNavigate={handleNavigate} />
  //       <Footer onNavigate={handleNavigate} />
  //     </div>
  //   );
  // }

  if (currentPage === "changemaker") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onNavigate={handleNavigate} />
        <ChangemakerPage onNavigate={handleNavigate} />
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigate} />
      <Hero />
      <WhatIsSusSTEM />
      <FeaturedProjects onNavigate={handleNavigate} />
      <div id="gallery" className="scroll-mt-32 bg-white px-0 pb-0 pt-10">
        <CircularGalleryShowcase />
      </div>
      <ImpactStats />
      <GetInvolved onNavigate={handleNavigate} />
      <AboutUs />
      <CTASection />
      <Testimonials />
      <PartnerShowcase />
      <ContactPreview onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
