import { Users, BookOpen, Globe } from "lucide-react";
import CountUp from "react-countup";
import { useState, useEffect, useRef } from "react";

export function ImpactStats() {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Users,
      number: 500,
      label: "Students Reached",
      prefix: "+",
    },
    {
      icon: BookOpen,
      number: 40,
      label: "Projects Completed",
      prefix: "+",
    },
    {
      icon: Globe,
      number: 5,
      label: "Countries Impacted",
      prefix: "",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#e1e4d8] py-12 md:py-24"
      id="impact"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-[#000000] text-3xl md:text-4xl text-center mb-12"
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
        >
          Our Impact
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-[#a2bb65] w-16 h-16 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-[#000000] mb-2 text-center">
                  {stat.prefix}
                  {startCount ? (
                    <CountUp end={stat.number} duration={2} />
                  ) : (
                    stat.number
                  )}
                </div>
                <p className="text-[#000000] text-lg text-center">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
