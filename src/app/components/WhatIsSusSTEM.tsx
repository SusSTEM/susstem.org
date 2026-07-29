import { Lightbulb, Leaf, Cpu } from "lucide-react";

export default function WhatIsSusSTEM() {
  return (
    <section id="what-is-susstem">
      <div className="bg-[#20593A] text-white pt-14 pb-16 md:pt-20 md:pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-white font-bold"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            What is SusSTEM?
          </h2>

          <p className="text-2xl md:text-3xl leading-relaxed tracking-wide">
            <span className="font-bold text-white">SusSTEM</span>
            <span className="font-semibold text-white">{" = "}</span>
            <span className="font-semibold text-white">Sustainability</span>
            <span className="font-semibold text-white">{" + "}</span>
            <span className="font-bold text-white">S.T.E.M</span>
          </p>

          <div className="max-w-3xl mx-auto space-y-4 text-white text-lg md:text-xl leading-relaxed">
            <p className="font-normal">
              <strong className="font-bold text-white">SusSTEM</strong> is a Not-For-Profit Organisation empowered to offer{" "}
              <strong className="font-bold text-white">free STEM education</strong> to students in under-resourced communities.
            </p>
            <p className="font-normal">
              We offer <strong className="font-bold text-white">completely free, online STEM courses</strong> with 2 levels of hands-on projects, where <strong className="font-bold text-white">secondary school students aged 11-18</strong> learn to build real-world solutions that make a difference in their communities and beyond.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white pt-16 pb-24 md:pb-28 px-6 relative">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="flex flex-col items-center space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-[#e1e4d8] hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 rounded-full bg-[#a2bb65] flex items-center justify-center">
                  <Lightbulb className="w-10 h-10 text-white" />
                </div>
                <p
                  className="text-[#20593A] text-lg"
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
                  className="text-[#20593A] text-lg"
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
                  className="text-[#20593A] text-lg"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Technology
                </p>
              </div>
            </div>

            <p className="text-[#072d2d] text-lg md:text-xl leading-relaxed text-center max-w-3xl mt-4 md:mt-8">
              Your contributions fuel our mission at <strong>SusSTEM</strong> to combine Sustainable,
              Environmental practices with{" "}
              <strong>Science, Technology, Engineering, and Math (S.T.E.M)</strong> in order to inspire
              students to build STEM-powered, sustainable and innovative solutions to protect the planet.
            </p>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-20 w-full px-6 flex justify-center pointer-events-none">
          <div className="bg-[#20593A] text-[#ffffff] px-8 py-4 rounded-full max-w-xl text-center shadow-xl border-2 border-[#a2bb65] pointer-events-auto">
            <p 
              className="text-base md:text-lg font-semibold"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              'SusSTEM inspires the next generation of sustainable innovators through S.T.E.M'
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}