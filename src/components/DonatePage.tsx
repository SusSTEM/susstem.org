import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

export function DonatePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Donation form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#eff2e7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#072d2d] via-[#0a3b3b] to-[#20593a] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl mb-6 font-[Poppins,sans-serif]"
            style={{ fontWeight: 600 }}
          >
            Make a Difference
          </h1>
          <p className="text-xl md:text-2xl font-[Inter,sans-serif] opacity-95 max-w-3xl mx-auto">
            Your donation helps us provide hands-on STEM education to children
            worldwide, building a sustainable future together.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-[Poppins,sans-serif]" style={{ fontWeight: 600 }}>
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="rounded-xl border-gray-300 focus:border-[#a2bb65] focus:ring-[#a2bb65] font-[Inter,sans-serif]"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-[Poppins,sans-serif]" style={{ fontWeight: 600 }}>
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="rounded-xl border-gray-300 focus:border-[#a2bb65] focus:ring-[#a2bb65] font-[Inter,sans-serif]"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization" className="font-[Poppins,sans-serif]" style={{ fontWeight: 600 }}>
                Organization (Optional)
              </Label>
              <Input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                className="rounded-xl border-gray-300 focus:border-[#a2bb65] focus:ring-[#a2bb65] font-[Inter,sans-serif]"
                placeholder="Your company or organization"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-[Poppins,sans-serif]" style={{ fontWeight: 600 }}>
                Message (Optional)
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="rounded-xl border-gray-300 focus:border-[#a2bb65] focus:ring-[#a2bb65] min-h-[150px] font-[Inter,sans-serif]"
                placeholder="Any message or questions you'd like to share..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#20593A] hover:bg-[#a2bb65] text-white py-6 rounded-xl transition-colors font-[Poppins,sans-serif] text-lg"
              style={{ fontWeight: 600 }}
            >
              Continue to Payment
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
