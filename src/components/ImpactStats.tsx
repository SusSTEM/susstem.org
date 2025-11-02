import { Users, BookOpen, Globe } from "lucide-react";

export function ImpactStats() {
  const stats = [
    {
      icon: Users,
      number: "+500",
      label: "Students Reached",
    },
    {
      icon: BookOpen,
      number: "+40",
      label: "Projects Completed",
    },
    {
      icon: Globe,
      number: "5",
      label: "Countries Impacted",
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
              <div
                key={index}
                className="bg-white rounded-3xl p-8 text-center space-y-4 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-24 h-24 rounded-full bg-[#a2bb65] flex items-center justify-center mx-auto">
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <h3 
                  className="text-[#000000] text-4xl md:text-5xl"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
                >
                  {stat.number}
                </h3>
                <p className="text-[#858E80] text-lg">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
