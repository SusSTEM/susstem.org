import { Users, Handshake, Heart } from "lucide-react";
import { Button } from "./ui/button";

interface GetInvolvedProps {
  onNavigate?: (page: string) => void;
}

export function GetInvolved({ onNavigate }: GetInvolvedProps) {
  const cards = [
    {
      icon: Users,
      title: "Volunteer",
      description:
        "Help young learners discover the power of STEM. Join our workshops, mentor students, or assist with events in your community.",
      buttonText: "Sign Up",
      link: "volunteer",
      isDonate: false,
    },
    {
      icon: Heart,
      title: "Donate",
      description:
        "Your contribution will make a real difference in a child's life. Your donations will fund STEM kits, teacher training, local and global outreach.",
      buttonText: "Make a Difference",
      link: "donate",
      isDonate: true,
    },
    {
      icon: Handshake,
      title: "Partner",
      description:
        "Collaborate to bring SusSTEM programs to more schools worldwide. Ideal for NGOs, schools, and sustainability-focused organizations.",
      buttonText: "Collaborate",
      link: "partner",
      isDonate: false,
    },
  ];

  return (
    <section className="bg-[#EFF2E7] py-12 md:py-24" id="get-involved">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="text-[#000000] text-3xl md:text-4xl mb-4"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            Join the Movement
          </h2>
          <p className="text-[#858E80] text-lg md:text-xl max-w-2xl mx-auto">
            Join us in shaping a sustainable future through STEM.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isDonate = card.isDonate;
            const isPrimary = !isDonate; // Volunteer & Partner

            return (
              <div
                key={index}
                className="relative transition duration-300 ease-out hover:scale-105"              >
                <div
                  className={`rounded-3xl p-8 text-center space-y-6 shadow-md transition duration-300
                    hover:shadow-[12px_12px_30px_rgba(7,45,45,0.35)] flex flex-col
                    ${isDonate ? "bg-[#072D2D]" : "bg-white hover:bg-[#a2bb65]/80"}`}
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                      isDonate
                        ? "bg-[#a4ff7b]/20"
                        : "bg-[#e1e4d9]"
                    }`}
                  >
                    <Icon
                      className={`w-10 h-10 ${
                        isDonate ? "text-[#a4ff7b] heartbeat" : "text-[#072d2d]"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3
                    className="text-xl md:text-2xl"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      color: isDonate ? "white" : "#072d2d",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={`leading-relaxed flex-grow ${
                      isDonate ? "text-white/90" : "text-[#072d2d]"
                    }`}
                  >
                    {card.description}
                  </p>

                  <Button
                    size="sm"
                    className={`
                      px-3 py-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 w-45 mx-auto
                      text-sm font-semibold
                      ${isDonate
                        ? "bg-[#a4ff7b] text-[#072D2D] hover:bg-[#20593A] hover:text-[#a4ff7b]"
                        : "bg-[#20593A] text-white hover:border-2 hover:border-[#072d2d] hover:bg-white hover:text-[#072d2d]"
                      }
                    `}
                    style={{ fontSize: '16px', fontWeight: 600 }}
                    onClick={() => onNavigate?.(card.link)}
                  >
                    {card.buttonText}
                  </Button>


                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
