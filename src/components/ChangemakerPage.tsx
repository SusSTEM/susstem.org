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

interface ChangemakerPageProps {
  onNavigate?: (page: string) => void;
}

export function ChangemakerPage({ onNavigate }: ChangemakerPageProps) {
  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#ff9b69] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("home");
                  }}
                  className="text-[#072d2d] hover:text-[#20593A]"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  className="text-[#072d2d] hover:text-[#20593A]"
                >
                  The Programme
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#20593a]">
                  Changemaker Level
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero + Level Overview */}
      <section className="bg-[#eff2e7] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#072d2d] text-[#a4ff7b] hover:bg-[#ff9b69]/80 hover:text-[#072d2d] mb-6 px-6 py-2 rounded-full text-base">
              Level 3
            </Badge>
            <h1
              className="text-[#000000] mb-6"
              style={{ fontSize: "48px", fontWeight: 700, lineHeight: 1.2 }}
            >
              Changemaker: For Ages 14-18
            </h1>
            <p className="text-[#072d2d] text-xl md:text-2xl mb-12">
              Building solutions for real-world sustainability challenges in
              your community
            </p>

            {/* Level Overview Card */}
            <div className="bg-[#ff9b69CC] p-8 md:p-12 rounded-3xl shadow-md mt-8">
              <h2
                className="text-[#000000] mb-6"
                style={{ fontSize: "36px", fontWeight: 700, lineHeight: 1.3 }}
              >
                <span className="text-[#072d2d]">Level 3</span> Overview
              </h2>
              <p className="text-[#000000] text-lg leading-relaxed mb-8">
                Level 3 is where students will use what they've learned about
                sensors, circuits, and Arduino to build devices that solve real
                sustainability problems that affect their community. Students
                develop their problem-solving skills by turning ideas into
                working prototypes and focusing on real-world impact. The
                emphasis is on applying technical skills to meaningful projects
                that benefit people and the environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  variant="outline"
                  className="border-2 border-[#072d2d] text-[#072d2d] hover:bg-[#072d2d] hover:text-white px-10 py-7 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                >
                  <Download className="w-6 h-6 mr-3" />
                  Download Level 3 Course
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-[#072d2d] text-[#072d2d] hover:bg-[#072d2d] hover:text-white px-10 py-7 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                >
                  <Mail className="w-6 h-6 mr-3" />
                  Book a Level 3 Workshop
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-[#000000] mb-12 text-center"
            style={{ fontSize: "36px", fontWeight: 700, lineHeight: 1.3 }}
          >
            Learning Outcomes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Apply SusSTEM principles to community problems",
              },
              {
                icon: Cpu,
                title: "Design and build multi-sensor Arduino systems",
              },
              {
                icon: Code,
                title: "Program simple conditional logic and data collection",
              },
              {
                icon: MapPin,
                title: "Identify sustainability challenges in your environment",
              },
              {
                icon: Lightbulb,
                title: "Prototype solutions with real-world impact",
              },
              {
                icon: Presentation,
                title: "Present and refine your designs",
              },
            ].map((outcome, index) => (
              <div
                key={index}
                className="bg-[#eff2e7] p-6 rounded-2xl hover:shadow-lg transition-all group hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff9b69]/80 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff9b69] transition-colors">
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

      {/* Project Overview Section */}
      <section className="py-16 md:py-24 bg-[#eff2e7]">
        
            <div className="bg-[#ff9b69]/80 max-w-4xl mx-auto text-center px-6 p-8 md:p-12 rounded-3xl shadow-md mt-8">
              <h2
                className="text-[#000000] mb-6"
                style={{ fontSize: "36px", fontWeight: 700, lineHeight: 1.3 }}
              >
                <span className="text-[#072d2d]">The Problem?</span>
              </h2>
              <p className="text-[#000000] text-lg leading-relaxed mb-8">
                Rivers, lakes, and groundwater in many parts of South Asia and around the world are under
                growing pressure from pollution and overuse. When factories, farms, and households release
                untreated waste into waterways, they introduce invisible chemicals and microbes that can
                spread far beyond the place where the pollution started. Over time, this contamination can
                lead to serious health problems, damage to local ecosystems, and unsafe drinking water for
                entire communities, especially children and those already vulnerable. Yet many families have
                no simple way to understand when the water they rely on every day is still safe to use and
                when it may pose a risk.
              </p>
            
              {/* Rounded image inside orange block */}
              <div className="mt-8 flex justify-center">
                <div className="w-full rounded-3xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://lh3.googleusercontent.com/d/1mEw31noBCxE5c0d5JYs9rbutjZPc7rAj"
                    alt="Pollution of Water Bodies"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </div>
            </div>
        
        <div className="max-w-7xl mx-auto px-6 p-8 md:p-12 ">
          <div className="text-center mb-12">
            <h2
              className="text-[#000000] mb-4"
              style={{ fontSize: "36px", fontWeight: 700, lineHeight: 1.3 }}
            >
              Featured Project
            </h2>
            <h3
              className="text-[#20593A] mb-3"
              style={{ fontSize: "28px", fontWeight: 600, lineHeight: 1.4 }}
            >
              Community Impact Project – Water Quality Monitor
            </h3>
             <p className="text-[#072d2d] text-xl mb-8 p-8 md:p-10">
                A multi-sensor system monitors several water quality readings at once and translates them into simple, colored indicators that anyone can understand at a glance. Learners use changing patterns in these indicators to discuss when water is likely safe, when it should be watched more carefully, and when it may no longer be safe to use.
              </p>
            
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
            <div className="space-y-4">
              <div className="space-y-4">
                {/* Clean Water */}
                <div className="bg-[#5978ff]/60 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-start gap-4">
                  <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4
                      className="text-[#000000] mb-2"
                      style={{ fontSize: "20px", fontWeight: 600 }}
                    >
                      Clean Water Indicator
                    </h4>
                    <p className="text-[#072d2d]">
                      Shows when measured water conditions fall in a safe range.
                    </p>
                  </div>
                </div>

                {/* Monitor Level */}
                <div className="bg-[#ffd459]/80 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-start gap-4">
                  <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4
                      className="text-[#000000] mb-2"
                      style={{ fontSize: "20px", fontWeight: 600 }}
                    >
                      Monitor Conditions
                    </h4>
                    <p className="text-[#072d2d]">
                      Highlights when readings are changing and should be
                      watched more closely.
                    </p>
                  </div>
                </div>

                {/* Contamination Alert */}
                <div className="bg-[#ff9b69] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-start gap-4">
                  <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4
                      className="text-[#000000] mb-2"
                      style={{ fontSize: "20px", fontWeight: 600 }}
                    >
                      Contamination Alert
                    </h4>
                    <p className="text-[#072d2d]">
                      Signals when measurements suggest the water may not be
                      safe to use.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Project Image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://lh3.googleusercontent.com/d/1K15BUjrs3EpEBAxihSm_3B-CKk7sOyDL"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
