import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "../components/ContactForm";

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  return (
    <div className="bg-[#eff2e7]">
      <section className="bg-[#072d2d] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm sm:text-base uppercase tracking-[0.2em] text-[#a4ff7b]">
              Contact SusSTEM
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
              Reach Out
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/80">
              Send a message and we’ll get back to you about workshops, school partnerships, or how to get involved.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-start">
          <ContactForm defaultSubject="SusSTEM website enquiry" />

          <aside className="space-y-4 sm:space-y-5 rounded-3xl bg-white p-5 sm:p-6 md:p-8 shadow-[0_18px_50px_rgba(7,45,45,0.12)] border border-[#e1e4d9]">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#000000]" style={{ fontFamily: "Poppins, sans-serif" }}>
              Quick contact
            </h2>

            <div className="grid gap-4">
              <div className="rounded-2xl bg-[#eff2e7] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[#20593A]" />
                  <div>
                    <p className="font-semibold text-[#072d2d]">Email</p>
                    <a href="mailto:hello@susstem.org" className="text-sm sm:text-base text-[#20593A] break-all">
                      hello@susstem.org
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#eff2e7] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#20593A]" />
                  <div>
                    <p className="font-semibold text-[#072d2d]">Where we work</p>
                    <p className="text-sm sm:text-base text-[#072d2d]">
                      Supporting schools and communities across regions with hands-on STEM learning.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#eff2e7] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-[#20593A]" />
                  <div>
                    <p className="font-semibold text-[#072d2d]">Best for</p>
                    <p className="text-sm sm:text-base text-[#072d2d]">
                      Workshop enquiries, school partnerships, volunteering, and programme questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}