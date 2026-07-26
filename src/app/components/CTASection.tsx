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
          Join our mission to Empower 
          tomorrow's changemakers.
        </h2>
        <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Whether you're a student, an educator, organization, or passionate individual,
          simply wanting to make a difference, there are many ways to support the SusSTEM mission
          and help us reach more students worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary CTA */}
          <Button
            variant='outline'
                  className="border-2 border-[#072d2d] text-[#072d2d] hover:bg-[#072d2d] hover:text-white px-10 py-7 rounded-2xl transition shadow-xl hover:shadow-2xl hover:scale-105"
                  style={{ fontSize: '18px', fontWeight: 600 }}
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
            className="border-2 border-[#072d2d] text-[#072d2d] hover:bg-[#072d2d] hover:text-white px-10 py-7 rounded-2xl transition shadow-xl hover:shadow-2xl hover:scale-105"
            style={{ fontSize: '18px', fontWeight: 600 }}
      
            onClick={scrollToWhatIsSusSTEM}
          >             
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
