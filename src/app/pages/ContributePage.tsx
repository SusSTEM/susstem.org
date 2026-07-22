import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { GraduationCap, Globe, Sprout } from "lucide-react";

export function ContributePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | "other">(200);
  const [customAmount, setCustomAmount] = useState("");

  // Kit quantities
  const [explorerKitQty, setExplorerKitQty] = useState(1);
  // INNOVATOR_REMOVED: const [innovatorKitQty, setInnovatorKitQty] = useState(1);
  const [changemakerKitQty, setChangemakerKitQty] = useState(1);
  const [volunteerQty, setVolunteerQty] = useState(1);

  const kitPrices = {
    explorer: 100,
    // INNOVATOR_REMOVED: innovator: 200,
    changemaker: 600,
    volunteer: 400,
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    phone: "",
    inHonorMemory: false,
    honorName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount === "other" ? customAmount : selectedAmount;
    console.log("Contribution submitted:", { amount, ...formData });
  };

  const amountOptions = [50, 100, 150, 200, 400];

  const calculateStudentsImpacted = () =>
    explorerKitQty * 1 +
    // INNOVATOR_REMOVED: innovatorKitQty * 1 +
    changemakerKitQty * 5;

  const impactStats = [
    { icon: GraduationCap, value: "2,000+", label: "Students Reached" },
    { icon: Globe, value: "12+", label: "Countries" },
    { icon: Sprout, value: "100%", label: "Hands-On Learning" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div
        className="text-white py-20 px-6"
        style={{ background: "linear-gradient(135deg, #072d2d 0%, #0f3d2e 50%, #20593a 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-[#a4ff7b]/20 border border-[#a4ff7b]/40 rounded-full px-5 py-2 mb-6">
            <span className="text-[#a4ff7b] text-sm font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
              Make a Contribution
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-5 leading-tight" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
            Put STEM tools into the hands of the next generation.
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Every kit you fund gives a child the resources to build real solutions to real environmental challenges.
          </p>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {impactStats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center gap-2 text-center">
              <div className="w-11 h-11 rounded-xl bg-[#eff2e7] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#20593A]" />
              </div>
              <span className="text-2xl font-bold text-[#20593A]" style={{ fontFamily: "Poppins, sans-serif" }}>{value}</span>
              <span className="text-[#858E80] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-14">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-10">
          <h2 className="text-2xl text-[#000000] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
            Choose Your Contribution
          </h2>
          <p className="text-[#858E80] text-sm mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
            Select the kits or sponsorships you'd like to fund below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* CONTRIBUTE LEARNING KITS */}
            <div>
              <p className="text-xs font-semibold text-[#858E80] uppercase tracking-widest mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                Contribute Learning Kits
              </p>
              <div className="space-y-3">

                {/* Explorer Kit */}
                <div className="rounded-2xl border border-gray-100 bg-[#a2bb65]/15 p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-[#000000] font-semibold text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Explorer Kit — Level 1
                      </h4>
                      <p className="text-[#858E80] text-sm mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                        Introductory electronics & environmental sensors
                      </p>
                    </div>
                    <span className="text-[#20593A] font-bold text-lg ml-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                      د.إ{kitPrices.explorer}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Label className="text-sm text-[#072d2d]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>Kits:</Label>
                    <Select value={explorerKitQty.toString()} onValueChange={(v) => setExplorerKitQty(parseInt(v))}>
                      <SelectTrigger className="w-24 border-gray-200 rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(50)].map((_, i) => <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>)}
                        <SelectItem value="50+">50+</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="ml-auto text-[#20593A] font-semibold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Total: د.إ{kitPrices.explorer * explorerKitQty}
                    </span>
                  </div>
                </div>

                {/* INNOVATOR_REMOVED: Innovator Kit — uncomment to restore
                <div className="rounded-2xl border border-gray-100 bg-[#ffd459]/15 p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-[#000000] font-semibold text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Innovator Kit — Level 2
                      </h4>
                      <p className="text-[#858E80] text-sm mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                        Individual kit for building DIY sustainability solutions
                      </p>
                    </div>
                    <span className="text-[#20593A] font-bold text-lg ml-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                      د.إ200
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Label className="text-sm text-[#072d2d]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>Kits:</Label>
                    <Select value={innovatorKitQty.toString()} onValueChange={(v) => setInnovatorKitQty(parseInt(v))}>
                      <SelectTrigger className="w-24 border-gray-200 rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(50)].map((_, i) => <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>)}
                        <SelectItem value="50+">50+</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="ml-auto text-[#20593A] font-semibold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Total: د.إ{200 * innovatorKitQty}
                    </span>
                  </div>
                </div>
                */}

                {/* Changemaker Kit */}
                <div className="rounded-2xl border border-gray-100 bg-[#ff9b69]/15 p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-[#000000] font-semibold text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Changemaker Kit — Level 3
                      </h4>
                      <p className="text-[#858E80] text-sm mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                        Advanced team kit — serves 5 students on real-world prototypes
                      </p>
                    </div>
                    <span className="text-[#20593A] font-bold text-lg ml-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                      د.إ{kitPrices.changemaker}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Label className="text-sm text-[#072d2d]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>Kits:</Label>
                    <Select value={changemakerKitQty.toString()} onValueChange={(v) => setChangemakerKitQty(parseInt(v))}>
                      <SelectTrigger className="w-24 border-gray-200 rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(20)].map((_, i) => <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>)}
                        <SelectItem value="20+">20+</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="ml-auto text-[#20593A] font-semibold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Total: د.إ{kitPrices.changemaker * changemakerKitQty}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SPONSOR VOLUNTEERS */}
            <div>
              <p className="text-xs font-semibold text-[#858E80] uppercase tracking-widest mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                Sponsor Volunteers
              </p>
              <div className="rounded-2xl border border-gray-100 bg-[#bcb0fa]/15 p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-[#000000] font-semibold text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Sponsor a Volunteer / Educator
                    </h4>
                    <p className="text-[#858E80] text-sm mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                      Fund a trained mentor who guides students through their projects
                    </p>
                  </div>
                  <span className="text-[#20593A] font-bold text-lg ml-4" style={{ fontFamily: "Poppins, sans-serif" }}>
                    د.إ{kitPrices.volunteer}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Label className="text-sm text-[#072d2d]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>Volunteers:</Label>
                  <Select value={volunteerQty.toString()} onValueChange={(v) => setVolunteerQty(parseInt(v))}>
                    <SelectTrigger className="w-24 border-gray-200 rounded-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>)}
                      <SelectItem value="10+">10+</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="ml-auto text-[#20593A] font-semibold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Total: د.إ{kitPrices.volunteer * volunteerQty}
                  </span>
                </div>
              </div>
            </div>

            {/* Impact Counter */}
            <div className="bg-[#a4ff7b]/20 border border-[#a4ff7b] rounded-2xl p-5 text-center">
              <p className="text-[#072d2d] text-sm font-semibold mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Your Impact</p>
              <p className="text-[#20593A] font-bold" style={{ fontFamily: "Poppins, sans-serif", fontSize: "36px" }}>
                {calculateStudentsImpacted()}
              </p>
              <p className="text-[#072d2d] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>students empowered with STEM education</p>
            </div>

            {/* Additional Amount */}
            <div className="space-y-3">
              <Label className="text-xs font-semibold text-[#858E80] uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>
                Add a General Contribution (Optional)
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {amountOptions.map((amount) => (
                  <button key={amount} type="button" onClick={() => setSelectedAmount(amount)}
                    className={`py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      selectedAmount === amount ? "bg-[#20593A] text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`} style={{ fontFamily: "Poppins, sans-serif" }}>
                    د.إ{amount}
                  </button>
                ))}
                <button type="button" onClick={() => setSelectedAmount("other")}
                  className={`col-span-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedAmount === "other" ? "bg-[#20593A] text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`} style={{ fontFamily: "Poppins, sans-serif" }}>
                  Other Amount
                </button>
              </div>
              {selectedAmount === "other" && (
                <Input type="number" placeholder="Enter amount" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)}
                  className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }} required />
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-2">
              <h3 className="text-lg text-[#000000] mb-4" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Your Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>First Name *</Label>
                <Input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleChange}
                  className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Last Name *</Label>
                <Input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleChange}
                  className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Email Address *</Label>
              <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="streetAddress" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Street Address *</Label>
              <Input id="streetAddress" name="streetAddress" type="text" required value={formData.streetAddress} onChange={handleChange}
                className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>City *</Label>
                <Input id="city" name="city" type="text" required value={formData.city} onChange={handleChange}
                  className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Country *</Label>
                <Input id="country" name="country" type="text" required value={formData.country} onChange={handleChange} placeholder="Country"
                  className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>State / Province *</Label>
                <Input id="state" name="state" type="text" required value={formData.state} onChange={handleChange}
                  className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>ZIP Code *</Label>
                <Input id="zipCode" name="zipCode" type="text" required value={formData.zipCode} onChange={handleChange}
                  className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Phone (Optional)</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }} />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <Checkbox id="inHonorMemory" checked={formData.inHonorMemory}
                onCheckedChange={(c) => setFormData({ ...formData, inHonorMemory: c as boolean })}
                className="border-[#20593A] data-[state=checked]:bg-[#20593A] data-[state=checked]:border-[#20593A] mt-0.5 rounded-none" />
              <label htmlFor="inHonorMemory" className="cursor-pointer text-[#072d2d] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Make this contribution in honor of or in memory of someone.
              </label>
            </div>
            {formData.inHonorMemory && (
              <Input name="honorName" type="text" value={formData.honorName} onChange={handleChange} placeholder="Name of honoree"
                className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }} />
            )}

            <Button type="submit"
              className="w-full bg-[#20593A] hover:bg-[#072d2d] text-white text-base font-semibold transition-colors duration-300"
              style={{ borderRadius: "12px", padding: "14px 0", fontFamily: "Poppins, sans-serif", fontWeight: 600, marginTop: "8px" }}>
              Continue to Payment
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
