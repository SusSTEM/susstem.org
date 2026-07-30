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
              'SusSTEM' is a youth‑led initiative that uses hands‑on STEM projects to teach sustainability to students, especially in under‑resourced or rural communities with the support of volunteers and your contributions. 
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
                <button
                  type="button"
                  onClick={() => navigateTo("home#get-involved")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left"
                >
                  Partner With Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home#get-involved")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left"
                >
                  Volunteer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home#get-involved")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left"
                >
                  Contribute
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home#projects")}
                  className="text-white/80 hover:text-[#a4ff7b] transition-colors text-left"
                >
                  For Educators
                </button>
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
                href="https://www.linkedin.com/company/susstem" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
                aria-label="Visit our LinkedIn page (opens in new tab)"
              >
                <Linkedin className="w-6 h-6 text-[#a4ff7b]" />
              </a>
              <a 
                href="https://youtube.com/playlist?list=PLCGFK1Hy9Lr_qg_RLBL0UDd-ABLgztDd_&si=6lMixLGdP4BSBk-b" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
                aria-label="Visit our YouTube channel (opens in new tab)"
              >
                <Youtube className="w-6 h-6 text-[#a4ff7b]" />
              </a>
              <a 
                href="https://www.instagram.com/susstem.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
                aria-label="Visit our Instagram page (opens in new tab)"
              >
                <Instagram className="w-6 h-6 text-[#a4ff7b]" />
              </a>
              <a 
                href="https://twitter.com/susstem_org" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#a2bb65] flex items-center justify-center transition-colors"
                aria-label="Visit our X/Twitter page (opens in new tab)"
              >
                <FaXTwitter className="w-6 h-6 text-[#a4ff7b]" />
              </a>
            </div>
            <div className="pt-4">
              <p className="text-white/80 text-sm">
                Email:{" "}
                <a 
                  href="mailto:hello@susstem.org"
                  className="hover:text-[#a4ff7b] transition-colors"
                >
                  hello@susstem.org
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-[#a4ff7b] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © 2026 SusSTEM — Empowering sustainability through STEM.
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