import { X } from "lucide-react";
import { NewsletterSignupForm } from "./NewsletterSignupForm";

interface NewsletterPopupProps {
  open: boolean;
  onClose: () => void;
  onSubscribe: (email: string) => void;
}

export function NewsletterPopup({ open, onClose, onSubscribe }: NewsletterPopupProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#072d2d]/65 px-4 py-6 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md rounded-[2rem] bg-white px-6 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:px-8 sm:py-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-popup-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#072d2d] transition hover:bg-[#eff2e7]"
          aria-label="Close newsletter popup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-4 pr-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#20593A]">
            Insider updates
          </p>
          <h2 id="newsletter-popup-title" className="text-3xl font-extrabold leading-tight text-[#072d2d] sm:text-4xl">
            Be in the Know
          </h2>
          <p className="text-sm leading-6 text-[#4f5f59] sm:text-base">
            Newsletters, publications, Events and SusSTEM stories delivered to your inbox.
          </p>
        </div>

        <div className="pt-7">
          <NewsletterSignupForm onSubscribe={onSubscribe} submitLabel="Yes, send me updates" compact />
        </div>
      </div>
    </div>
  );
}