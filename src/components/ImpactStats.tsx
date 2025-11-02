import { Users, BookOpen, Globe } from "lucide-react";
import CountUp from "react-countup";
import { useState } from "react";

export function ImpactStats() {
  const [startCount, setStartCount] = useState(false);

  // Trigger count-up animation once on component mount
  useState(() => {
    setStartCount(true);
  });

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
    <section className="bg-[#e1e4d8] py-12 md:py-24" id="impact">
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
              <div key={index} className="text-center">
                <Icon className="w-12 h-12 mx-auto mb-4 text-[#000000]" />
                <div className="text-4xl font-bold text-[#000000] mb-2">
                  {stat.prefix}
                  {startCount && (
                    <CountUp end={stat.number} duration={2} />
                  )}
                </div>
                <p className="text-[#000000] text-lg">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
