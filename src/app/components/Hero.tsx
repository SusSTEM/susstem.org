import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  {
    id: 1,
    title: "Inspiring the next generation of sustainable innovators",
    cta: "Learn More",
    link: "#what-is-susstem",
    image: "https://lh3.googleusercontent.com/d/1e_0so0mnYUPoTk97sFBzgUmDkjHezzSj",
  },
  {
    id: 2,
    title: "STEM-Powered Minds for a Sustainable Tomorrow",
    cta: "See Our Projects",
    link: "#projects",
    image: "https://lh3.googleusercontent.com/d/1LRARvsxKH6kVPlTnjaHwXC-otHiIu_p9",
  },
  {
    id: 3,
    title: "SusSTEM = ",
    cta: "Join the Movement",
    link: "#get-involved",
    image: "https://lh3.googleusercontent.com/d/1WSwVVQKl4pHsYT64a33g_V93NSTR4ZUA",
  },
  {
    id: 4,
    title: "STEM for every child, everywhere",
    cta: "Explore Impact",
    link: "#impact",
    image: "https://lh3.googleusercontent.com/d/1VGbyFCCFytb9dA-p6XZI00N1uB7lmnQT",
  },
  {
    id: 5,
    title: "Solving global sustainability challenges with STEM",
    cta: "Partner With Us",
    link: "#get-involved",
    image: "https://lh3.googleusercontent.com/d/1mEw31noBCxE5c0d5JYs9rbutjZPc7rAj",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const handleCTAClick = (link: string) => {
    const element = document.querySelector(link);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-[82svh] overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(75,96,67,0.3) 0%, rgba(75,96,67,0.6) 100%)" }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
            <div className="max-w-4xl text-center space-y-6 md:space-y-8">
              {slides[currentSlide].id === 3 ? (
                <motion.div
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col items-center space-y-2"
                >
                  <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                    {slides[currentSlide].title}
                  </h1>
                  <span className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                    Sustainability + STEM
                  </span>
                </motion.div>
              ) : (
                <motion.h1
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
              )}
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Button
                  className="bg-[#20593A] hover:bg-[#a2bb65] text-white w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-6 rounded-xl transition-colors duration-300 text-base sm:text-lg shadow-xl"
                  onClick={() => handleCTAClick(slides[currentSlide].link)}
                >
                  {slides[currentSlide].cta}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-3 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-[#a2bb65]/50 hover:bg-[#a2bb65]/70 backdrop-blur-sm p-2.5 sm:p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-[#a2bb65]/50 hover:bg-[#a2bb65]/70 backdrop-blur-sm p-2.5 sm:p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 ease-out rounded-full ${
              index === currentSlide ? "w-8 sm:w-10 h-2.5 sm:h-3 bg-white" : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
