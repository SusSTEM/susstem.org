type PartnerHighlightProps = {
  logoSrc: string;
  logoAlt: string;
  description: string;
  logoClassName?: string;
};

function PartnerHighlight({
  logoSrc,
  logoAlt,
  description,
  logoClassName,
}: PartnerHighlightProps) {
  return (
    <article className="flex h-full flex-col items-center justify-between text-center gap-3 sm:gap-4">
      {/* Equalized logo frame height with scaling support */}
      <div className="shrink-0 flex items-center justify-center h-20 sm:h-24 md:h-28 w-full max-w-xs sm:max-w-sm">
        <img
          src={logoSrc}
          alt={logoAlt}
          className={`h-full w-full object-contain ${logoClassName ?? ""}`}
        />
      </div>

      {/* Expanded width + calibrated text size so full copy fits in 2 lines */}
      <p className="w-full max-w-xl sm:max-w-2xl text-sm sm:text-base lg:text-[1.05rem] leading-snug sm:leading-relaxed text-black font-normal mx-auto">
        {description}
      </p>
    </article>
  );
}

const partnerNetwork = [
  "Propeller Technologies",
  "ZenKidz",
  "WASTEless",
  "Arduino",
  "Code.org",
  "Zenstore",
];

export function PartnerShowcase() {
  return (
    <section className="bg-white py-8 sm:py-12 md:py-18">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl space-y-7 sm:space-y-9">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12 items-stretch">
            <PartnerHighlight
              logoSrc="/images/zenkidzlogo.png"
              logoAlt="ZenKidz logo"
              description="Experiential Learning Platform for K–12. The online gateway to skill-based experiential learning, engaging students globally."
              logoClassName="scale-125"
            />

            <PartnerHighlight
              logoSrc="/images/zenstore.png"
              logoAlt="Zenstore India logo"
              description="India's 1st Career Concept Store. Hands-on kits and educational products that inspire real-world skill building for K–12 students."
            />
          </div>

          {/* Full-width Banner Pill */}
          <div className="w-full flex justify-center">
            <div className="w-full flex items-center justify-center rounded-3xl sm:rounded-full bg-[#d2042d] px-5 py-3.5 sm:px-8 sm:py-4 shadow-[0_10px_22px_rgba(210,4,45,0.16)] text-center">
              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-medium leading-normal sm:whitespace-nowrap"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <span className="font-semibold tracking-[0.02em]">
                  Two platforms united by one mission
                </span>
                <span className="text-white/90">
                  {" "}
                  — making career-focused, hands-on learning accessible to every child in India.
                </span>
              </p>
            </div>
          </div>

          <div className="pt-2 sm:pt-4">
            <p className="text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.34em] text-[#20593A]">
              Backed by
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
              {partnerNetwork.map((partner) => (
                <div
                  key={partner}
                  className="group flex min-h-16 sm:min-h-20 cursor-pointer items-center justify-center rounded-2xl border border-[#072d2d]/10 bg-white px-3 py-3 text-center shadow-[0_8px_18px_rgba(7,45,45,0.06)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#d2042d] hover:border-transparent hover:shadow-[0_10px_22px_rgba(210,4,45,0.25)]"
                >
                  <span
                    className="text-xs sm:text-sm md:text-base font-semibold text-[#072d2d] group-hover:text-white transition-colors duration-300 leading-tight"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}