import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ShieldCheck } from "lucide-react";

interface NewsletterSignupFormProps {
  onSubscribe: (email: string) => void;
  submitLabel?: string;
  compact?: boolean;
}

export function NewsletterSignupForm({ onSubscribe, submitLabel = "Sign up", compact = false }: NewsletterSignupFormProps) {
  const [email, setEmail] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const [isPartner, setIsPartner] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    if (!receiveUpdates) {
      alert("Please confirm that you want to receive updates.");
      return;
    }

    onSubscribe(email.trim());
    setEmail("");
    setIsPartner(false);
  };

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-5" : "space-y-6"}>
      <div className="space-y-2">
        <Label htmlFor="newsletter-email" className="text-[#072d2d] text-base font-medium">
          Email Address
        </Label>
        <Input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className="h-14 border-0 border-b border-[#d6ddd3] bg-transparent px-0 text-[#072d2d] shadow-none focus-visible:ring-0 focus-visible:border-[#20593A]"
        />
      </div>

      <div className="space-y-4 pt-2">
        <label className="flex items-start gap-3 text-[#072d2d] cursor-pointer">
          <Checkbox
            checked={receiveUpdates}
            onCheckedChange={(checked) => setReceiveUpdates(Boolean(checked))}
            className="mt-1 border-[#c9d2c4] data-[state=checked]:bg-[#20593A] data-[state=checked]:border-[#20593A]"
          />
          <span className="text-sm leading-6 sm:text-base">
            Yes, I&apos;d like to receive updates from SusSTEM.
          </span>
        </label>

        <label className="flex items-start gap-3 text-[#072d2d] cursor-pointer">
          <Checkbox
            checked={isPartner}
            onCheckedChange={(checked) => setIsPartner(Boolean(checked))}
            className="mt-1 border-[#c9d2c4] data-[state=checked]:bg-[#20593A] data-[state=checked]:border-[#20593A]"
          />
          <span className="text-sm leading-6 sm:text-base">
            I am a community-based organization, past or current partner.
          </span>
        </label>
      </div>

      <div className="rounded-2xl border border-[#d9e2d5] bg-[#f7f9f4] px-4 py-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-[#20593A]" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#072d2d]">Protected by reCAPTCHA</p>
            <p className="text-xs leading-5 text-[#62706a]">
              Replace this note with your live Google reCAPTCHA widget and site key before launch.
            </p>
            <p className="text-xs leading-5 text-[#8a938c]">
              Keep the checkbox, privacy policy, and terms text visible in the finished version.
            </p>
          </div>
        </div>
      </div>

      <input
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        name="newsletter-honeypot"
        type="text"
        value=""
        readOnly
      />

      <Button
        type="submit"
        className="w-full rounded-full bg-[#ffd459] px-8 py-6 text-lg font-semibold text-[#072d2d] shadow-none transition-colors hover:bg-[#f2c94c]"
      >
        {submitLabel}
      </Button>
    </form>
  );
}