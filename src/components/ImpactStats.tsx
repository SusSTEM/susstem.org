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
      label: "Campuses",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f6f3e7]">
      <div className="container px-4 mx-auto">
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
                  {stat.number}
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
