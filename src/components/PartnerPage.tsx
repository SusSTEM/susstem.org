import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

export function PartnerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    otherCountry: "",
    applicantType: "",
    interests: [] as string[],
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleCountryToggle = (country: string) => {
    setFormData(prev => ({
      ...prev,
      country: prev.country === country ? "" : country,
      otherCountry: country !== "Other" ? "" : prev.otherCountry
    }));
  };

  const handleApplicantTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      applicantType: prev.applicantType === type ? "" : type
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partner form submitted:", formData);
    // Handle form submission here
  };

  const countryOptions = ["UAE", "India", "Other"];
  const applicantTypes = ["Student", "Teacher", "Parent", "Professional", "Other"];
  const partnerOptions = [
    "Workshop Facilitator",
    "Mentor",
    "Event Helper",
    "Logistics",
    "Not sure yet"
  ];

  return (
    <div className="min-h-screen bg-[#eff2e7]">
      {/* Hero Banner */}
      <div 
        className="text-white py-20 px-6"
        style={{
          background: 'linear-gradient(to bottom right, #072d2d, #0a3b3b, #20593a)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="text-5xl md:text-6xl mb-6"
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 700,
              letterSpacing: '0.01em'
            }}
          >
            Partner with Us
          </h1>
          <p 
            className="text-xl md:text-2xl opacity-95"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              maxWidth: '540px',
              margin: '0 auto'
            }}
          >
            Join our community of educators and changemakers inspiring the next generation through hands-on STEM learning.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-[540px] mx-auto px-4 py-16">
        <div 
          className="bg-white shadow-lg p-7 md:p-8"
          style={{ borderRadius: '24px' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label 
                htmlFor="name" 
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                style={{ 
                  borderRadius: '14px',
                  fontFamily: 'Poppins, sans-serif',
                  padding: '12px 16px'
                }}
              />
            </div>

            {/* Email Address */}
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
                placeholder="your.email@example.com"
                className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                style={{ 
                  borderRadius: '14px',
                  fontFamily: 'Poppins, sans-serif',
                  padding: '12px 16px'
                }}
              />
            </div>

            {/* Country of Residence */}
            <div className="space-y-3">
              <Label 
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                Country of Residence *
              </Label>
              <div className="flex flex-col gap-3">
                {countryOptions.map((country) => (
                  <div key={country} className="flex items-center space-x-3">
                    <Checkbox
                      id={`country-${country}`}
                      checked={formData.country === country}
                      onCheckedChange={() => handleCountryToggle(country)}
                      className="border-[#20593A] data-[state=checked]:bg-[#20593A] data-[state=checked]:border-[#20593A] w-5 h-5 rounded-none"
                    />
                    <label
                      htmlFor={`country-${country}`}
                      className="cursor-pointer text-[#000000]"
                      style={{ 
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '15px'
                      }}
                    >
                      {country}
                    </label>
                  </div>
                ))}
              </div>
              
              {/* Show text input when "Other" is selected */}
              {formData.country === "Other" && (
                <div className="mt-3">
                  <Input
                    name="otherCountry"
                    type="text"
                    required
                    value={formData.otherCountry}
                    onChange={handleChange}
                    placeholder="Please specify your country"
                    className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                    style={{ 
                      borderRadius: '14px',
                      fontFamily: 'Poppins, sans-serif',
                      padding: '12px 16px'
                    }}
                  />
                </div>
              )}
            </div>

            {/* I'm a... */}
            <div className="space-y-3">
              <Label 
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                I want to partner with SusSTEM as...
              </Label>
              <div className="flex flex-col gap-3">
                {applicantTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-3">
                    <Checkbox
                      id={`type-${type}`}
                      checked={formData.applicantType === type}
                      onCheckedChange={() => handleApplicantTypeToggle(type)}
                      className="border-[#20593A] data-[state=checked]:bg-[#20593A] data-[state=checked]:border-[#20593A] w-5 h-5 rounded-none"
                    />
                    <label
                      htmlFor={`type-${type}`}
                      className="cursor-pointer text-[#000000]"
                      style={{ 
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '15px'
                      }}
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Label 
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                How would you like to help? *
              </Label>
              <div className="flex flex-col gap-3">
                {partnerOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <Checkbox
                      id={option}
                      checked={formData.interests.includes(option)}
                      onCheckedChange={() => handleInterestToggle(option)}
                      className="border-[#20593A] data-[state=checked]:bg-[#20593A] data-[state=checked]:border-[#20593A] w-5 h-5 rounded-none"
                    />
                    <label
                      htmlFor={option}
                      className="cursor-pointer text-[#000000]"
                      style={{ 
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '15px'
                      }}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {formData.interests.length === 0 && (
                <p 
                  className="text-sm text-[#858E80]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Please select at least one option
                </p>
              )}
            </div>

            {/* Anything else? */}
            <div className="space-y-2">
              <Label 
                htmlFor="message"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                Anything else? (Optional)
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more if you'd like!"
                className="border-[#20593A] bg-[#f5fbf7] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b] min-h-[96px] resize-none"
                style={{ 
                  borderRadius: '14px',
                  fontFamily: 'Poppins, sans-serif',
                  padding: '12px 16px'
                }}
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full bg-[#20593A] hover:bg-[#a2bb65] text-white transition-colors"
              style={{
                borderRadius: '14px',
                padding: '15px 0',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600
              }}
              disabled={formData.interests.length === 0}
            >
              Submit Application
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
