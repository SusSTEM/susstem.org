import { Button } from "./ui/button";
import { Mail } from "lucide-react";

export function ContactPreview() {
  return (
    <section className="bg-white py-12 md:py-24" id="contact">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e1e4d8] mb-6">
          <Mail className="w-10 h-10 text-[#20593A]" />
        </div>
        <h2 
          className="text-[#000000] text-3xl md:text-4xl mb-4"
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
        >
          Want to partner, donate, or volunteer?
        </h2>
        <p className="text-[#858E80] text-lg mb-8 max-w-2xl mx-auto">
          We'd love to hear from you! Get in touch to learn how you can support SusSTEM's mission and help empower the next generation of sustainable innovators.
        </p>
        <Button 
          className="bg-[#20593A] hover:bg-[#a2bb65] text-white px-10 py-6 rounded-xl transition-colors text-lg"
          onClick={() => {
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
