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
  Target,
  Cpu,
  Code,
  MapPin,
  Lightbulb,
  Presentation,
  Droplets,
  TrendingUp,
  AlertCircle
} from "lucide-react";

import { ImageWithFallback } from "./figma/ImageWithFallback";

interface InnovatorPageProps {
  onNavigate?: (page: string) => void;
}

export function InnovatorPage({ onNavigate }: InnovatorPageProps) {
  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#eff2e7] border-b border-gray-200">
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
                <BreadcrumbPage className="text-[#ffd459CC]">Innovator Level</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-[#eff2e7] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#ffd459CC] text-[#000000] hover:bg-[#E5B82F] mb-6 px-6 py-2 rounded-full text-base">
              Level 2
            </Badge>
            <h1 className="text-[#000000] mb-6" style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1.2 }}>
              Innovator: For Ages 11-18
            </h1>
            <p className="text-[#072d2d] text-xl md:text-2xl">
              Building solutions for real-world sustainability challenges in your community
            </p>
          </div>
        </div>
      </section>

     
       {/* Level Overview Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#eff2e7] to-[#e1e4d8] p-8 md:p-12 rounded-3xl shadow-md">
            <h2 className="text-[#000000] mb-6 text-center" style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.3 }}>
              <span className="text-[#ffd459CC]">Level 2</span> Overview
            </h2>
            <p className="text-[#000000] text-lg leading-relaxed max-w-3xl mx-auto">
              Level 2 empowers innovators to apply their foundational skills to real-world sustainability challenges. Students learn to build their own impact by designing devices that address environmental problems in their communities. Using advanced sensor systems and Arduino programming, learners create solutions for water quality monitoring, energy tracking, or pollution measurement. The emphasis is on problem-solving and practical application, helping students connect their technical skills to meaningful community action and build their own sustainable future.
            </p>
          </div>
        </div>
      </section>
      
            
            {/* Learning Outcomes Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#000000] mb-12 text-center" style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.3 }}>
            Learning Outcomes
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Apply SusSTEM principles to community problems"
              },
              {
                icon: Cpu,
                title: "Design and build multi-sensor Arduino systems"
              },
              {
                icon: Code,
                title: "Program complex conditional logic and data collection"
              },
              {
                icon: MapPin,
                title: "Identify sustainability challenges in your environment"
              },
              {
                icon: Lightbulb,
                title: "Prototype solutions with real-world impact"
              },
              {
                icon: Presentation,
                title: "Present and iterate on your designs"
              }
            ].map((outcome, index) => (
              <div 
                key={index}
                className="bg-[#eff2e7] p-6 rounded-2xl hover:shadow-lg transition-all group hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ffd459CC] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#E5B82F] transition-colors">
                    <outcome.icon className="w-6 h-6 text-[#000000]" />
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[#000000] mb-4" style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.3 }}>
              Featured Project
            </h2>
            <h3 className="text-[#ffd459] mb-3" style={{ fontSize: '28px', fontWeight: 600, lineHeight: 1.4 }}>
              Community Impact Project - Water Quality Monitor
            </h3>
            <p className="text-[#072d2d] text-xl max-w-3xl mx-auto">
              Students design devices to solve real sustainability problems in their community
            </p>
          </div>
      
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
            {/* Left: How It Works with water quality indicators */}
            <div className="space-y-4">
              <p className="text-[#072d2d] text-lg mb-8">
                Multi-sensor system monitors water quality parameters. The device measures and displays different water conditions:
              </p>
              
              <div className="space-y-4">
                {/* Clean Water */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#000000] mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                      Clean Water Detected
                    </h4>
                    <p className="text-[#072d2d]">
                      All parameters within safe ranges - water is suitable for use
                    </p>
                  </div>
                </div>
      
                {/* Monitor Level */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#000000] mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                      Monitor Conditions
                    </h4>
                    <p className="text-[#072d2d]">
                      Some readings elevated - continue monitoring water quality
                    </p>
                  </div>
                </div>
      
                {/* Contaminated */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#000000] mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                      Contamination Alert
                    </h4>
                    <p className="text-[#072d2d]">
                      Warning! Water quality below safe standards
                    </p>
                  </div>
                </div>
              </div>
      
              <p className="text-[#072d2d] text-base mt-6 italic">
                This monitoring system empowers communities to track water quality and teaches students to design solutions for environmental challenges.
              </p>
            </div>
      
            {/* Right: Project Image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHF1YWxpdHklMjBtb25pdG9yaW5nJTIwc3VzdGFpbmFiaWxpdHl8ZW58MXx8fHwxNzY1MTE5MzU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Water quality monitoring system"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Call-to-Action Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#20593A] to-[#a2bb65]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-white mb-6" style={{ fontSize: '42px', fontWeight: 700, lineHeight: 1.3 }}>
            Ready to Get Started?
          </h2>
          <p className="text-white/95 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Download the complete project guide with step-by-step instructions, component lists, 
            and curriculum materials — or contact us to arrange a workshop for your students.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              className="bg-[#a4ff7b] hover:bg-white text-[#000000] px-10 py-7 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              style={{ fontSize: '18px', fontWeight: 600 }}
            >
              <Download className="w-6 h-6 mr-3" />
              Download Full Project Guide
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-3 border-white text-white hover:bg-white hover:text-[#20593A] px-10 py-7 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              style={{ fontSize: '18px', fontWeight: 600, borderWidth: '2px' }}
            >
              <Mail className="w-6 h-6 mr-3" />
              Contact Us for Workshop
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
