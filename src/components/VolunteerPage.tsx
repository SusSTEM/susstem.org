import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    otherCountry: "",
    applicantType: "",
    interests: [] as string[],
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleCountryChange = (country: string) => {
    setFormData((prev) => ({
      ...prev,
      country: country,
      otherCountry: country !== "Other" ? "" : prev.otherCountry,
    }));
  };

  const handleApplicantTypeChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      applicantType: type,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (formData.interests.length === 0) {
      alert("Please select at least one volunteering interest");
      return;
    }
    
    if (!formData.country) {
      alert("Please select your country of residence");
      return;
    }
    
    if (formData.country === "Other" && !formData.otherCountry) {
      alert("Please specify your country");
      return;
    }
    
    console.log("Volunteer form submitted:", formData);
  };

  const countryOptions = ["UAE", "India", "Other"];
  const applicantTypes = [
    "Student",
    "Teacher",
    "Parent",
    "Professional",
    "Other",
  ];
  const volunteeringOptions = [
    "Workshop Facilitator",
    "Mentor",
    "Event Helper",
    "Logistics",
    "Not sure yet",
  ];

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
             Youth everywhere deserve equal chances to tackle global sustainability challenges — your support makes that possible.
            </h2>
            <p
              className="text-xl md:text-2xl opacity-95"
              style={{
                fontFamily: "Poppins, sans-serif",
                maxWidth: "540px",
                margin: "0 auto",
              }}
            >
              Join us as a volunteer 🙋🏻‍♀️ and help turn this vision into reality
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
                  This is your moment to shape the future — and it starts with the next generation.
                </h2>
                
                <p
                  className="text-[#072d2d] text-lg leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Right now, young people aged 11–18 are watching environmental challenges unfold in real time. Rising temperatures. Pollution in their neighborhoods. Waste overwhelming their cities. They see the problems clearly — but they need the tools, mentorship, and confidence to solve them.
                </p>
          
                <p
                  className="text-[#072d2d] text-lg leading-relaxed"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400    
                  }}
                >
                  That's where you come in
                </p> 
                
                <p
                  className="text-[#072d2d] text-lg leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Our hands-on STEM projects—from air quality monitoring systems to smart waste management—teach critical thinking, problem-solving, and environmental stewardship. When you volunteer with SusSTEM, you're not just giving your time; you're directly shaping the next generation of innovators and changemakers who will create a more sustainable world.
                </p>
          
                <p
                  className="text-[#072d2d] text-lg leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Whether you're a STEM professional eager to mentor young minds, an environmental enthusiast looking to share your passion, or simply someone who wants to make a tangible impact, we'd love to have you on our team. Together, we can inspire students to turn ideas into action and drive real change in their communities.
                </p>
          
                <div className="pt-4">
                  <div className="bg-[#e1e4d8] rounded-2xl p-6">
                    <p
                      className="text-[#072d2d] italic"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      "Volunteering with SusSTEM has been incredibly rewarding. Seeing students light up as they build solutions to environmental problems reminds me why this work matters."
                    </p>
                    <p
                      className="text-[#072d2d] mt-3"
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      — SusSTEM Volunteer Mentor
                    </p>
                  </div>
                </div>
              </div>

            {/* Right Column - Form */}
            <div>
              <div 
                className="bg-white shadow-lg border border-gray-200"
                style={{ borderRadius: '16px', padding: '32px' }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  {/* Country */}
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
                            onCheckedChange={() => handleCountryChange(country)}
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

                  {/* Applicant Type */}
                  <div className="space-y-3">
                    <Label 
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      I want to volunteer with SusSTEM as...
                    </Label>
                    <div className="flex flex-col gap-3">
                      {applicantTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-3">
                          <Checkbox
                            id={`type-${type}`}
                            checked={formData.applicantType === type}
                            onCheckedChange={() => handleApplicantTypeChange(type)}
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
                  
                  {/* Interests */}
                  <div className="space-y-3">
                    <Label 
                      style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    >
                      How would you like to help? *
                    </Label>
                    <div className="flex flex-col gap-3">
                      {volunteeringOptions.map((option) => (
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

                  {/* Message */}
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

                  {/* Submit */}
                  <Button 
                    type="submit"
                    className="w-full bg-[#20593A] hover:bg-[#a2bb65] text-white transition-colors"
                    style={{
                      borderRadius: '14px',
                      padding: '15px 0',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    Submit Application
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