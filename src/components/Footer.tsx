import { Linkedin, Youtube, Instagram, Heart } from "lucide-react";
import { FaXTwitter } from 'react-icons/fa6';

export function Footer() {
  return (
    <footer className="bg-[#20593A] text-white py-12 md:py-16" id="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About SusSTEM */}
          <div className="space-y-4">
            <h3 
              className="text-xl mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
            >
              About SusSTEM
            </h3>
            <p className="text-white/80 leading-relaxed">
              SusSTEM is a global initiative dedicated to teaching sustainability through hands-on STEM education for children aged 8-18.
            </p>
            <p className="text-white/80 leading-relaxed">
              We empower young minds to create eco-friendly solutions using Arduino, coding, and creativity.
            </p>
          </div>

          {/* Get Involved */}
          <div className="space-y-4">
            <h3 
              className="text-xl mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
            >
              Get Involved
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#partner" className="text-white/80 hover:text-[#a4ff7b] transition-colors">
                  Partner With Us
                </a>
              </li>
              <li>
                <a href="#volunteer" className="text-white/80 hover:text-[#a4ff7b] transition-colors">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#donate" className="text-white/80 hover:text-[#a4ff7b] transition-colors">
                  Donate
                </a>
              </li>
              <li>
                <a href="#educators" className="text-white/80 hover:text-[#a4ff7b] transition-colors">
                  For Educators
                </a>
              </li>
              <li>
                <a href="#curriculum" className="text-white/80 hover:text-[#a4ff7b] transition-colors">
                  Access Curriculum
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 
              className="text-xl mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
            >
              Connect
            </h3>
            <p className="text-white/80 mb-4">
              Follow us on social media to see our latest projects and student success stories.
            </p>
              <div className="flex gap-4">
              <a 
                href="#linkedin" 
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-6 h-6 text-[#a4ff7b]" />
              </a>
              <a 
                href="#youtube" 
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
              >
                <Youtube className="w-6 h-6 text-[#a4ff7b]" />
              </a>
              <a 
                href="#instagram" 
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-6 h-6 text-[#a4ff7b]" />
              </a>
              <a 
                href="#x" 
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
              >
                <FaXTwitter className="w-6 h-6 text-[#a4ff7b]" />
              </a>
            </div>
            <div className="pt-4">
              <p className="text-white/80 text-sm">
                Email: hello@susstem.org
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-[#a4ff7b] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © 2025 SusSTEM — Empowering sustainability through STEM.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-[#a4ff7b] fill-current" />
              <span>for our planet</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
