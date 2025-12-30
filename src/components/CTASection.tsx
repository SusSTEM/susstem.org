import { Button } from "./ui/button";

interface CTASectionProps {
  onNavigate?: (page: string) => void;
}

export function CTASection({ onNavigate }: CTASectionProps) {
  const scrollToGetInvolved = () => {
    const element = document.getElementById("get-involved");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToWhatIsSusSTEM = () => {
    const element = document.getElementById("what-is-susstem");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#20593A] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2
          className="text-white text-3xl md:text-4xl lg:text-5xl mb-6"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
        >
          Join our mission to empower young changemakers.
        </h2>
        <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Whether you're an educator, organization, or passionate individual,
          there are many ways to support SusSTEM and help us reach more
          students worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary CTA */}
          <Button
            className="
              bg-[#a2bb65]/80
              text-white
              px-10
              py-6
              rounded-xl
              text-lg
              shadow-md
              transform
              transition
              duration-300
              ease-out
              hover:text-[#072d2d]
              hover:bg-[#ffffff]
              hover:border-3
              hover:border-[#072d2d]
              hover:-translate-y-1
              hover:scale-[1.02]
              hover:shadow-[0_16px_35px_rgba(0,0,0,0.25)]
            "
            onClick={scrollToGetInvolved}
          >
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
              }}
              className="text-base md:text-lg"
            >
              Get Involved
            </span>
          </Button>

          {/* Secondary CTA (white pill style) */}
          <Button
            variant="outline"
            className="
              border-3
              border-[#072d2d]
              text-[#072d2d]
              bg-white
              px-10
              py-6
              rounded-xl
              text-lg
              shadow-sm
              transform
              transition
              duration-300
              ease-out
              hover:-translate-y-1
              hover:scale-[1.02]
              hover:bg-[#072d2d]
              hover:text-white
              hover:shadow-[0_16px_35px_rgba(0,0,0,0.2)]
            "
            onClick={scrollToWhatIsSusSTEM}
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
      </div>
    </section>
  );
}
