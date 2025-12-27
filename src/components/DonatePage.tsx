import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

export function DonatePage() {
  const [currency, setCurrency] = useState("USD");
  const [frequency, setFrequency] = useState("one-time");
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAmountSelect = (amount: number | string) => {
    if (amount === "other") {
      setSelectedAmount("other");
    } else {
      setSelectedAmount(amount as number);
      setCustomAmount("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const donationAmount = selectedAmount === "other" ? customAmount : selectedAmount;
    
    console.log("Donation form submitted:", {
      amount: donationAmount,
      currency,
      frequency,
      ...formData,
    });
  };

  const amountOptions = [15, 20, 30, 50, 100];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="relative">
        {/* Hero Banner */}
        <div
          className="text-white py-20 px-6"
          style={{
            background:
              "linear-gradient(to bottom right, #072d2d, #0a3b3b, #20593a)",
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-4xl md:text-4xl mb-6"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.01em",
              }}
            >
              Your commitment drives our mission forward. With your support, we create a meaningful impact.
            </h2>
            <p
              className="text-xl md:text-2xl opacity-95"
              style={{
                fontFamily: "Poppins, sans-serif",
                maxWidth: "540px",
                margin: "0 auto",
              }}
            >
              Your gift 🎁 reaches communities that are too often overlooked.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column */}
            <div className="space-y-6">
              <h2
                className="text-[#000000] text-3xl md:text-4xl"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700
                }}
              >
                Invest in the Next Generation of Changemakers
              </h2>
              
              <p
                className="text-[#072d2d] text-lg leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                At SusSTEM, we believe every child deserves access to quality STEM education that empowers them to tackle the world's most pressing environmental challenges. Your donation directly supports hands-on learning experiences that transform students into problem-solvers and innovators.
              </p>
        
              <p
                className="text-[#072d2d] text-lg leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                From building air quality monitors to designing smart waste management systems, our programs give students aged 11–18 the tools and knowledge to create real-world solutions. With your support, we can reach more schools, provide more resources, and inspire more young minds to build a sustainable future.
              </p>
        
              <p
                className="text-[#072d2d] text-lg leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Whether you choose to give once or become a monthly supporter, every contribution makes a difference. Your generosity helps us provide materials, mentorship, and meaningful learning opportunities to students who will shape tomorrow's world.
              </p>
        
              <div className="pt-4">
                <div className="bg-[#e1e4d8] rounded-2xl p-6">
                  <p
                    className="text-[#072d2d] italic"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    "Supporting SusSTEM means investing in students who don't just learn about environmental challenges—they actively solve them. It's incredible to see how far your donation can go in empowering these young innovators."
                  </p>
                  <p
                    className="text-[#072d2d] mt-3"
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                  >
                    — SusSTEM Donor & Supporter
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Donation Form */}
            <div>
              <div 
                className="bg-white shadow-lg border border-gray-200"
                style={{ borderRadius: '16px', padding: '32px' }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Currency Selector */}
                  <div className="space-y-2">
                    <Label 
                      style={{ 
                        fontFamily: 'Poppins, sans-serif', 
                        fontWeight: 600,
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: '#6B7280'
                      }}
                    >
                      Currency
                    </Label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrency("USD")}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                          currency === "USD"
                            ? "bg-[#20593A] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        USD
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency("GBP")}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                          currency === "GBP"
                            ? "bg-[#20593A] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        GBP
                      </button>
                    </div>
                  </div>

                  {/* Frequency Toggle */}
                  <div className="space-y-2">
                    <Label 
                      style={{ 
                        fontFamily: 'Poppins, sans-serif', 
                        fontWeight: 600,
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: '#6B7280'
                      }}
                    >
                      Frequency
                    </Label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFrequency("one-time")}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                          frequency === "one-time"
                            ? "bg-[#20593A] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        One Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency("monthly")}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                          frequency === "monthly"
                            ? "bg-[#20593A] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div className="space-y-3">
                    <Label 
                      style={{ 
                        fontFamily: 'Poppins, sans-serif', 
                        fontWeight: 600,
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: '#6B7280'
                      }}
                    >
                      Choose Amount
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {amountOptions.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleAmountSelect(amount)}
                          className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                            selectedAmount === amount
                              ? "bg-[#20593A] text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          ${amount}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAmountSelect("other")}
                        className={`col-span-3 py-3 px-4 rounded-lg font-semibold transition-all ${
                          selectedAmount === "other"
                            ? "bg-[#20593A] text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Other Amount
                      </button>
                    </div>
                    
                    {selectedAmount === "other" && (
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                        style={{ 
                          borderRadius: '14px',
                          fontFamily: 'Poppins, sans-serif',
                          padding: '12px 16px'
                        }}
                        required
                      />
                    )}
                  </div>

                  {/* Your Information Header */}
                  <div className="pt-4">
                    <h3 
                      className="text-lg text-[#000000] mb-4"
                      style={{ 
                        fontFamily: 'Poppins, sans-serif', 
                        fontWeight: 600 
                      }}
                    >
                      Your Information
                    </h3>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label 
                        htmlFor="firstName" 
                        style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                      >
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                        style={{ 
                          borderRadius: '14px',
                          fontFamily: 'Poppins, sans-serif',
                          padding: '12px 16px'
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label 
                        htmlFor="lastName"
                        style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                      >
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                        style={{ 
                          borderRadius: '14px',
                          fontFamily: 'Poppins, sans-serif',
                          padding: '12px 16px'
                        }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="email"
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                      style={{ 
                        borderRadius: '14px',
                        fontFamily: 'Poppins, sans-serif',
                        padding: '12px 16px'
                      }}
                    />
                  </div>

                  {/* Street Address */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="streetAddress"
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      Street Address *
                    </Label>
                    <Input
                      id="streetAddress"
                      name="streetAddress"
                      type="text"
                      required
                      value={formData.streetAddress}
                      onChange={handleChange}
                      className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                      style={{ 
                        borderRadius: '14px',
                        fontFamily: 'Poppins, sans-serif',
                        padding: '12px 16px'
                      }}
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="city"
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      City *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                      style={{ 
                        borderRadius: '14px',
                        fontFamily: 'Poppins, sans-serif',
                        padding: '12px 16px'
                      }}
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="country"
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      Country *
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      type="text"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                      style={{ 
                        borderRadius: '14px',
                        fontFamily: 'Poppins, sans-serif',
                        padding: '12px 16px'
                      }}
                    />
                  </div>

                  {/* State and ZIP */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label 
                        htmlFor="state"
                        style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                      >
                        State/Province *
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        type="text"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                        style={{ 
                          borderRadius: '14px',
                          fontFamily: 'Poppins, sans-serif',
                          padding: '12px 16px'
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label 
                        htmlFor="zipCode"
                        style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                      >
                        ZIP Code *
                      </Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                        style={{ 
                          borderRadius: '14px',
                          fontFamily: 'Poppins, sans-serif',
                          padding: '12px 16px'
                        }}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="phone"
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                      style={{ 
                        borderRadius: '14px',
                        fontFamily: 'Poppins, sans-serif',
                        padding: '12px 16px'
                      }}
                    />
                  </div>

                  {/* Donation Options Header */}
                  <div className="pt-4">
                    <h3 
                      className="text-lg text-[#000000] mb-4"
                      style={{ 
                        fontFamily: 'Poppins, sans-serif', 
                        fontWeight: 600 
                      }}
                    >
                      Donation Options
                    </h3>
                  </div>

                  {/* Honor/Memory Checkbox */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="inHonorMemory"
                        checked={formData.inHonorMemory}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, inHonorMemory: checked as boolean })
                        }
                        className="border-[#20593A] data-[state=checked]:bg-[#20593A] data-[state=checked]:border-[#20593A] w-5 h-5 rounded-none"
                      />
                      <label
                        htmlFor="inHonorMemory"
                        className="cursor-pointer text-[#000000]"
                        style={{ 
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '15px'
                        }}
                      >
                        I would like to make a donation in honor of or in memory of someone.
                      </label>
                    </div>

                    {formData.inHonorMemory && (
                      <Input
                        name="honorName"
                        type="text"
                        value={formData.honorName}
                        onChange={handleChange}
                        placeholder="Name of honoree"
                        className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                        style={{ 
                          borderRadius: '14px',
                          fontFamily: 'Poppins, sans-serif',
                          padding: '12px 16px'
                        }}
                      />
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    className="w-full bg-[#20593A] hover:bg-[#a2bb65] text-white transition-colors"
                    style={{
                      borderRadius: '14px',
                      padding: '15px 0',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      marginTop: '24px'
                    }}
                  >
                    Continue to Payment
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
