import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#a2bb65] flex items-center justify-center">
                <span className="text-white text-xl">S</span>
              </div>
              <span className="text-2xl text-[#20593A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                SusSTEM.org
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-[#000000] hover:text-[#a2bb65] transition-colors">
              About
            </a>
            <a href="#projects" className="text-[#000000] hover:text-[#a2bb65] transition-colors">
              Projects
            </a>
            <a href="#impact" className="text-[#000000] hover:text-[#a2bb65] transition-colors">
              Impact
            </a>
            <a href="#get-involved" className="text-[#000000] hover:text-[#a2bb65] transition-colors">
              Get Involved
            </a>
            <a href="#contact" className="text-[#000000] hover:text-[#a2bb65] transition-colors">
              Contact
            </a>
          </div>

          {/* Donate Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-[#a4ff7b] hover:bg-[#072d2d] text-[#000000] hover:text-white px-8 rounded-xl transition-colors"
            >
              Donate
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#000000]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <a href="#about" className="text-[#000000] hover:text-[#a2bb65] transition-colors">
              About
            </a>
            <a href="#projects" className="text-[#000000] hover:text-[#a2bb65] transition-colors">
              Projects
            </a>
            <a href="#impact" className="text-[#000000] hover:text-[#a2bb65] transition-colors">
              Impact
            </a>
            <a href="#get-involved" className="text-[#000000] hover:text-[#a2bb65] transition-colors">
              Get Involved
            </a>
            <a href="#contact" className="text-[#000000] hover:text-[#a2bb65] transition-colors">
              Contact
            </a>
            <Button 
              className="bg-[#a4ff7b] hover:bg-[#072d2d] text-[#000000] hover:text-white rounded-xl transition-colors w-full"
            >
              Donate
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
