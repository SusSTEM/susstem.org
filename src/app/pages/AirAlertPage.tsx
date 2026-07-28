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
import { Info, Zap, Sprout, Microscope, Lightbulb, Code2, Leaf, Check, AlertTriangle, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface AirAlertPageProps {
  onNavigate?: (page: string) => void;
}

export function AirAlertPage({ onNavigate }: AirAlertPageProps) {
  const handleNavigate = (page: string) => { if (onNavigate) onNavigate(page); };
  const openInquiry = (subject: string) => {
    window.location.href = `mailto:hello@susstem.org?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#a2bb65]/80 border-b border-gray-200">
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
                <BreadcrumbPage className="text-[#20593A]">Explorer Level</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#eff2e7] py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#072d2d] text-[#a4ff7b] hover:bg-[#a2bb65]/70 hover:text-[#072d2d] mb-5 sm:mb-6 px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base">Level 1</Badge>
            <h1 className="text-[#000000] mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl" style={{ fontWeight: 700, lineHeight: 1.2 }}>Explorer: For Ages 11-14</h1>
            <p className="text-[#072d2d] text-base sm:text-xl md:text-2xl mb-8 sm:mb-12">First steps in building smart, sustainable circuits for real-world change</p>
            <div className="bg-[#a2bb65CC] p-5 sm:p-8 md:p-12 rounded-3xl shadow-md mt-8">
              <h2 className="text-[#000000] mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-[36px]" style={{ fontWeight: 700, lineHeight: 1.3 }}>
                <span className="text-[#072d2d]">Level 1</span> Overview
              </h2>
              <p className="text-[#000000] text-sm sm:text-base md:text-lg leading-relaxed">
                Level 1 introduces young explorers to the fundamentals of AI, Machine Learning, Python Coding, Electronics and basic sensor technology. Students build confidence through hands-on experiments, learning how simple components can interact to form functional circuits. The emphasis is on creativity, collaboration and discovery, helping learners connect classroom concepts to real-world applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-[#000000] mb-10 sm:mb-12 text-center text-2xl sm:text-3xl md:text-[36px]" style={{ fontWeight: 700, lineHeight: 1.3 }}>Learning Outcomes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Leaf, title: "Explore SusSTEM's approach of STEM for Sustainability" },
              { icon: Zap, title: "Understand and build simple Arduino-powered circuits" },
              { icon: Microscope, title: "Learning how sensors detect environmental changes" },
              { icon: Code2, title: "Programming simple if-then logic" },
              { icon: Sprout, title: "Environmental awareness about air quality" },
              { icon: Lightbulb, title: "Problem-solving with STEM solutions" },
            ].map((outcome, index) => (
              <div key={index} className="bg-[#eff2e7] p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#a2bb65CC] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#20593A] transition-colors duration-300">
                    <outcome.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-[#000000] font-medium text-lg">{outcome.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Overview Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#eff2e7]">
        <div className="bg-[#a2bb65CC] max-w-4xl mx-auto text-center px-6 p-8 md:p-12 rounded-3xl shadow-md mt-8">
          <h2 className="text-[#000000] mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-[36px]" style={{ fontWeight: 700, lineHeight: 1.3 }}>
            <span className="text-[#072d2d]">The Problem?</span>
          </h2>
          <p className="text-[#000000] text-sm sm:text-base md:text-lg leading-relaxed">
            In recent years, forest fires in South India and around the world have shown how quickly clean air can turn dangerous. When forests burn, they release invisible gases and tiny particles into the air, creating thick smoke that can travel far from the fire itself. This polluted air can trigger breathing problems, heart issues, and long-term health risks for entire communities, especially children and older people. Yet many families have no simple way to know when the air around them has become unsafe.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-full rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback src="/images/wildfiresusstem.jpg" alt="Forest Fires" className="w-full h-64 md:h-80 object-cover" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 p-6 sm:p-8 md:p-12">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-[36px]" style={{ fontWeight: 700, lineHeight: 1.3, color: "#000000" }}>
              Featured <span style={{ color: "#20593a" }}>SusSTEM</span> Solution
            </h2>
            <h3 className="text-black mb-3 text-xl sm:text-2xl md:text-[28px]" style={{ fontWeight: 600, lineHeight: 1.4 }}>Air Alert - Environmental Monitoring System</h3>
            <p className="text-[#072d2d] text-sm sm:text-base md:text-lg mb-8 p-4 sm:p-6 md:p-10">
              The MQ2 gas sensor detects harmful or unusual gases in the air and sends this information to the circuit. As gas levels rise or fall, different colored LEDs light up to show what is happening: green for safe conditions, yellow when caution is needed, and red when the air may be unsafe.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mt-10 sm:mt-12">
            <div className="space-y-4">
              <div className="bg-[#a2bb65] p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-[#000000] mb-2" style={{ fontSize: "20px", fontWeight: 600 }}>Green LED: Safe Air Quality</h4>
                  <p className="text-[#072d2d]">Low gas levels detected - the air is safe to breathe</p>
                </div>
              </div>
              <div className="bg-[#ffd459] p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-[#000000] mb-2" style={{ fontSize: "20px", fontWeight: 600 }}>Yellow LED: Moderate Gas Levels</h4>
                  <p className="text-[#072d2d]">Caution advised - gas levels are elevated</p>
                </div>
              </div>
              <div className="bg-[#ff0000]/40 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-[#000000] mb-2" style={{ fontSize: "20px", fontWeight: 600 }}>Red LED: Dangerous Gas Levels</h4>
                  <p className="text-[#072d2d]">Warning! High gas concentration detected</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback src="/images/peopleinruralschoolsusstem.jpg" className="w-full h-92 object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
