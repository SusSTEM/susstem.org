import { useState } from "react";
import { Button } from "../components/ui/button";

export function ContributePage() {
  // Kit quantities
  const [explorerKitQty, setExplorerKitQty] = useState(0);
  const [changemakerKitQty, setChangemakerKitQty] = useState(0);

  const kitPrices = {
    explorer: 100,
    changemaker: 600,
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
    window.location.href = "https://example.com/checkout";
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
            <div className="space-y-5">
              {/* Explorer Kit */}
              <div className="rounded-2xl border border-gray-100 bg-[#a2bb65]/80 p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4
                      className="text-[#000000] font-semibold text-base"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Explorer Kit — Level 1
                    </h4>
                    <p
                      className="text-[#072d2d] text-xs mt-0.5"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Introductory electronics & environmental sensors
                    </p>
                  </div>
                  <span
                    className="text-[#20593A] font-bold text-lg ml-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    د.إ{kitPrices.explorer}
                  </span>
                </div>

                {/* Compact Square-Friendly Image Space */}
                <div className="flex justify-center my-3">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden bg-white/60 flex items-center justify-center p-2 shadow-inner border border-[#072d2d]/10">
                    <img
                      src="/images/arduinouno.jpeg"
                      alt="Explorer Kit"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap mt-2">
                  <span
                    className="text-sm text-[#072d2d] font-medium"
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
                      className="w-8 h-8 rounded-full bg-[#eff2e7] text-base font-semibold text-[#20593A] hover:bg-[#dbe4d3] transition-colors"
                      aria-label="Decrease Explorer Kit quantity"
                    >
                      −
                    </button>
                    <div
                      className="min-w-8 text-center text-sm font-semibold text-[#072d2d]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {explorerKitQty}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateKitQuantity(
                          setExplorerKitQty,
                          explorerKitQty,
                          1
                        )
                      }
                      className="w-8 h-8 rounded-full bg-[#20593A] text-base font-semibold text-white hover:bg-[#072d2d] transition-colors"
                      aria-label="Increase Explorer Kit quantity"
                    >
                      +
                    </button>
                  </div>
                  <span
                    className="ml-auto text-[#20593A] font-semibold text-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Total: د.إ{kitPrices.explorer * explorerKitQty}
                  </span>
                </div>
              </div>

              {/* Changemaker Kit */}
              <div className="rounded-2xl border border-gray-100 bg-[#ff9b69]/80 p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4
                      className="text-[#000000] font-semibold text-base"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Changemaker Kit — Level 3
                    </h4>
                    <p
                      className="text-[#072d2d] text-xs mt-0.5"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Advanced team kit — serves 5 students on real-world
                      prototypes
                    </p>
                  </div>
                  <span
                    className="text-[#20593A] font-bold text-lg ml-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    د.إ{kitPrices.changemaker}
                  </span>
                </div>

                {/* Compact Square-Friendly Image Space */}
                <div className="flex justify-center my-3">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden bg-white/60 flex items-center justify-center p-2 shadow-inner border border-[#072d2d]/10">
                    <img
                      src="/images/changemakerprojsusstem.jpg"
                      alt="Changemaker Kit"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap mt-2">
                  <span
                    className="text-sm text-[#072d2d] font-medium"
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
                      className="w-8 h-8 rounded-full bg-[#eff2e7] text-base font-semibold text-[#20593A] hover:bg-[#dbe4d3] transition-colors"
                      aria-label="Decrease Changemaker Kit quantity"
                    >
                      −
                    </button>
                    <div
                      className="min-w-8 text-center text-sm font-semibold text-[#072d2d]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {changemakerKitQty}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateKitQuantity(
                          setChangemakerKitQty,
                          changemakerKitQty,
                          1
                        )
                      }
                      className="w-8 h-8 rounded-full bg-[#20593A] text-base font-semibold text-white hover:bg-[#072d2d] transition-colors"
                      aria-label="Increase Changemaker Kit quantity"
                    >
                      +
                    </button>
                  </div>
                  <span
                    className="ml-auto text-[#20593A] font-semibold text-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Total: د.إ{kitPrices.changemaker * changemakerKitQty}
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
                  د.إ{totalContribution}
                </span>
              </div>
            </div>

            {/* Animated Checkout Button */}
            <Button
              type="submit"
              className="w-full bg-[#20593A] hover:bg-[#072d2d] text-white text-base font-semibold transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] hover:shadow-lg hover:shadow-[#20593A]/20"
              style={{
                borderRadius: "12px",
                padding: "14px 0",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
              }}
            >
              Continue to Checkout
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}