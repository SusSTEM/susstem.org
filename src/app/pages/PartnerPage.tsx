import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleCountryToggle = (country: string) => {
    setFormData((prev) => ({
      ...prev,
      country: prev.country === country ? "" : country,
      otherCountry: country !== "Other" ? "" : prev.otherCountry,
    }));
  };

  const handleApplicantTypeToggle = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      applicantType: prev.applicantType === type ? "" : type,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partner form submitted:", formData);
  };

  const countryOptions = ["UAE", "India", "Other"];
  const applicantTypes = [
    "Student",
    "Teacher",
    "Parent",
    "Professional",
    "Other",
  ];
  const partnerOptions = [
    "Workshop Facilitator",
    "Mentor",
    "Event Helper",
    "Logistics",
    "Not sure yet",
  ];

  return (
    <div className="min-h-screen bg-[#eff2e7]">
      <div
        className="text-white py-16 px-6"
        style={{
          background:
            "linear-gradient(135deg, #072d2d 0%, #0f3d2e 50%, #20593a 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-3xl md:text-4xl mb-3 leading-tight font-bold"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Are you a Secondary School ready to integrate the SusSTEM programme into your curriculum?
          </h1>
          <p
            className="text-white/80 text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Partner with us 🤝 to bring SusSTEM and its volunteers to your school.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
          <h2
            className="text-2xl text-[#000000] mb-2 text-center font-bold"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Get in Touch
          </h2>
          <p
            className="text-[#072d2d] text-base mb-6 text-center"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Tell us about your school or organisation and we'll reach out to
            discuss next steps.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
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
                  placeholder="Your name"
                  className="border-gray-200 focus-visible:ring-[#20593A] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{
                    borderRadius: "14px",
                    fontFamily: "Inter, sans-serif",
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="border-gray-200 focus-visible:ring-[#20593A] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{
                    borderRadius: "14px",
                    fontFamily: "Inter, sans-serif",
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Country *
              </Label>
              <div className="flex flex-wrap gap-3">
                {countryOptions.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleCountryToggle(country)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                      formData.country === country
                        ? "bg-[#20593A] text-white border-[#20593A]"
                        : "bg-white text-[#072d2d] border-gray-200 hover:border-[#20593A]"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {country}
                  </button>
                ))}
              </div>
              {formData.country === "Other" && (
                <Input
                  name="otherCountry"
                  type="text"
                  required
                  value={formData.otherCountry}
                  onChange={handleChange}
                  placeholder="Please specify your country"
                  className="border-gray-200 focus-visible:ring-[#20593A] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{
                    borderRadius: "14px",
                    fontFamily: "Inter, sans-serif",
                  }}
                />
              )}
            </div>

            <div className="space-y-3">
              <Label
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                I am a...
              </Label>
              <div className="flex flex-wrap gap-3">
                {applicantTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleApplicantTypeToggle(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                      formData.applicantType === type
                        ? "bg-[#20593A] text-white border-[#20593A]"
                        : "bg-white text-[#072d2d] border-gray-200 hover:border-[#20593A]"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                How would you like to partner? *
              </Label>
              <div className="flex flex-wrap gap-3">
                {partnerOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleInterestToggle(option)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                      formData.interests.includes(option)
                        ? "bg-[#20593A] text-white border-[#20593A]"
                        : "bg-white text-[#072d2d] border-gray-200 hover:border-[#20593A]"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {formData.interests.length === 0 && (
                <p
                  className="text-xs text-red-500"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Please select at least one option
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Anything else? (Optional)
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your school or organisation..."
                className="border-gray-200 focus-visible:ring-[#20593A] focus-visible:ring-2 focus-visible:border-[#20593A] min-h-[96px] resize-none"
                style={{
                  borderRadius: "14px",
                  fontFamily: "Inter, sans-serif",
                }}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#20593A] hover:bg-[#072d2d] text-white text-lg font-bold py-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer disabled:opacity-50"
              style={{ fontFamily: "Poppins, sans-serif" }}
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