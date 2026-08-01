import { Users, BookOpen, School } from "lucide-react";
import CountUp from "react-countup";
import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const iconBgClasses: Record<string, string> = {
  default: "bg-[#a2bb65]",     // light green default
  darkgreen: "bg-[#20593A]",   // dark green
};

export function ImpactStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setKey((prevKey) => prevKey + 1);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const stats = [
    {
      icon: Users,
      number: 100,
      label: "Students Reached",
      prefix: "+",
      bgColor: "#e1e4d9",
      iconColor: "default",
    },
    {
      icon: BookOpen,
      number: 17,
      label: "Projects Completed",
      prefix: "+",
      bgColor: "#e1e4d9",
      iconColor: "darkgreen",
    },
    {
      icon: School,
      number: 3,
      label: "Schools Impacted",
      prefix: "",
      bgColor: "#e1e4d9",
      iconColor: "default",
    },
  ];

  return (
    <section
      className="bg-[#20593A] py-12 md:py-24"
      id="impact"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* 1. Impact Stats Grid */}
        <div>
          <h2
            className="text-[#FFFFFF] text-3xl md:text-4xl text-center mb-12"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            Our Impact
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative transform transition duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03]"
                >
                  <div
                    style={{
                      background: stat.bgColor,
                      borderRadius: "1.5rem",
                      padding: "2rem",
                      textAlign: "center",
                    }}
                    className="
                      space-y-4
                      shadow-md
                      transition
                      duration-300
                      ease-out
                      group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]
                    "
                  >
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${
                        iconBgClasses[stat.iconColor] || iconBgClasses.default
                      } transition duration-300 ease-out group-hover:scale-105`}
                    >
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h3
                      className="text-[#000000] text-4xl md:text-5xl"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                    >
                      {stat.prefix}
                      {isVisible && (
                        <CountUp
                          key={key}
                          end={stat.number}
                          duration={2.5}
                          separator=","
                        />
                      )}
                    </h3>
                    <p
                      className="text-[#34495E] text-lg"
                      style={{ color: "#34495E" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Founder Green Card (Positioned Under Stats) */}
        <div id="founding-story" className="max-w-5xl mx-auto rounded-2xl bg-[#a2bb65] px-6 md:px-10 py-8 md:py-10 shadow-[6px_6px_20px_rgba(0,0,0,0.15)] hover:shadow-[8px_8px_24px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all duration-300 ease-out scroll-mt-32">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <ImageWithFallback
                src="/images/main%20pages/daiviksusstemwebsitephoto.png"
                alt="Daivik Anand Datwani"
                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover"
              />
            </div>

            <div className="hidden md:block w-1.5 self-stretch bg-[#072d2d] rounded-full" />

            <div className="text-center md:text-left space-y-4">
              <p
                className="text-lg md:text-xl text-[#072d2d] leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                What started as an extracurricular club called “WASTEless,” teaching students about waste disposal and management at school, has evolved into <strong>SusSTEM</strong>.
              </p>

              <p
                className="text-lg md:text-xl text-[#072d2d] leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <strong>SusSTEM</strong> is a passion project that unites my love for S.T.E.M with environmental protection, empowering young students to harness the power of technology to tackle sustainability challenges in their communities.
              </p>

              <p
                className="pt-2 text-[#072d2d] text-xl font-medium"
                style={{ fontFamily: "Poppins, sans-serif", fontStyle: "italic" }}
              >
                <strong>Daivik Anand Datwani –</strong> Founder, CTO
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}