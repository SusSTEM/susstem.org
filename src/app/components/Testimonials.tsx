import { Quote, Heart } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "SusSTEM has changed how my students think about the environment. I'm so excited to see the impact they are making!",
      author: "Sujatha Ma'am",
      role: "Science Teacher, Chennai, India",
      // First Card Colors
      colorHex: "#a2bb65",
      hoverBg: "hover:bg-[#a2bb65]",
      textQuote: "text-[#a2bb65]",
    },
    {
      quote:
        "My daughter built a water saving system for our terrace. I'm so proud of what these kids can achieve with proper teaching.",
      author: "R. Ashwini",
      role: "Parent, Ambattur, India",
      // Second Card Colors
      colorHex: "#ffd459",
      hoverBg: "hover:bg-[#ffd459]",
      textQuote: "text-[#ffd459]",
    },
    {
      quote:
        "The practical projects make my daughter excited about learning every week. God bless the team at SusSTEM for this wonderful initiative.",
      author: "D. Dharshini",
      role: "Parent, Pudukottai, India",
      // Third Card Colors
      colorHex: "#bcb0fa",
      hoverBg: "hover:bg-[#bcb0fa]",
      textQuote: "text-[#bcb0fa]",
    },
  ];

  return (
    <section className="bg-[#e1e4d8] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Testimonials Header */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-12">
            <h2
              className="text-[#000000] text-3xl md:text-4xl text-center"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              Community Love
            </h2>

            {/* Heart Badge */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#072D2D] flex-shrink-0 shadow-md">
              <Heart
                className="w-6 h-6 text-[#a4ff7b] heartbeat"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group bg-white ${testimonial.hoverBg} rounded-3xl p-8 shadow-md hover:shadow-[0_16px_35px_rgba(0,0,0,0.18)] hover:-translate-y-2 hover:scale-[1.02] transform transition-all duration-500 ease-out`}
              >
                {/* Quote icon: matching card color by default, switches to #20593a on card hover */}
                <Quote
                  className={`w-12 h-12 ${testimonial.textQuote} group-hover:text-[#20593a] mb-4 transition-colors duration-500`}
                />
                <p className="text-[#072d2d] mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-200 group-hover:border-[#072d2d]/20 pt-4 transition-colors duration-500">
                  <p
                    className="text-[#000000]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {testimonial.author}
                  </p>
                  <p className="text-[#072d2d] text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}