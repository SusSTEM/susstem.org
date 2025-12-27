import { Lightbulb, Leaf, Cpu } from "lucide-react";

export default function WhatIsSusSTEM() {
  return (
    <section className="bg-white py-12 md:py-24" id="what-is-susstem">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top: main two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-6">
            <h2
              className="text-[#000000] text-3xl md:text-4xl lg:text-5xl"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              What is SusSTEM?
            </h2>

            <p className="text-2xl leading-relaxed">
              <span className="font-semibold text-[#20593A]">SusSTEM</span>
              <span className="font-semibold text-[#072d2d]">{" = "}</span>
              <span className="font-semibold text-[#072d2d]">Sustainability</span>
              <span className="font-semibold text-[#072d2d]">{" + "}</span>
              <span className="font-semibold text-[#a2bb65]">S.T.E.M</span>
            </p>

            <p className="text-[#072d2d] text-lg leading-relaxed">
              SusSTEM is a <strong>Not-For-Profit Organisation</strong> empowered to offer{" "}
              <strong>free STEM education</strong> to students in under-resourced communities. 
              Through <strong>3 levels</strong> of hands-on projects, <strong>secondary school students aged 11-18</strong> learn to build
              real-world solutions that make a difference in their communities and beyond.
            </p>
             <p className="text-[#072d2d] text-lg leading-relaxed">
                'SusSTEM inspires the next generation of sustainable innovators through S.T.E.M'
            </p>
          </div>

          {/* Right - Cards + contributions paragraph */}
          <div className="flex flex-col items-center space-y-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-[#e1e4d8] hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 rounded-full bg-[#a2bb65] flex items-center justify-center">
                  <Lightbulb className="w-10 h-10 text-white" />
                </div>
                <p
                  className="text-[#20593A]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
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
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
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
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Technology
                </p>
              </div>
            </div>

            {/* Moved paragraph */}
            <p className="text-[#072d2d] text-lg leading-relaxed text-center md:text-left">
              Your contributions fuel our mission at <strong>SusSTEM</strong> to combine Sustainable,
              Environmental practices with{" "}
              <strong>Science, Technology, Engineering, and Math (S.T.E.M)</strong> to inspire
              students to protect the planet through STEM-powered, sustainable innovation.
            </p>
          </div>
        </div>

        {/* Founder quote section under entire block */}
        <div className="mt-16 max-w-5xl mx-auto rounded-2xl bg-[#a2bb65] px-6 md:px-10 py-8 md:py-10 shadow-[6px_6px_20px_rgba(0,0,0,0.15)] hover:shadow-[8px_8px_24px_rgba(0,0,0,0.5)]  hover:scale-105 transition-all duration-300 ease-out">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            {/* Left: your photo */}
            <div className="flex-shrink-0 mt-8">
              <img
                src="https://lh3.googleusercontent.com/d/1Mr8hAre5_rArRCbwYH-HSByRGlRKG7HD" // update path if needed
                alt="Daivik Anand Datwani"
                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover"              />
            </div>

            {/* Middle: longer vertical divider */}
            <div className="hidden md:block w-4 h-62 bg-[#072d2d]/70" />

            {/* Right: text + name */}
            <div className="text-center md:text-left">
              <p
                className="text-lg md:text-xl text-[#072d2d] leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
               What started as an extracurricular club called “WASTEless,” teaching students about waste disposal and management at school, has evolved into <strong>SusSTEM</strong>.
              </p>
             
              <p
                className="text-lg md:text-xl mt-4 text-[#072d2d] leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <strong>SusSTEM</strong> is a passion project that unites my love for S.T.E.M with environmental protection, empowering young students to harness the power of technology to tackle sustainability challenges in their communities.
              </p>
              <p
                
                className="mt-4 text-[#072d2d] text-xl leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif", fontStyle: "italic" }}
              >
                 <strong>Daivik Anand Datwani –</strong> Founder, CTO
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
