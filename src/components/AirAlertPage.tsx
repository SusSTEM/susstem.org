import { Button } from "./ui/button";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "./ui/breadcrumb";
import { Badge } from "./ui/badge";
import { 
  Download,
  Mail,
  Zap,
  Sprout,
  Microscope,
  Lightbulb,
  Code2,
  Leaf,
  Check,          // Add this
  AlertTriangle,  // Add this
  X              // Add this
} from "lucide-react";

import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AirAlertPageProps {
  onNavigate?: (page: string) => void;
}

export function AirAlertPage({ onNavigate }: AirAlertPageProps) {
  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const learningHighlights = [
    { 
      icon: Zap, 
      title: "Electronics Basics", 
      description: "Circuits and components" 
    },
    { 
      icon: Sprout, 
      title: "Environmental Awareness", 
      description: "Air quality monitoring" 
    },
    { 
      icon: Microscope, 
      title: "Sensor Technology", 
      description: "Detecting environmental changes" 
    },
    { 
      icon: Lightbulb, 
      title: "Real-World Impact", 
      description: "Creating solutions for communities" 
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#a2bb65]/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate('home');
                  }}
                  className="text-[#072d2d] hover:text-[#20593A]"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-[#072d2d] hover:text-[#20593A]">
                  The Programme
                </BreadcrumbLink>
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
      <section className="bg-[#eff2e7] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#072d2d] text-[#a4ff7b] hover:bg-[#a2bb65]/70 hover:text-[#072d2d] mb-6 px-6 py-2 rounded-full text-base">
              Level 1
            </Badge>
            <h1 className="text-[#000000] mb-6" style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1.2 }}>
              Explorer: For Ages 11-14
            </h1>
            <p className="text-[#072d2d] text-xl md:text-2xl mb-12">
              First steps in building smart, sustainable circuits for real-world change
            </p>
      
            {/* Level Overview Card - moved into hero */}
            <div className="bg-[#a2bb65CC] p-8 md:p-12 rounded-3xl shadow-md mt-8">
              <h2 className="text-[#000000] mb-6" style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.3 }}>
                <span className="text-[#072d2d]">Level 1</span> Overview
              </h2>
              <p className="text-[#000000] text-lg leading-relaxed">
                Level 1 introduces young explorers to the fundamentals of electronics and 
                basic sensor technology. Students build confidence through hands-on experiments, 
                learning how simple components can interact to form functional circuits. 
                The emphasis is on creativity and discovery, helping learners connect classroom 
                concepts to real-world applications.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
                <Button 
                  variant='outline'
                  className="border-2 border-[#072d2d] text-[#072d2d] hover:bg-[#072d2d] hover:text-white px-10 py-7 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  style={{ fontSize: '18px', fontWeight: 600 }}
                >
                  <Download className="w-6 h-6 mr-3" />
                  Download Level 1 Course
                </Button>
                <Button 
                  variant='outline'
                  className="border-2 border-[#072d2d] text-[#072d2d] hover:bg-[#072d2d] hover:text-white px-10 py-7 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  style={{ fontSize: '18px', fontWeight: 600 }}
                >
                  <Mail className="w-6 h-6 mr-3" />
                  Book a Level 1 Workshop
                </Button>
            </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Remove the separate Level Overview Section - delete this entire section */}

            
            {/* Learning Outcomes Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#000000] mb-12 text-center" style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.3 }}>
            Learning Outcomes
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Leaf,
                title: "Explore SusSTEM's approach of STEM for Sustainability"
              },
              {
                icon: Zap,
                title: "Understand and build simple Arduino-powered circuits"
              },
              {
                icon: Microscope,
                title: "Learning how sensors detect environmental changes"
              },
              {
                icon: Code2,
                title: "Programming simple if-then logic"
              },
              {
                icon: Sprout,
                title: "Environmental awareness about air quality"
              },
              {
                icon: Lightbulb,
                title: "Problem-solving with STEM solutions"
              }
            ].map((outcome, index) => (
              <div 
                key={index}
                className="bg-[#eff2e7] p-6 rounded-2xl hover:shadow-lg transition-all group hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#a2bb65CC] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#20593A] transition-colors">
                    <outcome.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-[#000000] font-medium text-lg">
                    {outcome.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Project Overview Section - Redesigned */}
      <section className="py-16 md:py-24 bg-[#eff2e7]">
        
        <div className="bg-[#a2bb65CC] max-w-4xl mx-auto text-center mx-auto px-6 p-8 md:p-12 rounded-3xl shadow-md mt-8 ">
                  <h2 className="text-[#000000] mb-6" style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.3 }}>
                    <span className="text-[#072d2d]">The Problem?</span>
                  </h2>
                  <p className="text-[#000000] text-lg leading-relaxed">
                    In recent years, forest fires in South India and around the world have shown how quickly
                    clean air can turn dangerous. When forests burn, they release invisible gases and tiny
                    particles into the air, creating thick smoke that can travel far from the fire itself.
                    This polluted air can trigger breathing problems, heart issues, and long-term health
                    risks for entire communities, especially children and older people. Yet many families
                    have no simple way to know when the air around them has become unsafe.
                  </p> 
        
             <div className="mt-8 flex justify-center">
                <div className="w-full rounded-3xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://lh3.googleusercontent.com/d/1Q2kbe5qYh8FhsYTQH8d3JovPMktCAyDD"
                    alt="Forest Fires"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-[#000000] mb-4" style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.3 }}>
              Featured Project
            </h2>
            <h3 className="text-[#20593A] mb-3" style={{ fontSize: '28px', fontWeight: 600, lineHeight: 1.4 }}>
              Air Alert - Environmental Monitoring System
            </h3>
            <p className="text-[#072d2d] text-xl max-w-3xl mx-auto">
              Students create a visual air quality alert system using sensors and LEDs
            </p>
          </div>
                
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
            {/* Left: How It Works with LED indicators */}
            <div className="space-y-4">
              <p className="text-[#072d2d] text-lg mb-8">
                The MQ2 gas sensor detects harmful gases in the air. Based on the gas concentration levels, different colored LEDs light up:
              </p>
              
              <div className="space-y-4">
                {/* Green LED - Safe */}
                <div className="bg-[#a2bb65] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-start gap-4">
                  <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#000000] mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                      Green LED: Safe Air Quality
                    </h4>
                    <p className="text-[#072d2d]">
                      Low gas levels detected - the air is safe to breathe
                    </p>
                  </div>
                </div>
      
                {/* Yellow LED - Caution */}
                <div className="bg-[#ffd459] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-start gap-4">
                  <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="8-7 8-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#000000] mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                      Yellow LED: Moderate Gas Levels
                    </h4>
                    <p className="text-[#072d2d]">
                      Caution advised - gas levels are elevated
                    </p>
                  </div>
                </div>
      
                {/* Red LED - Dangerous */}
                <div className="bg-[#ff9b69e7] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-start gap-4">
                  <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                    <X className="8-7 8-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#000000] mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                      Red LED: Dangerous Gas Levels
                    </h4>
                    <p className="text-[#072d2d]">
                      Warning! High gas concentration detected
                    </p>
                  </div>
                </div>
              </div>
      
              <p className="text-[#072d2d] text-base mt-6 italic">
                This visual alert system helps people understand air quality at a glance and teaches students about environmental monitoring.
              </p>
            </div>
      
            {/* Right: Project Image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://lh3.googleusercontent.com/d/1AZ1ybv4_kiCsbqpZHrka9xsH6twAHG2F"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
