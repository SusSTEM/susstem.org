import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "SusSTEM has transformed how my students think about technology and the environment. They're now solving real problems in our community!",
      author: "Maria Rodriguez",
      role: "Science Teacher, São Paulo",
    },
    {
      quote:
        "My daughter built a water conservation system for our garden. I'm amazed at what these kids can achieve with the right guidance.",
      author: "James Chen",
      role: "Parent, Singapore",
    },
    {
      quote:
        "The hands-on approach and focus on sustainability makes learning exciting. Our students are more engaged than ever before.",
      author: "Amina Okonkwo",
      role: "Education Director, Lagos",
    },
  ];

  const partners = [
    "Propeller Technologies",
    "ZenKids",
    "WASTEless",
    "Arduino",
    "Code.org",
   ];

  return (
    <section className="bg-[#e1e4d8] py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Testimonials */}
        <div className="mb-16">
          <h2
            className="text-[#000000] text-3xl md:text-4xl text-center mb-12"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            Community Love
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-[0_16px_35px_rgba(0,0,0,0.18)] hover:-translate-y-2 hover:scale-[1.02] transform transition-all duration-500 ease-out"
              >
                <Quote className="w-12 h-12 text-[#20593a] mb-4 " />
                <p className="text-[#072d2d] mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-200 pt-4">
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

        {/* Partner Logos */}
        <div>
          <h3
            className="text-[#000000] text-2xl md:text-3xl text-center mb-8"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            Backed by
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 flex items-center justify-center h-24 shadow-sm transform transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_16px_35px_rgba(0,0,0,0.18)] hover:bg-[#20593a]"
              >
                <span
                  className="
                    text-[#072d2d]
                    text-center
                    group-hover:text-[#a4ff7b]
                    transition-colors
                  "
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
