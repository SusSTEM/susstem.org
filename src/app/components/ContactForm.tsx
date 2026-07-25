import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  defaultSubject?: string;
}

export function ContactForm({ defaultSubject = "SusSTEM enquiry" }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: defaultSubject,
    message: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      "",
      formData.message,
    ].join("\n");

    window.location.href = `mailto:hello@susstem.org?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 rounded-3xl bg-white p-5 sm:p-6 md:p-8 shadow-[0_18px_50px_rgba(7,45,45,0.12)] border border-[#e1e4d9]">
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            className="h-12 sm:h-12 rounded-xl border-[#dbe4d3]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            className="h-12 sm:h-12 rounded-xl border-[#dbe4d3]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
          Subject
        </Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="h-12 sm:h-12 rounded-xl border-[#dbe4d3]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what you need help with..."
          className="min-h-[160px] rounded-xl border-[#dbe4d3] resize-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-xl bg-[#20593A] py-5 text-base sm:text-lg font-semibold text-white hover:bg-[#072d2d]"
      >
        Send Message
      </Button>
    </form>
  );
}