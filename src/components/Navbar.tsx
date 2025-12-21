import React, { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, HandHeart, DollarSign, Handshake, ChevronDown, ChevronRight } from "lucide-react";

interface NavbarProps {
  onNavigate?: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownAreaRef.current &&
        !dropdownAreaRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const dropdownItems = [
    { icon: HandHeart, label: "Volunteer", page: "volunteer" },
    { icon: DollarSign, label: "Donate", page: "donate" },
    { icon: Handshake, label: "Partner", page: "partner" },
  ];

  return (
    <nav className="bg-[#eff2e7] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('home');
              }}
            >
              <span className="text-3xl text-[#072d2d] font-bold font-[Poppins,sans-serif]" style={{ fontWeight: 700 }}>
                SusSTEM
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#what-is-susstem" className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif]">
              About Us
            </a>
            <a href="#projects" className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif]">
              The Programme
            </a>
            <a href="#impact" className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif]">
              Impact
            </a>
            <a href="#about-us" className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif]">
              Our Purpose
            </a>

            {/* Get Involved Dropdown - sticky version */}
            <div
              ref={dropdownAreaRef}
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
            >
              <button
                className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] flex items-center gap-1"
                onClick={() => setIsDropdownOpen((open) => !open)}
                aria-expanded={isDropdownOpen}
              >
                Get Involved
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-[280px] bg-[#eff2e7] border border-[#eff2e7] rounded-2xl shadow-lg overflow-hidden"
                  style={{ borderRadius: '1rem' }}
                >
                  <div className="py-4 px-6">
                    {dropdownItems.map((item, index) => (
                      <button
                        key={item.page}
                        onClick={() => handleNavigate(item.page)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#a2bb65] hover:text-white transition-all group"
                        style={{ marginBottom: index < dropdownItems.length - 1 ? '12px' : '0' }}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-[Poppins,sans-serif]" style={{ fontWeight: 600 }}>
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="#contact" className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif]">
              Contact
            </a>
          </div>

          {/* Donate Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-[#a4ff7b] hover:bg-[#072d2d] text-[#072d2d] hover:text-white px-10 py-3 rounded-xl transition-colors font-bold font-[Poppins,sans-serif] text-lg"
              onClick={() => handleNavigate('donate')}
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
            <a href="#what-is-susstem" className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif]">
              What is SusSTEM?
            </a>
            <a href="#projects" className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif]">
              The Programme
            </a>
            <a href="#impact" className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif]">
              Impact
            </a>
            <a href="#about-us" className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif]">
              Our Purpose
            </a>
            
            {/* Mobile Get Involved Submenu */}
            <div className="flex flex-col gap-2">
              <button 
                className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] text-left flex items-center gap-1"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Get Involved
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="pl-4 flex flex-col gap-2">
                  {dropdownItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => handleNavigate(item.page)}
                      className="flex items-center gap-2 text-[#000000] hover:text-[#a2bb65] transition-colors font-[Poppins,sans-serif]"
                      style={{ fontWeight: 600 }}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#contact" className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif]">
              Contact
            </a>
            <Button 
              className="bg-[#a4ff7b] hover:bg-[#072d2d] text-[#000000] hover:text-white rounded-xl transition-colors w-full font-bold font-[Poppins,sans-serif] text-lg px-10 py-3"
              onClick={() => handleNavigate('donate')}
            >
              Donate
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}