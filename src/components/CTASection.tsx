import { Button } from "./ui/button";

interface CTASectionProps {
  onNavigate?: (page: string) => void;
}

export function CTASection({ onNavigate }: CTASectionProps) {
  const scrollToGetInvolved = () => {
    const element = document.getElementById('get-involved');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#20593A] py-16 md:py-24" id="get-involved">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 
          className="text-white text-3xl md:text-4xl lg:text-5xl mb-6"
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
        >
          Join our mission to empower young changemakers.
        </h2>
        <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Whether you're an educator, organization, or passionate individual, there are many ways to support SusSTEM and help us reach more students worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-[#a2bb65] hover:bg-[#a2bb65]/90 text-white px-10 py-6 rounded-xl transition-colors text-lg"
            onClick={scrollToGetInvolved}
          >
            Get Involved
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-[#072d2d] text-[#072d2d] hover:bg-[#072d2d] hover:text-white px-10 py-6 rounded-xl transition-colors text-lg bg-white"
            onClick={() => {
              const element = document.getElementById('what-is-susstem');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}