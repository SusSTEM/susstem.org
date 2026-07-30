import { Linkedin, Youtube, Instagram, Heart } from "lucide-react";
import { FaXTwitter } from 'react-icons/fa6';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const navigateTo = (target: string) => {
    if (onNavigate) {
      onNavigate(target);
      return;
    }

    const section = target.split("#")[1];
    if (section) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#20593A] text-white py-8 md:py-10" id="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* About Column */}
          <div className="space-y-3">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home#about")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left text-sm"
                >
                  SusSTEM
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home#story")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left text-sm"
                >
                  Founding Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home#content-library")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left text-sm"
                >
                  Content Library
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home#updates")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left text-sm"
                >
                  Insider Updates
                </button>
              </li>
            </ul>
          </div>

          {/* Get Involved Column */}
          <div className="space-y-3">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Get Involved
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home#get-involved")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left text-sm"
                >
                  Partner With Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home#get-involved")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left text-sm"
                >
                  Volunteer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home#get-involved")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left text-sm"
                >
                  Contribute
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home#projects")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left text-sm"
                >
                  For Educators
                </button>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-3">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Connect
            </h3>
            <p className="text-white/80 text-sm">
              Follow us on social media to see our latest projects and student success stories.
            </p>
            
            {/* Email (moved above icons) */}
            <div>
              <p className="text-white/80 text-sm">
                Email:{" "}
                <a 
                  href="mailto:hello@susstem.org"
                  className="hover:text-[#a4ff7b] transition-colors font-medium"
                >
                  hello@susstem.org
                </a>
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 pt-1">
              <a 
                href="https://www.linkedin.com/company/susstem" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
                aria-label="Visit our LinkedIn page (opens in new tab)"
              >
                <Linkedin className="w-5 h-5 text-[#a4ff7b]" />
              </a>
              <a 
                href="https://youtube.com/playlist?list=PLCGFK1Hy9Lr_qg_RLBL0UDd-ABLgztDd_&si=6lMixLGdP4BSBk-b" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
                aria-label="Visit our YouTube channel (opens in new tab)"
              >
                <Youtube className="w-5 h-5 text-[#a4ff7b]" />
              </a>
              <a 
                href="https://www.instagram.com/susstem.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
                aria-label="Visit our Instagram page (opens in new tab)"
              >
                <Instagram className="w-5 h-5 text-[#a4ff7b]" />
              </a>
              <a 
                href="https://twitter.com/susstem_org" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
                aria-label="Visit our X/Twitter page (opens in new tab)"
              >
                <FaXTwitter className="w-5 h-5 text-[#a4ff7b]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-[#a4ff7b]/40 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/60 text-xs text-center md:text-left">
              © 2026 SusSTEM — Empowering sustainability through STEM.
            </p>
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-[#a4ff7b] fill-current" />
              <span>for our planet</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}