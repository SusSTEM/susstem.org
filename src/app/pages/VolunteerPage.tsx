import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Users, Lightbulb, Globe } from "lucide-react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleCountryChange = (country: string) => {
    setFormData((prev) => ({
      ...prev,
      country,
      otherCountry: country !== "Other" ? "" : prev.otherCountry,
    }));
  };

  const handleApplicantTypeChange = (type: string) => {
    setFormData((prev) => ({ ...prev, applicantType: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.interests.length === 0) { alert("Please select at least one volunteering interest"); return; }
    if (!formData.country) { alert("Please select your country of residence"); return; }
    if (formData.country === "Other" && !formData.otherCountry) { alert("Please specify your country"); return; }
    console.log("Volunteer form submitted:", formData);
  };

  const countryOptions = ["UAE", "India", "Other"];
  const applicantTypes = ["Student", "Teacher", "Parent", "Professional", "Other"];
  const volunteeringOptions = ["Workshop Facilitator", "Mentor", "Event Helper", "Logistics", "Not sure yet"];

  return (
    <div className="min-h-screen bg-[#eff2e7]">
      <div
        className="text-white py-18 px-6"
        style={{ background: "linear-gradient(135deg, #072d2d 0%, #0f3d2e 48%, #20593a 100%)" }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center rounded-full border border-[#a4ff7b]/35 bg-[#a4ff7b]/10 px-5 py-2">
            <span className="text-[#a4ff7b] text-sm font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
              Join our volunteer network
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl leading-tight" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
            Turn your skills into real student impact.
          </h1>
          <p className="text-white/82 text-lg md:text-xl max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Help SusSTEM run workshops, mentor students, and grow a community of young sustainability builders.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-14">
        <div className="bg-white rounded-[2rem] shadow-lg border border-[#e5e8df] p-8 md:p-10">
          <h2 className="text-2xl text-[#000000] text-center mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
            Apply to Volunteer
          </h2>
          <p className="text-[#858E80] text-sm text-center mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
            Fill in the form below and our team will be in touch.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Full Name *</Label>
                <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your name"
                  className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{ borderRadius: "14px", fontFamily: "Inter, sans-serif" }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Email *</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com"
                  className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{ borderRadius: "14px", fontFamily: "Inter, sans-serif" }} />
              </div>
            </div>

            <div className="space-y-3">
              <Label style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Country of Residence *</Label>
              <div className="flex flex-wrap gap-3">
                {countryOptions.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleCountryChange(country)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
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
                <Input name="otherCountry" type="text" required value={formData.otherCountry} onChange={handleChange} placeholder="Please specify your country"
                  className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A]"
                  style={{ borderRadius: "14px", fontFamily: "Inter, sans-serif" }} />
              )}
            </div>

            <div className="space-y-3">
              <Label style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>I am a...</Label>
              <div className="flex flex-wrap gap-3">
                {applicantTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleApplicantTypeChange(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
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
              <Label style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>How would you like to help? *</Label>
              <div className="flex flex-wrap gap-3">
                {volunteeringOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleInterestToggle(option)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                      formData.interests.includes(option)
                        ? "bg-[#a4ff7b] text-[#072d2d] border-[#a4ff7b]"
                        : "bg-white text-[#072d2d] border-gray-200 hover:border-[#20593A]"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {formData.interests.length === 0 && (
                <p className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>Please select at least one option</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Anything else? (Optional)</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us a bit about yourself..."
                className="border-gray-200 focus-visible:ring-[#a4ff7b] focus-visible:ring-2 focus-visible:border-[#20593A] min-h-[96px] resize-none"
                style={{ borderRadius: "14px", fontFamily: "Inter, sans-serif" }} />
            </div>

            <Button type="submit"
              className="w-full bg-[#20593A] hover:bg-[#072d2d] text-white text-base font-semibold transition-colors duration-300"
              style={{ borderRadius: "9999px", padding: "14px 0", fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
              Submit Application
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
