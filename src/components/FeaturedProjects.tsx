import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface FeaturedProjectsProps {
  onNavigate?: (page: string) => void;
}

export function FeaturedProjects({ onNavigate }: FeaturedProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      level: "Level 1",
      title: "Explorer: Ages 11 to 14",
      description:
        "Introduction to SusSTEM and our approach of STEM for Sustainability. Students will learn the basics of circuits like LED's buzzers and sensors, and will apply their knowledge to a real-world situation.",
      image:
        "https://lh3.googleusercontent.com/d/1FuFYH9o3u5O1sUy0gyau60yOXf4l9Y0z",
      link: "air-alert",
    },
    {
      level: "Level 2",
      title: "Innovator: Ages 11 to 18",
      description:
        "Level 2 is where students will use what they've learned about sensors, circuits, and Arduino to build devices that solve real sustainability problems that affect their community.",
      image:
        "https://lh3.googleusercontent.com/d/1GOEnNE2YiL2iBzhWl547RwW6u_w_dsiy",
      link: "innovator",
    },
    {
      level: "Level 3",
      title: "Changemaker: Ages 14 to 18 ",
      description:
        "Design complete sustainable solutions like smart water savers, automated composting systems, and energy monitoring devices for real-world impact.",
      image:
        "https://lh3.googleusercontent.com/d/1_HCKAXKWWnv0W9sYrwnqz69CekWFXnin",
      link: "changemaker",
    },
  ];

  // per-card background colors
  const cardBgClasses = ["bg-[#a2bb65CC]", "bg-[#ffd459CC]", "bg-[#ff9b69CC]"]; // L1, L2, L3 [web:0]
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleProjectClick = (link?: string) => {
    if (link && onNavigate) {
      onNavigate(link);
    }
  };

  return (
    <section className="bg-white py-12 md:py-24" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="text-[#000000] text-3xl md:text-4xl mb-4"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            The Programme
          </h2>
          <p className="text-[#072d2d] text-lg max-w-2xl mx-auto">
            Our curriculum is designed in three progressive levels for all secondary school students aged 11 to 18, each
            building essential skills for STEM-powered, sustainable innovation.
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow border-none ${cardBgClasses[index]} flex flex-col`}
            >
              <div className="h-64 overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="inline-block px-4 py-2 bg-[#e1e4d8] text-[#20593A] rounded-full transition-colors duration-200 hover:bg-[#072d2d] hover:text-[#a4ff7b] self-start mb-4">
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {project.level}
                  </span>
                </div>
                <h3
                  className="text-[#000000] text-2xl mb-4"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  {project.title}
                </h3>
                <p className="text-[#072d2d] mb-4 flex-grow">{project.description}</p>
                <Button
                  variant="outline"
                  className="border-2 border-[#072d2d] text-[#072d2d] hover:bg-[#072d2d] hover:text-white rounded-xl transition-colors w-full mt-auto"
                  onClick={() => handleProjectClick(project.link)}
                >
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative">
          <Card className="overflow-hidden rounded-3xl shadow-lg border-none">
            <div className="h-64 overflow-hidden">
              <ImageWithFallback
                src={projects[currentIndex].image}
                alt={projects[currentIndex].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="inline-block px-4 py-2 bg-[#e1e4d8] text-[#20593A] rounded-full">
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {projects[currentIndex].level}
                </span>
              </div>
              <h3
                className="text-[#000000] text-2xl"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                {projects[currentIndex].title}
              </h3>
              <p className="text-[#858E80]">
                {projects[currentIndex].description}
              </p>
              <Button
                variant="outline"
                className="border-2 border-[#072d2d] text-[#072d2d] hover:bg-[#072d2d] hover:text-white rounded-xl transition-colors w-full"
                onClick={() => handleProjectClick(projects[currentIndex].link)}
              >
                Learn More
              </Button>
            </div>
          </Card>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-[#a2bb65] text-white flex items-center justify-center hover:bg-[#20593A] transition-colors"
            >
              <ChevronLeft />
            </button>
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-[#a2bb65]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-[#a2bb65] text-white flex items-center justify-center hover:bg-[#20593A] transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}