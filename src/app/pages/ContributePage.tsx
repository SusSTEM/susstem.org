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
    explorerKitQty * 1 + changemakerKitQty * 1;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalContribution <= 0) {
      alert("Please select at least one kit to proceed.");
      return;
    }

    const checkoutUrl = "https://www.zenstores.shop/products/bluetooth-controlled-car/2064485000004265149";
    
    // Opens in a separate tab
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#eff2e7]">
      {/* Hero */}
      <div
        className="text-white py-16 px-6"
        style={{
          background:
            "linear-gradient(135deg, #072d2d 0%, #0f3d2e 50%, #20593a 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
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
            Please Contribute Generously!
          </h2>
          <p
            className="text-[#072d2d] text-base mb-6 text-center"
            style={{ fontFamily: "Poppins, sans-serif" }}
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
                      Level 1: Explorer Kit
                    </h4>
                    <button
                      type="button"
                      onClick={() => setInfoModalKit("explorer")}
                      className="w-8 h-8 rounded-full bg-[#20593a] text-white hover:bg-white hover:text-[#072d2d] transition-colors duration-200 shadow-sm border border-[#072d2d]/10 flex items-center justify-center active:scale-95 shrink-0 cursor-pointer"
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
                    {kitPrices.explorer} AED
                  </span>
                </div>
                <p
                  className="text-[#072d2d] text-sm mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Introductory environmental sensors and microcontroller to teach students fundamental STEM & climate concepts.
                </p>

                {/* Image Container */}
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
                        onClick={() => updateKitQuantity(setExplorerKitQty, explorerKitQty, -1)}
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
                        onClick={() => updateKitQuantity(setExplorerKitQty, explorerKitQty, 1)}
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
                    Total: {kitPrices.explorer * explorerKitQty} AED
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
                      Level 2: Changemaker Kit
                    </h4>
                    <button
                      type="button"
                      onClick={() => setInfoModalKit("changemaker")}
                      className="w-8 h-8 rounded-full bg-[#20593a] text-white hover:bg-[#072d2d] transition-colors duration-200 shadow-sm border border-[#072d2d]/10 flex items-center justify-center active:scale-95 shrink-0 cursor-pointer"
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
                    {kitPrices.changemaker} AED
                  </span>
                </div>
                <p
                  className="text-[#072d2d] text-sm mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Advanced team kit featuring solar power, IoT monitoring, and automated irrigation for local environmental projects.
                </p>

                {/* Image Container */}
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
                        onClick={() => updateKitQuantity(setChangemakerKitQty, changemakerKitQty, -1)}
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
                        onClick={() => updateKitQuantity(setChangemakerKitQty, changemakerKitQty, 1)}
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
                    Total: {kitPrices.changemaker * changemakerKitQty} AED
                  </span>
                </div>
              </div>
            </div>

            {/* Impact Counter */}
            <div className="bg-[#bcb0fa]/80 border border-[#4632C4] rounded-2xl p-4 text-center mt-5">
              <p className="text-[#072d2d] text-xs font-semibold mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                Your Impact
              </p>
              <p className="text-[#072d2d] font-bold" style={{ fontFamily: "Poppins, sans-serif", fontSize: "32px" }}>
                {calculateStudentsImpacted()}
              </p>
              <p className="text-[#072d2d] text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>
                students empowered with STEM education
              </p>
            </div>

            {/* Total Summary */}
            <div className="rounded-2xl bg-[#eff2e7] p-4 border border-[#dbe4d3]">
              <div className="flex items-center justify-between text-sm text-[#072d2d]" style={{ fontFamily: "Poppins, sans-serif" }}>
                <span className="font-medium">Estimated total</span>
                <span className="font-bold text-[#20593A] text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {totalContribution} AED
                </span>
              </div>
            </div>

            {/* Zenstores Partnership Notice Card */}
            <div className="rounded-2xl bg-[#ff0000]/30 border border-[#ff0000] p-5 flex items-center gap-5">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl bg-white p-0 shrink-0 flex items-center justify-center shadow-md border border-[#e2e8f0] overflow-hidden">
                <img
                  src="/images/zenstoreslogosusstem.png"
                  alt="Zenstore Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Text Message */}
              <p
                className="text-sm sm:text-base text-[#072d2d] leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}
              >
                We are partnered with{" "}
                <span className="font-semibold text-[#000000]">Zenstore India</span>, India's
                1st career experiential store, for secure payment processing and direct
                delivery of kits to students and schools. Clicking{" "}
                <span className="font-semibold text-[#20593A]">Continue</span> will
                redirect you to their platform to complete your transaction.
              </p>
            </div>

            {/* Checkout Button */}
            <Button
              type="submit"
              className="w-full bg-[#20593A] hover:bg-[#072d2d] text-white text-lg sm:text-xl font-bold py-4 sm:py-5 rounded-2xl shadow-md hover:shadow-xl hover:shadow-[#20593A]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              style={{ fontFamily: "Poppins, sans-serif" }}
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

      {/* Component BOM Modal */}
      {infoModalKit && (
        <div 
          onClick={() => setInfoModalKit(null)}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-100 relative max-h-[90vh] flex flex-col"
          >
            <button
              onClick={() => setInfoModalKit(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all p-2 rounded-full cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-[#072d2d] mb-4 pr-8 shrink-0" style={{ fontFamily: "Poppins, sans-serif" }}>
              {infoModalKit === "explorer" ? "Explorer Kit BOM (100 AED)" : "Changemaker Kit BOM (250 AED)"}
            </h3>

            <div className="overflow-y-auto pr-1">
              {infoModalKit === "explorer" ? (
                <ul className="text-sm text-[#072d2d] space-y-2.5 font-medium">
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>Arduino UNO Board</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 pc</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>DHT11 Temp & Humidity Sensor</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 pc</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>Soil Moisture Sensor</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 pc</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>LDR Light Sensor</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 pc</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>LED Indicators & Buzzer Alarm</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 set</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>Mini Breadboard & Jumper Wires</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 set</span>
                  </li>
                  <li className="flex items-center justify-between pb-1">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>USB Programming Cable</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 pc</span>
                  </li>
                </ul>
              ) : (
                <ul className="text-sm text-[#072d2d] space-y-2.5 font-medium">
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>ESP32 Wi-Fi / Bluetooth Board</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 pc</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>5V Solar Panel + Charge Controller</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 set</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>TDS Water Quality & Salinity Sensor</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 pc</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>Capacitive Soil Moisture Sensor</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 pc</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>5V Submersible Water Pump + Tubing</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 set</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>16x2 I2C Screen Display</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 pc</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>5V Relay Switch Module</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 pc</span>
                  </li>
                  <li className="flex items-center justify-between pb-1">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#20593a] shrink-0" />
                      <span>Breadboard & Assorted Jumper Wires</span>
                    </span>
                    <span className="font-semibold text-[#20593a] text-xs">1 set</span>
                  </li>
                </ul>
              )}
            </div>
            
            <Button
              onClick={() => setInfoModalKit(null)}
              className="w-full mt-6 bg-[#20593A] hover:bg-[#072d2d] text-white font-semibold py-3 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
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