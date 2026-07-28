import { Button } from "../components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Badge } from "../components/ui/badge";
import { Info, Droplets, AlertCircle, Gauge } from "lucide-react";
import { Target, Users, Wrench, BarChart3, IterationCcw, Presentation } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface ChangemakerPageProps {
  onNavigate?: (page: string) => void;
}

export function ChangemakerPage({ onNavigate }: ChangemakerPageProps) {
  const handleNavigate = (page: string) => { if (onNavigate) onNavigate(page); };
  const openInquiry = (subject: string) => {
    window.location.href = `mailto:hello@susstem.org?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#ff9b69]/75 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); handleNavigate("home"); }} className="text-[#072d2d] hover:text-[#20593A]">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); handleNavigate("home#projects"); }} className="text-[#072d2d] hover:text-[#20593A]">The Programme</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#20593a]">Changemaker Level</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero + Level Overview */}
      <section className="bg-[#eff2e7] py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#072d2d] text-[#a4ff7b] hover:bg-[#ff9b69]/80 hover:text-[#072d2d] mb-5 sm:mb-6 px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base">Level 2</Badge>
            <h1 className="text-[#000000] mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl" style={{ fontWeight: 700, lineHeight: 1.2 }}>Changemaker: For Ages 14-18</h1>
            <p className="text-[#072d2d] text-base sm:text-xl md:text-2xl mb-8 sm:mb-12">Building solutions for real-world sustainability challenges in your community</p>
            
            {/* Overview Card with Fixed Spacing */}
            <div className="bg-[#ff9b69CC] p-6 sm:p-8 md:p-12 rounded-3xl shadow-md mt-8">
              <h2 className="text-[#000000] mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-[36px]" style={{ fontWeight: 700, lineHeight: 1.3 }}>
                <span className="text-[#072d2d]">Level 2</span> Overview
              </h2>
              <p className="text-[#000000] text-sm sm:text-base md:text-lg leading-relaxed">
                Level 2 is where students form teams of 3 and choose 1 of 4 environmental challenges: <strong>air pollution, flooding, solid waste, or marine pollution</strong>. Over the course of the programme, teams will apply what they've learnt throughout the SusSTEM programme to design and build STEM-powered solutions that address their chosen problem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-[#000000] mb-10 sm:mb-12 text-center text-2xl sm:text-3xl md:text-[36px]" style={{ fontWeight: 700, lineHeight: 1.3 }}>Learning Outcomes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Identify a community problem worth solving" },
              { icon: Users, title: "Co‑design a solution with users in mind" },
              { icon: Wrench, title: "Plan and build a custom STEM prototype" },
              { icon: BarChart3, title: "Use data to drive decisions" },
              { icon: IterationCcw, title: "Iterate for real‑world impact" },
              { icon: Presentation, title: "Pitch your changemaker project" },
            ].map((outcome, index) => (
              <div key={index} className="bg-[#eff2e7] p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff9b69]/80 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#bcb0fa]/80 transition-colors duration-300">
                    <outcome.icon className="w-6 h-6 text-[#000000]" />
                  </div>
                  <p className="text-[#000000] font-medium text-lg">{outcome.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#eff2e7]">
        <div className="bg-[#ff9b69]/80 max-w-4xl mx-auto text-center px-6 p-8 md:p-12 rounded-3xl shadow-md mt-8">
          <h2 className="text-[#000000] mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-[36px]" style={{ fontWeight: 700, lineHeight: 1.3 }}>
            <span className="text-[#072d2d]">The Problem?</span>
          </h2>
          <p className="text-[#000000] text-sm sm:text-base md:text-lg leading-relaxed mb-8">
            In the last decade, several critical environmental crises have intensified across the world, especially in South Asia: <strong>AIR POLLUTION</strong> that chokes cities like Delhi with toxic smog, catastrophic <strong>FLOODING</strong> that submerges streets and contaminates water supplies, mountains of <strong>SOLID WASTE</strong> and <strong>E-WASTE</strong> that overflow from inadequate disposal systems, and <strong>MARINE POLLUTION</strong> that destroys coastal ecosystems. In our Level 3 <strong>Changemaker</strong> programme, students team up, choose one of these urgent challenges and build their own STEM-powered solutions.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { src: "/images/delhiairpollutionsusstem.jpg", alt: "Delhi Air Pollution" },
              { src: "/images/floodpeoplesusstem.jpg", alt: "Flooding" },
              { src: "/images/trahsoverflowsusstem.jpeg", alt: "Solid Waste Accumulation" },
              { src: "/images/fishwithtrashsusstem.jpeg", alt: "Impact of Marine Pollution" },
            ].map(({ src, alt }) => (
              <div key={alt} className="w-full h-64 rounded-3xl overflow-hidden shadow-lg">
                <ImageWithFallback src={src} alt={alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 p-6 sm:p-8 md:p-12">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-[#000000] mb-4 text-2xl sm:text-3xl md:text-[36px]" style={{ fontWeight: 700, lineHeight: 1.3 }}>
              Featured <span className="text-[#20593a]">SusSTEM</span> Project
            </h2>
            <h3 className="text-black mb-3 text-xl sm:text-2xl md:text-[28px]" style={{ fontWeight: 600, lineHeight: 1.4 }}>Community Impact Project – Solar-Powered Desalination System</h3>
            <p className="text-[#072d2d] text-sm sm:text-base md:text-xl mb-8 p-4 sm:p-6 md:p-10">
              A solar-powered desalination system turns salty or brackish water into safe drinking water for off-grid communities using sun-driven distillation, directly addressing water scarcity while integrating science, technology, engineering, and mathematics into one impactful STEM solution.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mt-10 sm:mt-12">
            <div className="space-y-4">
              <div className="bg-[#a2bb65]/80 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-[#000000] mb-2" style={{ fontSize: "20px", fontWeight: 600 }}>Safe Water Ready</h4>
                  <p className="text-[#072d2d]">Confirms when sensor readings show the treated water is within a safe range for drinking.</p>
                </div>
              </div>
              <div className="bg-[#ffd459]/80 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <Gauge className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-[#000000] mb-2" style={{ fontSize: "20px", fontWeight: 600 }}>Keep an Eye On It</h4>
                  <p className="text-[#072d2d]">Flags changing conditions so students and communities know when to watch the system more closely.</p>
                </div>
              </div>
              <div className="bg-[#ff0000]/40 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-[#000000] mb-2" style={{ fontSize: "20px", fontWeight: 600 }}>Warning: Possible Contamination</h4>
                  <p className="text-[#072d2d]">Alerts users when measurements suggest the water may no longer be safe and action is needed.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback src="/images/changemakerprojsusstem.jpg" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}