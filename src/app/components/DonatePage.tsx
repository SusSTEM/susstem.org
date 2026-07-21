import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function DonatePage() {
  const [currency, setCurrency] = useState("AED");
  const [frequency, setFrequency] = useState("one-time");
  const [selectedAmount, setSelectedAmount] = useState(200);
  const [customAmount, setCustomAmount] = useState("");
  
  // Kit quantities
  const [explorerKitQty, setExplorerKitQty] = useState(1);
  const [innovatorKitQty, setInnovatorKitQty] = useState(1);
  const [changemakerKitQty, setChangemakerKitQty] = useState(1);
  const [volunteerQty, setVolunteerQty] = useState(1);
  
  // Kit prices in AED
  const kitPrices = {
    explorer: 100,
    innovator: 200,
    changemaker: 600,
    volunteer: 400
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

  const amountOptions = [50, 100, 150, 200, 400];
  
  // Calculate total impact
  const calculateStudentsImpacted = () => {
    return (explorerKitQty * 1) + (innovatorKitQty * 1) + (changemakerKitQty * 5);
  };

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
              Your donations drive our mission forward. With your support, we create a meaningful impact.
            </h2>
            <p
              className="text-xl md:text-2xl opacity-95"
              style={{
                fontFamily: "Poppins, sans-serif",
                maxWidth: "540px",
                margin: "0 auto",
              }}
            >
              Your gift 🎁 reaches a child that is too often overlooked.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column (order-2 on mobile, order-1 on desktop) */}
            <div className="order-2 md:order-1 space-y-6">
              <h2
                className="text-[#000000] text-3xl md:text-4xl"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700
                }}
              >
                Every donation you make writes a new story...
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
                    — Dr. Kaustubh Rajendara Singh
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <div className="bg-[#e1e4d8] rounded-2xl p-6">
                  <p
                    className="text-[#072d2d] italic"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    "I chose to support SusSTEM because they empower students to be part of the solution, not just observers of the problem. Seeing how my donation provides the tools for these young people to tackle real environmental issues is truly inspiring. They aren't just the leaders of tomorrow; they are making a difference today."
                  </p>
                  <p
                    className="text-[#072d2d] mt-3"
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                  >
                    — Anonymous Donor
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <div className="bg-[#e1e4d8] rounded-2xl p-6">
                  <p
                    className="text-[#072d2d] italic"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    "What I love about SusSTEM is that it bridges the gap between 'learning' and 'doing.' Your donation doesn't just sit in a classroom; it puts tools into the hands of students who are ready to build a better planet. It's a powerful feeling to know your support is directly launching the next generation of environmental innovators."
                  </p>
                  <p
                    className="text-[#072d2d] mt-3"
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                  >
                    — Hindh Al Mubarak
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Donation Form (order-1 on mobile, order-2 on desktop) */}
            <div className="order-1 md:order-2">
              <div 
                className="bg-white shadow-lg border border-gray-200"
                style={{ borderRadius: '16px', padding: '32px' }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Donation Kits Section */}
                  <div>
                    <div 
                      className="mb-3 text-xs tracking-wider"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        color: '#64748B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      DONATE LEARNING KITS
                    </div>
                    
                    <div className="space-y-4">
                      {/* Explorer Kit */}
                      <div className="bg-[#a2bb65]/80 rounded-xl p-5 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 
                              className="text-[#000000] mb-1"
                              style={{ 
                                fontFamily: 'Poppins, sans-serif', 
                                fontWeight: 600,
                                fontSize: '16px'
                              }}
                            >
                              Explorer Kit (Level 1)
                            </h4>
                            <p 
                              className="text-[#072d2d] text-sm"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Introductory kit for beginners learning basic electronics and environmental sensors
                            </p>
                          </div>
                          <div 
                            className="text-[#20593A] ml-4"
                            style={{ 
                              fontFamily: 'Poppins, sans-serif', 
                              fontWeight: 700,
                              fontSize: '18px'
                            }}
                          >
                            د.إ{kitPrices.explorer}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Label 
                            htmlFor="explorerKitQty"
                            className="text-sm"
                            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
                          >
                            Number of kits:
                          </Label>
                          <Select 
                            value={explorerKitQty.toString()} 
                            onValueChange={(value) => setExplorerKitQty(parseInt(value))}
                          >
                            <SelectTrigger 
                              id="explorerKitQty" 
                              className="w-32 border-[#20593A] focus:ring-[#a4ff7b]"
                              style={{ borderRadius: '10px', fontFamily: 'Poppins, sans-serif' }}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(50)].map((_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                              <SelectItem value="50+">50+</SelectItem>
                            </SelectContent>
                          </Select>
                          <div 
                            className="ml-auto text-[#20593A]"
                            style={{ 
                              fontFamily: 'Poppins, sans-serif', 
                              fontWeight: 600
                            }}
                          >
                            Total: د.إ{kitPrices.explorer * explorerKitQty}
                          </div>
                        </div>
                      </div>

                      {/* Innovator Kit */}
                      <div className="bg-[#ffd459]/80 rounded-xl p-5 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 
                              className="text-[#000000] mb-1"
                              style={{ 
                                fontFamily: 'Poppins, sans-serif', 
                                fontWeight: 600,
                                fontSize: '16px'
                              }}
                            >
                              Innovator Kit (Level 2)
                            </h4>
                            <p 
                              className="text-[#072d2d] text-sm"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Individual student kit for building DIY solutions to community sustainability problems
                            </p>
                          </div>
                          <div 
                            className="text-[#20593A] ml-4"
                            style={{ 
                              fontFamily: 'Poppins, sans-serif', 
                              fontWeight: 700,
                              fontSize: '18px'
                            }}
                          >
                            د.إ{kitPrices.innovator}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Label 
                            htmlFor="innovatorKitQty"
                            className="text-sm"
                            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
                          >
                            Number of kits:
                          </Label>
                          <Select 
                            value={innovatorKitQty.toString()} 
                            onValueChange={(value) => setInnovatorKitQty(parseInt(value))}
                          >
                            <SelectTrigger 
                              id="innovatorKitQty" 
                              className="w-32 border-[#20593A] focus:ring-[#a4ff7b]"
                              style={{ borderRadius: '10px', fontFamily: 'Poppins, sans-serif' }}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(50)].map((_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                              <SelectItem value="50+">50+</SelectItem>
                            </SelectContent>
                          </Select>
                          <div 
                            className="ml-auto text-[#20593A]"
                            style={{ 
                              fontFamily: 'Poppins, sans-serif', 
                              fontWeight: 600
                            }}
                          >
                            Total: د.إ{kitPrices.innovator * innovatorKitQty}
                          </div>
                        </div>
                      </div>

                      {/* Changemaker Kit */}
                      <div className="bg-[#ff9b69] rounded-xl p-5 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 
                              className="text-[#000000] mb-1"
                              style={{ 
                                fontFamily: 'Poppins, sans-serif', 
                                fontWeight: 600,
                                fontSize: '16px'
                              }}
                            >
                              Changemaker Kit (Level 3)
                            </h4>
                            <p 
                              className="text-[#072d2d] text-sm"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Advanced team kit (serves 5 students) for creating real-world environmental prototypes
                            </p>
                          </div>
                          <div 
                            className="text-[#20593A] ml-4"
                            style={{ 
                              fontFamily: 'Poppins, sans-serif', 
                              fontWeight: 700,
                              fontSize: '18px'
                            }}
                          >
                            د.إ{kitPrices.changemaker}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Label 
                            htmlFor="changemakerKitQty"
                            className="text-sm"
                            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
                          >
                            Number of kits:
                          </Label>
                          <Select 
                            value={changemakerKitQty.toString()} 
                            onValueChange={(value) => setChangemakerKitQty(parseInt(value))}
                          >
                            <SelectTrigger 
                              id="changemakerKitQty" 
                              className="w-32 border-[#20593A] focus:ring-[#a4ff7b]"
                              style={{ borderRadius: '10px', fontFamily: 'Poppins, sans-serif' }}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(20)].map((_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                              <SelectItem value="20+">20+</SelectItem>
                            </SelectContent>
                          </Select>
                          <div 
                            className="ml-auto text-[#20593A]"
                            style={{ 
                              fontFamily: 'Poppins, sans-serif', 
                              fontWeight: 600
                            }}
                          >
                            Total: د.إ{kitPrices.changemaker * changemakerKitQty}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sponsor Volunteers Section */}
                  <div>
                    <div 
                      className="mb-3 text-xs tracking-wider"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        color: '#64748B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      SPONSOR VOLUNTEERS
                    </div>
                    
                    <div className="bg-[#bcb0fa] rounded-xl p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 
                            className="text-[#000000] mb-1"
                            style={{ 
                              fontFamily: 'Poppins, sans-serif', 
                              fontWeight: 600,
                              fontSize: '16px'
                            }}
                          >
                            Sponsor a Volunteer/Educator
                          </h4>
                          <p 
                            className="text-[#072d2d] text-sm"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Support trained volunteers who mentor students, teach workshops, and guide teams through their sustainability projects
                          </p>
                        </div>
                        <div 
                          className="text-[#20593A] ml-4"
                          style={{ 
                            fontFamily: 'Poppins, sans-serif', 
                            fontWeight: 700,
                            fontSize: '18px'
                          }}
                        >
                          د.إ{kitPrices.volunteer}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Label 
                          htmlFor="volunteerQty"
                          className="text-sm"
                          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
                        >
                          Number of volunteers to sponsor:
                        </Label>
                        <Select 
                          value={volunteerQty.toString()} 
                          onValueChange={(value) => setVolunteerQty(parseInt(value))}
                        >
                          <SelectTrigger 
                            id="volunteerQty" 
                            className="w-32 border-[#20593A] focus:ring-[#a4ff7b]"
                            style={{ borderRadius: '10px', fontFamily: 'Poppins, sans-serif' }}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1}
                              </SelectItem>
                            ))}
                            <SelectItem value="10+">10+</SelectItem>
                          </SelectContent>
                        </Select>
                        <div 
                          className="ml-auto text-[#20593A]"
                          style={{ 
                            fontFamily: 'Poppins, sans-serif', 
                            fontWeight: 600
                          }}
                        >
                          Total: د.إ{kitPrices.volunteer * volunteerQty}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Counter */}
                  <div>
                    <div className="bg-[#a4ff7b]/20 border-2 border-[#a4ff7b] rounded-xl p-4">
                      <div className="text-center">
                        <p 
                          className="text-[#072d2d] mb-1"
                          style={{ 
                            fontFamily: 'Poppins, sans-serif', 
                            fontWeight: 600,
                            fontSize: '14px'
                          }}
                        >
                          Your Impact
                        </p>
                        <p 
                          className="text-[#20593A]"
                          style={{ 
                            fontFamily: 'Poppins, sans-serif', 
                            fontWeight: 700,
                            fontSize: '32px'
                          }}
                        >
                          {calculateStudentsImpacted()}
                        </p>
                        <p 
                          className="text-[#072d2d] text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          students empowered with STEM education
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div className="space-y-3">
                    <Label 
                      style={{ 
                        fontFamily: 'Inter, sans-serif', 
                        fontWeight: 500,
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#64748B'
                      }}
                    >
                      CHOOSE AMOUNT
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
                          د.إ{amount}
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
