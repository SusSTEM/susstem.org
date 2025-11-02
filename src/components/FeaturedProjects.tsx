import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      level: "Level 1",
      title: "LEDs & Buzzers",
      description: "Learn the basics of circuits by creating light displays and sound alarms. Perfect for beginners to understand electrical flow and simple coding.",
      image: "https://images.unsplash.com/photo-1553408226-42ecf81a214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwY2lyY3VpdCUyMGJvYXJkJTIwZWxlY3Ryb25pY3N8ZW58MXx8fHwxNzYyMDA2MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      level: "Level 2",
      title: "Motors & Sensors",
      description: "Build interactive projects using motors, distance sensors, and temperature monitors. Create moving robots and environmental monitoring systems.",
      image: "https://images.unsplash.com/photo-1758685734153-132c8620c1bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc2NpZW5jZSUyMGV4cGVyaW1lbnQlMjBoYW5kc3xlbnwxfHx8fDE3NjIwMDYwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      level: "Level 3",
      title: "Full Systems",
      description: "Design complete sustainable solutions like smart water savers, automated composting systems, and energy monitoring devices for real-world impact.",
      image: "https://images.unsplash.com/photo-1758524057756-7dc8ce53d88c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHRlY2hub2xvZ3klMjBwbGFudHxlbnwxfHx8fDE3NjIwMDYwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="bg-white py-12 md:py-24" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            className="text-[#000000] text-3xl md:text-4xl mb-4"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            Featured Projects
          </h2>
          <p className="text-[#858E80] text-lg max-w-2xl mx-auto">
            Our curriculum is designed in three progressive levels, each building essential skills for sustainable innovation.
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow border-none">
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="inline-block px-4 py-2 bg-[#e1e4d8] text-[#20593A] rounded-full">
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    {project.level}
                  </span>
                </div>
                <h3 
                  className="text-[#000000] text-2xl"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  {project.title}
                </h3>
                <p className="text-[#858E80]">
                  {project.description}
                </p>
                <Button 
                  variant="outline"
                  className="border-2 border-[#072d2d] text-[#072d2d] hover:bg-[#072d2d] hover:text-white rounded-xl transition-colors w-full"
                >
                  View Project
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
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  {projects[currentIndex].level}
                </span>
              </div>
              <h3 
                className="text-[#000000] text-2xl"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                {projects[currentIndex].title}
              </h3>
              <p className="text-[#858E80]">
                {projects[currentIndex].description}
              </p>
              <Button 
                variant="outline"
                className="border-2 border-[#072d2d] text-[#072d2d] hover:bg-[#072d2d] hover:text-white rounded-xl transition-colors w-full"
              >
                View Project
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
                    index === currentIndex ? 'bg-[#a2bb65]' : 'bg-gray-300'
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
