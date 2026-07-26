import { Button } from "./ui/button";
import { Mail } from "lucide-react";

interface ContactPreviewProps {
  onNavigate?: (page: string) => void;
}

export function ContactPreview({ onNavigate }: ContactPreviewProps) {
  return (
    <section className="bg-white py-12 md:py-24" id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#e1e4d8] mb-6">
          <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-[#20593A]" />
        </div>
        <h2 
          className="text-[#000000] text-2xl sm:text-3xl md:text-4xl mb-4"
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
        >
          Want to partner, contribute, or volunteer?
        </h2>
        <p className="text-[#072d2d] text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          We'd love to hear from you! Get in touch with us to support SusSTEM's mission and help empower the next generation of sustainable innovators.
        </p>
        <Button 
          className="bg-[#20593A] hover:bg-[#a2bb65] text-white w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 rounded-xl transition-colors text-base sm:text-lg"
          onClick={() => {
            if (onNavigate) {
              onNavigate("contact");
              return;
            }

            const footer = document.getElementById('footer');
            footer?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Contact Us
        </Button>
      </div>
    </section>
  );
}
