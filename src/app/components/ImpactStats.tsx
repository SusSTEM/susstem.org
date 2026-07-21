import { Users, BookOpen, Globe } from "lucide-react";
import CountUp from "react-countup";
import { useState, useEffect, useRef } from "react";

const iconBgClasses = {
  default: "bg-[#a2bb65]",        // light green default
  darkgreen: "bg-[#20593A]",      // dark green
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
      number: 500,
      label: "Students Reached",
      prefix: "+",
      bgColor: "#e1e4d9",
      iconColor: "default",
    },
    {
      icon: BookOpen,
      number: 40,
      label: "Projects Completed",
      prefix: "+",
      bgColor: "#e1e4d9",
      iconColor: "darkgreen",
    },
    {
      icon: Globe,
      number: 5,
      label: "Countries Impacted",
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
      <div className="max-w-7xl mx-auto px-6">
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
                className="group relative transform transition duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03]"              >
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
                  transition                    duration-300
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
    </section>
  );
}
