import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface FeaturedProjectsProps {
  onNavigate?: (page: string) => void;
}

const SHOW_INNOVATOR = false;

/**
 * Featured Projects Section (The Programme)
 *
 * Navigation Behavior:
 * - "Learn More" buttons → Navigate to project detail pages (state change, same tab)
 *   - Level 1: Explorer → Air Alert project page
 *   - Level 2: Changemaker → Changemaker page
 *
 * The Innovator card is kept behind a flag so it can be restored without rewriting the layout.
 *
 * Displays three progressive curriculum levels with responsive carousel on mobile.
 */
export function FeaturedProjects({ onNavigate }: FeaturedProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      level: "Level 1",
      title: "Explorer: Ages 11-14",
      description:
        "Introduction to SusSTEM and our approach to integrating STEM with sustainability and science. Students will learn the fundamentals of electronics using Arduino, along with Python programming and AI, and apply their knowledge to real-world sustainability challenges.",
      image:
        "/images/arduinouno.jpeg",
      link: "air-alert",
    },
    ...(SHOW_INNOVATOR
      ? [
          {
            level: "Level 2",
            title: "Innovator: Ages 11-18",
            description:
              "Level 2 is where students will use what they've learned about sensors, circuits, and Arduino to build devices that solve real sustainability problems that affect their community.",
            image:
              "/images/arduinocar.jpeg",
            link: "innovator",
          },
        ]
      : []),
    {
      level: "Level 2",
      title: "Changemaker: Ages 14-18",
      description:
        "Level 2 is where students form teams of three and choose one of four environmental challenges. Building on the fundamentals from Level 1, they advance their STEM skills to research, design and work together as a team to build creative, practical solutions for real, meaningful community impact.",
      image:
        "/images/groupofarduinostudents.jpg",
      link: "changemaker",
    },
  ];

  const cardBgClasses = SHOW_INNOVATOR
    ? ["bg-[#a2bb65CC]", "bg-[#ffd459CC]", "bg-[#ff9b69CC]"]
    : ["bg-[#a2bb65CC]", "bg-[#ff9b69CC]"];

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
    <section className="bg-[#eff2e7] py-12 md:py-24" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="text-[#000000] text-3xl md:text-4xl mb-4"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            The Programme
          </h2>
          <p className="text-[#072d2d] text-lg max-w-2xl mx-auto">
            Our curriculum is designed in two progressive levels for all
            secondary school students aged 11 to 18, currently in English language only.
            Each level building essential skills for STEM-powered, sustainability innovations.
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`overflow-hidden rounded-3xl shadow-lg transform transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_14px_30px_rgba(0,0,0,0.5)] border-none ${cardBgClasses[index]} flex flex-col`}
            >
              <div className="h-64 overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div
                  className="
                    inline-block px-4 py-2 bg-[#eff2e7] text-[#072d2d]
                    rounded-full shadow-sm transform transition duration-300 ease-out
                    hover:-translate-y-1 hover:scale-[1.02]
                    hover:shadow-[0_14px_30px_rgba(0,0,0,0.16)]
                    hover:bg-[#072d2d] hover:text-[#a4ff7b] self-start mb-4
                  "
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                    }}
                    className="text-sm md:text-base"
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

                <p className="text-[#072d2d] mb-4 flex-grow">
                  {project.description}
                </p>

                <Button
                  variant="outline"
                  className="
                    border-2 border-[#072d2d] text-[#072d2d] rounded-xl w-full mt-auto
                    bg-white shadow-sm transform transition duration-300 ease-out
                    hover:-translate-y-1 hover:scale-[1.02]
                    hover:bg-[#072d2d] hover:text-white
                    hover:shadow-[0_16px_35px_rgba(0,0,0,0.18)]
                  "
                  onClick={() => handleProjectClick(project.link)}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                    }}
                    className="text-base md:text-lg"
                  >
                    Learn More
                  </span>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="md:hidden relative">
          <Card
            className={`overflow-hidden rounded-3xl shadow-lg border-none ${cardBgClasses[currentIndex]}`}
          >
            <div className="h-64 overflow-hidden">
              <ImageWithFallback
                src={projects[currentIndex].image}
                alt={projects[currentIndex].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <div
                className="
                  inline-block px-4 py-2 bg-[#eff2e7] text-[#072d2d]
                  rounded-full shadow-sm transform transition duration-300 ease-out
                  hover:-translate-y-1 hover:scale-[1.02]
                  hover:shadow-[0_14px_30px_rgba(0,0,0,0.16)]
                  hover:bg-[#072d2d] hover:text-[#a4ff7b]
                "
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                  }}
                  className="text-sm"
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

              <p className="text-[#072d2d]">
                {projects[currentIndex].description}
              </p>

              <Button
                variant="outline"
                className="
                  border-2 border-[#072d2d] text-[#072d2d] rounded-xl w-full
                  bg-white shadow-sm transform transition duration-300 ease-out
                  hover:-translate-y-1 hover:scale-[1.02]
                  hover:bg-[#072d2d] hover:text-white
                  hover:shadow-[0_16px_35px_rgba(0,0,0,0.18)]
                "
                onClick={() => handleProjectClick(projects[currentIndex].link)}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                  }}
                  className="text-base"
                >
                  Learn More
                </span>
              </Button>
            </div>
          </Card>

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