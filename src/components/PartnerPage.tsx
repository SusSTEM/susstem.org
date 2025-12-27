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
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Banner */}
      <div 
        className="text-white py-20 px-6"
        style={{
          background: 'linear-gradient(to bottom right, #072d2d, #0a3b3b, #20593a)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-4xl md:text-4xl mb-6"
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 700,
              letterSpacing: '0.01em'
            }}
          >
            Are you a secondary school ready to bring the SusSTEM programme into your curriculum and champion sustainability?
          </h2>
          <p 
            className="text-xl md:text-2xl opacity-95"
            style={{ 
              fontFamily: 'Poppins, sans-serif',
              maxWidth: '540px',
              margin: '0 auto'
            }}
          >
            Partner with us 🤝 to co-create engaging, real-world STEM learning for your learners.

          </p>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Story/Description */}
          <div className="space-y-6">
            <h2
              className="text-[#000000] text-3xl md:text-4xl"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700
              }}
            >
              Let's Build a Sustainable Future Together!!
            </h2>
            
            <p
              className="text-[#072d2d] text-lg leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              At SusSTEM, we believe that meaningful change starts with education. By partnering with us, you'll join a global network of schools, NGOs, and sustainability-focused organizations committed to empowering children aged 11–18 with the skills they need to solve real-world environmental challenges.
            </p>

            <p
              className="text-[#072d2d] text-lg leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Our hands-on STEM projects—from air quality monitoring systems to smart waste management—teach critical thinking, problem-solving, and environmental stewardship. When you partner with SusSTEM, you're not just supporting a program; you're investing in the next generation of innovators and changemakers who will shape a more sustainable world.
            </p>

            <p
              className="text-[#072d2d] text-lg leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Whether you're an educator looking to bring cutting-edge STEM to your classroom, an organization seeking to amplify your environmental impact, or a professional eager to share your expertise, we'd love to collaborate with you. Together, we can inspire young minds to turn ideas into action.
            </p>

            <div className="pt-4">
              <div className="bg-[#e1e4d8] rounded-2xl p-6">
                <p
                  className="text-[#072d2d] italic"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  "Partnering with SusSTEM has transformed how our students engage with environmental issues. They're not just learning—they're making a real difference in their communities."
                </p>
                <p
                  className="text-[#072d2d] mt-3"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                  — International School Partner
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div>
            <div 
              className="bg-white shadow-lg border border-gray-200"
              style={{ borderRadius: '16px', padding: '32px' }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email - Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="Enter your name"
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
                      placeholder="your@email.com"
                      className="border-[#20593A] focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#a4ff7b]"
                      style={{ 
                        borderRadius: '14px',
                        fontFamily: 'Poppins, sans-serif',
                        padding: '12px 16px'
                      }}
                    />
                  </div>
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
                      className="text-sm text-red-500"
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
      </div>
    </div>
  );
}