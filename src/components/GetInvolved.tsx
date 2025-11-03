import { Users, Handshake, Heart } from "lucide-react";
import { Button } from "./ui/button";

export function GetInvolved() {
  const cards = [
    {
      icon: Users,
      title: "Volunteer With Us",
      description: "Help young learners discover the power of STEM. Join our workshops, mentor students, or assist with events in your community.",
      buttonText: "Sign Up to Volunteer",
      link: "/volunteer",
    },
    {
      icon: Handshake,
      title: "Partner With Us",
      description: "Collaborate to bring SusSTEM programs to more schools worldwide. Ideal for NGOs, schools, and sustainability-focused organizations.",
      buttonText: "Become a Partner",
      link: "/partner",
    },
    {
      icon: Heart,
      title: "Support Our Mission",
      description: "Your contribution helps us reach more children with STEM education. Donations fund kits, teacher training, and local outreach.",
      buttonText: "Donate Today",
      link: "/donate",
    },
  ];

  return (
    <section className="bg-[#e1e4d8] py-12 md:py-24" id="get-involved">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            className="text-[#000000] text-3xl md:text-4xl mb-4"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            Get Involved
          </h2>
          <p className="text-[#858E80] text-lg md:text-xl max-w-2xl mx-auto">
            Join us in shaping a sustainable future through STEM.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 text-center space-y-6 shadow-md hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="w-20 h-20 rounded-full bg-[#a2bb65]/10 flex items-center justify-center mx-auto">
                  <Icon className="w-10 h-10 text-[#a2bb65]" strokeWidth={1.5} />
                </div>
                <h3 
                  className="text-[#000000] text-xl md:text-2xl"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  {card.title}
                </h3>
                <p className="text-[#858E80] leading-relaxed flex-grow">
                  {card.description}
                </p>
                <Button 
                  className="bg-[#a2bb65] hover:bg-[#8fa355] text-white px-8 py-6 rounded-xl transition-colors w-full"
                  onClick={() => window.location.href = card.link}
                >
                  {card.buttonText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
