import { Lightbulb, Leaf, Cpu } from "lucide-react";

export function WhatIsSusSTEM() {
  return (
    <section className="bg-white py-12 md:py-24" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-6">
            <h2 
              className="text-[#000000] text-3xl md:text-4xl lg:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
            >
              What is SusSTEM?
            </h2>
            <p className="text-[#858E80] text-lg leading-relaxed">
              SusSTEM combines Science, Technology, Engineering, and Math to teach children how to protect the planet through innovation. We believe that every young mind has the potential to create sustainable solutions for tomorrow's challenges.
            </p>
            <p className="text-[#858E80] text-lg leading-relaxed">
              Through hands-on projects using Arduino, sensors, and coding, students aged 8-18 learn to build real-world solutions that make a difference in their communities and beyond.
            </p>
          </div>

          {/* Right - Icon Illustration */}
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-[#e1e4d8] hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 rounded-full bg-[#a2bb65] flex items-center justify-center">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <p className="text-[#20593A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Innovation
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-[#e1e4d8] hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 rounded-full bg-[#20593A] flex items-center justify-center">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <p className="text-[#20593A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Sustainability
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-[#e1e4d8] hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 rounded-full bg-[#a2bb65] flex items-center justify-center">
                <Cpu className="w-10 h-10 text-white" />
              </div>
              <p className="text-[#20593A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
