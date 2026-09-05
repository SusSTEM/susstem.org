import React, { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, HandHeart, DollarSign, Handshake, ChevronDown, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NavbarProps {
  onNavigate?: (page: string) => void;
}

/**
 * Navbar Component
 * * Handles:
 * - In-page smooth scrolling for section anchors (#what-is-susstem, #projects, etc.)
 * - SPA view switching (Volunteer, Donate, Partner, Contact, Home)
 */
export function Navbar({ onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownAreaRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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

  /**
   * Helper function for smooth scrolling & homepage reset
   */
  const handleNavClick = (target: string) => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);

    // 1. Logo / Home button click: Reset state to home and scroll strictly to top
    if (target === "#" || target === "") {
      if (onNavigate) {
        onNavigate("home");
      }
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    // 2. Section navigation: Check if target section exists on current DOM
    const element = document.querySelector(target);

    if (element) {
      // Already on Home view: Scroll directly
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // On a subpage (e.g. Contact, Contribute): Switch back to Home view first, then scroll
      if (onNavigate) {
        onNavigate("home");
      }
      setTimeout(() => {
        const delayedElement = document.querySelector(target);
        delayedElement?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  /**
   * Helper function to navigate to subpages (Volunteer, Contribute, Partner, Contact)
   */
  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const dropdownItems = [
    { icon: HandHeart, label: "Volunteer", page: "volunteer" },
    { icon: DollarSign, label: "Contribute", page: "contribute" },
    { icon: Handshake, label: "Partner", page: "partner" },
  ];

  return (
    <nav className="relative z-50 bg-[#ffffff] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => handleNavClick("#")}
              className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
              aria-label="Go to homepage"
            >
              <ImageWithFallback 
                src="/images/main%20pages/SusSTEMWEBSITEPNG.png"
                alt="SusSTEM Logo"
                className="h-10 w-auto object-contain"
              />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <button
              onClick={() => handleNavClick("#what-is-susstem")}
              className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] bg-transparent border-none cursor-pointer whitespace-nowrap"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick("#projects")}
              className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] bg-transparent border-none cursor-pointer whitespace-nowrap"
            >
              The Programme
            </button>
            <button
              onClick={() => handleNavClick("#impact")}
              className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] bg-transparent border-none cursor-pointer whitespace-nowrap"
            >
              Impact
            </button>
            <button
              onClick={() => handleNavClick("#about-us")}
              className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] bg-transparent border-none cursor-pointer whitespace-nowrap"
            >
              Our Purpose
            </button>

            {/* Get Involved Dropdown */}
            <div
              ref={dropdownAreaRef}
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
            >
              <button
                className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] flex items-center gap-1 whitespace-nowrap bg-transparent border-none cursor-pointer"
                onClick={() => setIsDropdownOpen((open) => !open)}
                aria-expanded={isDropdownOpen}
              >
                Get Involved
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-[280px] bg-[#ffffff] border border-[#e1e4d9] shadow-lg overflow-hidden"
                  style={{ borderRadius: '1rem' }}
                >
                  <div className="py-4 px-6">
                    {dropdownItems.map((item, index) => (
                      <button
                        key={item.page}
                        onClick={() => handleNavigate(item.page)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#20593a] hover:text-white transition-all group bg-transparent border-none cursor-pointer"
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

            <button
              onClick={() => handleNavigate("contact")}
              className="text-[#072d2d] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] bg-transparent border-none cursor-pointer whitespace-nowrap"
            >
              Contact
            </button>
          </div>

          {/* Donate/Contribute Button */}
          <div className="hidden md:block flex-shrink-0">
            <Button 
              className="bg-[#ffd459] hover:bg-[#072d2d] text-[#072d2d] hover:text-white px-10 py-4 rounded-2xl transition-colors font-bold font-[Poppins,sans-serif] text-lg"
              onClick={() => handleNavigate('contribute')}
            >
              Contribute
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#000000] bg-transparent border-none cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button
              onClick={() => handleNavClick("#what-is-susstem")}
              className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] text-left bg-transparent border-none cursor-pointer"
            >
              What is SusSTEM?
            </button>
            <button
              onClick={() => handleNavClick("#projects")}
              className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] text-left bg-transparent border-none cursor-pointer"
            >
              The Programme
            </button>
            <button
              onClick={() => handleNavClick("#impact")}
              className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] text-left bg-transparent border-none cursor-pointer"
            >
              Impact
            </button>
            <button
              onClick={() => handleNavClick("#about-us")}
              className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] text-left bg-transparent border-none cursor-pointer"
            >
              Our Purpose
            </button>
            
            {/* Mobile Get Involved Submenu */}
            <div className="flex flex-col gap-2 relative">
              <button 
                className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] text-left flex items-center gap-1 min-h-[44px] bg-transparent border-none cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                Get Involved
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="pl-4 flex flex-col gap-2 pointer-events-auto relative z-10">
                  {dropdownItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(item.page);
                      }}
                      className="flex items-center gap-2 text-[#000000] hover:text-[#a2bb65] transition-colors font-[Poppins,sans-serif] text-left min-h-[44px] py-2 bg-transparent border-none cursor-pointer"
                      style={{ fontWeight: 600 }}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigate("contact")}
              className="text-[#000000] hover:text-[#a2bb65] transition-colors font-bold font-[Poppins,sans-serif] text-left bg-transparent border-none cursor-pointer"
            >
              Contact
            </button>
            <Button 
              className="bg-[#ffd459] text-[#072d2d] hover:bg-[#072d2d] hover:text-white px-10 py-7 rounded-2xl transition shadow-xl hover:shadow-2xl hover:scale-105"
              onClick={() => handleNavigate('contribute')}
            >
              Contribute
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}