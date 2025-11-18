import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  {
    id: 1,
    title: "Inspiring the next generation of sustainable innovators",
    cta: "Learn More",
    image: "https://lh3.googleusercontent.com/d/1LRARvsxKH6kVPlTnjaHwXC-otHiIu_p9",
  },
  {
    id: 2,
    title: "STEM-Powered Minds for a Sustainable Tomorrow",
    cta: "See Our Projects",
    image: "https://lh3.googleusercontent.com/d/1e_0so0mnYUPoTk97sFBzgUmDkjHezzSj"
  },
  {
    id: 3,
    title: "SusSTEM = ",
    cta: "Join the Movement",
    image: "https://lh3.googleusercontent.com/d/1WSwVVQKl4pHsYT64a33g_V93NSTR4ZUA",
  },
  {
    id: 4,
    title: "STEM for every child, everywhere",
    cta: "Explore Impact",
    image: "https://lh3.googleusercontent.com/d/1VGbyFCCFytb9dA-p6XZI00N1uB7lmnQT",
  },
  {
    id: 5,
    title: "Solving global sustainability challenges with STEM",
    cta: "Partner With Us",
    image: "https://lh3.googleusercontent.com/d/1mEw31noBCxE5c0d5JYs9rbutjZPc7rAj",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden">
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'tween', ease: 'easeInOut', duration: 0.8 },
            opacity: { duration: 0.6 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          />
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(75,96,67,0.3) 0%, rgba(75,96,67,0.6) 100%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-6">
            <div className="max-w-4xl text-center space-y-8">
              {slides[currentSlide].id === 3 ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex flex-col items-center space-y-2"
                >
                  <h1 className="text-white text-4xl md:text-5xl lg:text-6xl leading-tight" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                    {slides[currentSlide].title}
                  </h1>
                  <span className="text-white text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                    Sustainability + STEM
                  </span>
                </motion.div>
              ) : (
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-white text-4xl md:text-5xl lg:text-6xl leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
              )}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Button className="bg-[#20593A] hover:bg-[#a2bb65] text-white px-10 py-7 rounded-xl transition-colors text-lg shadow-xl">
                  {slides[currentSlide].cta}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? "w-10 h-3 bg-white"
                : "w-3 h-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
