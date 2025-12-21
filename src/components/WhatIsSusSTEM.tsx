import { Lightbulb, Leaf, Cpu } from "lucide-react";
export default function WhatIsSusSTEM() {
  return (
    <section className="bg-white py-12 md:py-24" id="what-is-susstem">
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

            <p className="text-2xl leading-relaxed">
              <span className="font-semibold text-[#20593A]">SusSTEM</span>
              <span className="font-semibold text-[#072d2d]">{" = "}</span>
              <span className="font-semibold text-[#a2bb65]">Sustainability</span>
              <span className="font-semibold text-[#072d2d]">{" + "}</span>
              <span className="font-semibold">
                <span className="text-[#ff9b69]">S</span>
                <span className="text-[#20593a]">.</span>
                <span className="text-[#f5b400]">T</span>
                <span className="text-[#20593A]">.</span>
                <span className="text-[#5978ff]">E</span>
                <span className="text-[#20593A]">.</span>
                <span className="text-[#20593A]">M</span>
              </span>
            </p>
             
            <p className="text-[#072d2d] text-xl leading-relaxed">
              <strong>'SusSTEM inspires the next generation of sustainable innovators through S.T.E.M'</strong>
            </p>

            <p className="text-[#072d2d] text-lg leading-relaxed">
              SusSTEM is a <strong>Not-For-Profit Organisation</strong> empowered to offer <strong>free STEM education</strong> to underprivileged students in financially challenged communities. Through <strong>3 levels</strong> of hands-on projects using
              microcontrollers, sensors, motors and coding, <strong>secondary school students aged 11-18</strong> learn to build
              real-world solutions that make a difference in their communities and beyond.
            </p>
            
            <p className="text-[#072d2d] text-lg leading-relaxed">
              Your contributions fuel our mission at <strong>SusSTEM</strong> to combine Sustainable, Environmental practices with{" "}
              <strong>Science, Technology, Engineering, and Math (S.T.E.M)</strong> to inspire
                students to protect the planet through STEM-powered, sustainable innovation.
            </p>    
          </div>

          {/* Right - Cards + Quote */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-[#e1e4d8] hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 rounded-full bg-[#a2bb65] flex items-center justify-center">
                  <Lightbulb className="w-10 h-10 text-white" />
                </div>
                <p
                  className="text-[#20593A]"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  Innovation
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-[#e1e4d8] hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 rounded-full bg-[#20593A] flex items-center justify-center">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <p
                  className="text-[#20593A]"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  Sustainability
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-[#e1e4d8] hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 rounded-full bg-[#a2bb65] flex items-center justify-center">
                  <Cpu className="w-10 h-10 text-white" />
                </div>
                <p
                  className="text-[#20593A]"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  Technology
                </p>
              </div>
            </div>

            {/* Quote under the 3 cards */}
            <div className="mt-12 max-w-xl rounded-2xl bg-[#a2bb65] px-6 py-8 shadow-sm">
              <p
                className="text-lg text-[#072d2d] leading-relaxed"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                What began as an extracurricular club at school called 'WASTEless', focused on educating students on waste disposal and management at school, has grown into SusSTEM, a platform that merges my passion for STEM with a desire to protect the environment, so that young people everywhere can harness the power of technology to tackle sustainability challenges in their communities.
              </p>
              <p
                className="mt-4 text-[#072d2d] text-xl font-bold leading-relaxed"
                style={{ fontFamily: 'Poppins, sans-serif', fontStyle: 'italic' }}
              >
                Daivik Anand Datwani - Founder
              </p>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
