import { useState } from "react";
import { Info, X, ArrowRight, Check } from "lucide-react";
import { Button } from "../components/ui/button";

export function ContributePage() {
  // Kit quantities
  const [explorerKitQty, setExplorerKitQty] = useState(0);
  const [changemakerKitQty, setChangemakerKitQty] = useState(0);

  // States for modals
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [infoModalKit, setInfoModalKit] = useState<"explorer" | "changemaker" | null>(null);

  const kitPrices = {
    explorer: 100,
    changemaker: 250,
  };

  const updateKitQuantity = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    currentValue: number,
    delta: number
  ) => {
    setter(Math.max(0, currentValue + delta));
  };

  const totalContribution =
    kitPrices.explorer * explorerKitQty +
    kitPrices.changemaker * changemakerKitQty;

  const calculateStudentsImpacted = () =>
    explorerKitQty * 1 + changemakerKitQty * 5;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalContribution <= 0) {
      alert("Please select at least one kit to proceed.");
      return;
    }

    // Dummy checkout URL redirect
    window.location.href = "https://www.zenstores.shop/products/bluetooth-controlled-car/2064485000004265149";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div
        className="text-white py-16 px-6"
        style={{
          background:
            "linear-gradient(135deg, #072d2d 0%, #0f3d2e 50%, #20593a 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-[#a4ff7b]/20 border border-[#a4ff7b]/40 rounded-full px-5 py-2 mb-4">
            <span
              className="text-[#a4ff7b] text-sm font-semibold"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Make a Contribution
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl mb-3 leading-tight"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
          >
            Your contributions drive our mission forward.
          </h1>
          <p
            className="text-white/80 text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Your gift 🎁 reaches a child that is too often overlooked.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
          <h2
            className="text-2xl text-[#000000] mb-2 text-center"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
          >
            Choose Your Contribution
          </h2>
          <p
            className="text-[#858E80] text-sm mb-6 text-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Select learning kits to support STEM education for students in need.
          </p>

          <form onSubmit={handleCheckout} className="space-y-6">
            {/* CONTRIBUTE LEARNING KITS */}
            <div className="space-y-6">
              {/* Explorer Kit */}
              <div className="rounded-2xl border border-gray-100 bg-[#a2bb65]/80 p-4 sm:p-6">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h4
                      className="text-[#000000] font-semibold text-base sm:text-lg"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Explorer Kit
                    </h4>
                    {/* Lucide Info Button */}
                    <button
                      type="button"
                      onClick={() => setInfoModalKit("explorer")}
                      className="w-8 h-8 rounded-full bg-white text-[#072d2d] hover:bg-[#20593a] hover:text-white transition-colors duration-200 shadow-sm border border-[#072d2d]/10 flex items-center justify-center active:scale-95 shrink-0 cursor-pointer"
                      title="Kit details"
                      aria-label="View Explorer Kit info"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  <span
                    className="text-[#20593A] font-bold text-lg sm:text-xl ml-auto"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {kitPrices.explorer} د.إ
                  </span>
                </div>
                <p
                  className="text-[#072d2d] text-xs mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Introductory electronics & environmental sensors
                </p>

                {/* Image Container with Click-to-Expand */}
                <div className="flex justify-center my-3 sm:my-4">
                  <div 
                    onClick={() => setSelectedImage("/images/SusSTEM Level 1 Kit Mockup.png")}
                    className="w-[85%] max-w-xs aspect-[16/10] rounded-2xl overflow-hidden bg-white/70 flex items-center justify-center p-3 shadow-sm border border-[#072d2d]/10 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                  >
                    <img
                      src="/images/SusSTEM Level 1 Kit Mockup.png"
                      alt="Level 1 Kit"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 flex-wrap mt-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs sm:text-sm text-[#072d2d] font-medium"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Kits:
                    </span>
                    <div className="flex items-center gap-2 rounded-full border border-[#dbe4d3] bg-white p-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateKitQuantity(
                            setExplorerKitQty,
                            explorerKitQty,
                            -1
                          )
                        }
                        className="w-8 h-8 rounded-full bg-[#eff2e7] text-sm sm:text-base font-semibold text-[#20593A] hover:bg-[#dbe4d3] active:scale-95 transition-transform cursor-pointer"
                      >
                        −
                      </button>
                      <span
                        className="min-w-6 text-center text-xs sm:text-sm font-semibold text-[#072d2d]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {explorerKitQty}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateKitQuantity(
                            setExplorerKitQty,
                            explorerKitQty,
                            1
                          )
                        }
                        className="w-8 h-8 rounded-full bg-[#20593A] text-sm sm:text-base font-semibold text-white hover:bg-[#072d2d] active:scale-95 transition-transform cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span
                    className="text-[#20593A] font-semibold text-xs sm:text-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Total: {kitPrices.explorer * explorerKitQty} د.إ
                  </span>
                </div>
              </div>

              {/* Changemaker Kit */}
              <div className="rounded-2xl border border-gray-100 bg-[#ff9b69]/80 p-4 sm:p-6">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h4
                      className="text-[#000000] font-semibold text-base sm:text-lg"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Changemaker Kit
                    </h4>
                    {/* Lucide Info Button */}
                    <button
                      type="button"
                      onClick={() => setInfoModalKit("changemaker")}
                      className="w-8 h-8 rounded-full bg-white text-[#072d2d] hover:bg-[#20593a] hover:text-white transition-colors duration-200 shadow-sm border border-[#072d2d]/10 flex items-center justify-center active:scale-95 shrink-0 cursor-pointer"
                      title="Kit details"
                      aria-label="View Changemaker Kit info"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  <span
                    className="text-[#20593A] font-bold text-lg sm:text-xl ml-auto"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {kitPrices.changemaker} د.إ
                  </span>
                </div>
                <p
                  className="text-[#072d2d] text-xs mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Advanced team kit — serves 5 students on real-world prototypes
                </p>

                {/* Image Container with Click-to-Expand */}
                <div className="flex justify-center my-3 sm:my-4">
                  <div 
                    onClick={() => setSelectedImage("/images/Chnagemaker Kit Mockup.png")}
                    className="w-[85%] max-w-xs aspect-[16/10] rounded-2xl overflow-hidden bg-white/70 flex items-center justify-center p-3 shadow-sm border border-[#072d2d]/10 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                  >
                    <img
                      src="/images/Chnagemaker Kit Mockup.png"
                      alt="Changemaker Kit"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 flex-wrap mt-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs sm:text-sm text-[#072d2d] font-medium"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Kits:
                    </span>
                    <div className="flex items-center gap-2 rounded-full border border-[#dbe4d3] bg-white p-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateKitQuantity(
                            setChangemakerKitQty,
                            changemakerKitQty,
                            -1
                          )
                        }
                        className="w-8 h-8 rounded-full bg-[#eff2e7] text-sm sm:text-base font-semibold text-[#20593A] hover:bg-[#dbe4d3] active:scale-95 transition-transform cursor-pointer"
                      >
                        −
                      </button>
                      <span
                        className="min-w-6 text-center text-xs sm:text-sm font-semibold text-[#072d2d]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {changemakerKitQty}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateKitQuantity(
                            setChangemakerKitQty,
                            changemakerKitQty,
                            1
                          )
                        }
                        className="w-8 h-8 rounded-full bg-[#20593A] text-sm sm:text-base font-semibold text-white hover:bg-[#072d2d] active:scale-95 transition-transform cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span
                    className="text-[#20593A] font-semibold text-xs sm:text-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Total: {kitPrices.changemaker * changemakerKitQty} د.إ
                  </span>
                </div>
              </div>
            </div>

            {/* Impact Counter */}
            <div className="bg-[#a4ff7b]/20 border border-[#a4ff7b] rounded-2xl p-4 text-center mt-5">
              <p
                className="text-[#072d2d] text-xs font-semibold mb-0.5"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Your Impact
              </p>
              <p
                className="text-[#20593A] font-bold"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "32px",
                }}
              >
                {calculateStudentsImpacted()}
              </p>
              <p
                className="text-[#072d2d] text-xs"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                students empowered with STEM education
              </p>
            </div>

            {/* Total Summary */}
            <div className="rounded-2xl bg-[#eff2e7] p-4 border border-[#dbe4d3]">
              <div
                className="flex items-center justify-between text-sm text-[#072d2d]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="font-medium">Estimated total</span>
                <span
                  className="font-bold text-[#20593A] text-xl"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {totalContribution} د.إ
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              type="submit"
              className="w-full bg-[#20593A] hover:bg-[#072d2d] text-white text-lg sm:text-xl font-bold py-4 sm:py-5 rounded-2xl shadow-md hover:shadow-xl hover:shadow-[#20593A]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              style={{
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </form>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out animate-in fade-in duration-200"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 bg-white/10 p-2 rounded-full flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Enhanced Kit Info Modal */}
      {infoModalKit && (
        <div 
          onClick={() => setInfoModalKit(null)}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative"
          >
            <button
              onClick={() => setInfoModalKit(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full active:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            {infoModalKit === "explorer" ? (
              <div>
                <div className="flex items-center justify-between mb-3 pr-8">
                  <h3 className="text-xl font-bold text-[#072d2d]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Explorer Kit Details
                  </h3>
                  <span className="bg-[#a2bb65]/30 text-[#20593a] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Solo Learner
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  Designed for individual students entering electronics, programming, and environmental monitoring.
                </p>
                <ul className="text-sm text-[#072d2d] space-y-3 font-medium">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#20593a] shrink-0 mt-0.5" />
                    <span>Arduino Uno microcontroller unit</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#20593a] shrink-0 mt-0.5" />
                    <span>Basic breadboard & jumper wires</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#20593a] shrink-0 mt-0.5" />
                    <span>Environmental sensors (Temp & Soil Moisture)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#20593a] shrink-0 mt-0.5" />
                    <span>Step-by-step beginner workbook</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3 pr-8">
                  <h3 className="text-xl font-bold text-[#072d2d]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Changemaker Kit Details
                  </h3>
                  <span className="bg-[#a4ff7b]/30 text-[#20593a] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Team Edition
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  Built for teams of 5 students working on collaborative, real-world sustainability projects.
                </p>
                <ul className="text-sm text-[#072d2d] space-y-3 font-medium">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#20593a] shrink-0 mt-0.5" />
                    <span>Serves up to 5 students simultaneously</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#20593a] shrink-0 mt-0.5" />
                    <span>Advanced sensors & actuators</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#20593a] shrink-0 mt-0.5" />
                    <span>Prototyping components & power supplies</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#20593a] shrink-0 mt-0.5" />
                    <span>Full team challenge handbook & guide</span>
                  </li>
                </ul>
              </div>
            )}
            
            <Button
              onClick={() => setInfoModalKit(null)}
              className="w-full mt-6 bg-[#20593A] hover:bg-[#072d2d] text-white py-3 rounded-xl active:scale-95 transition-transform cursor-pointer"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Got it
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}