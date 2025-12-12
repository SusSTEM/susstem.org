import { Target, Eye } from "lucide-react";

export function AboutUs() {
  return (
    <section 
      className="bg-[#eff2e7] py-16 md:py-20 px-6"
      id="about-us"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {/* Mission Card */}
          <div 
            className="rounded-3xl p-8 md:p-10"
            style={{ backgroundColor: '#ff9b69' }}
          >
            <div 
              className="shadow-lg h-full flex flex-col"
              style={{ 
                borderRadius: '24px', 
                padding: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.35)'
              }}
            >
              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: '#ff9b69' }}
              >
                <Target className="w-8 h-8 text-white" strokeWidth={2} />
              </div>

              {/* Heading */}
              <h1 
                className="text-[#000000] mb-6"
                style={{ 
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '36px',
                  lineHeight: '1.3'
                }}
              >
                Our Mission
              </h1>

              {/* Body Text as Heading */}
           <h3
  className="flex-grow"
  style={{
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize: '25px',
    lineHeight: '1.7',
    color: '#333333'
  }}
>
  "To empower students aged 11–18 with <strong>hands-on STEM education</strong> rooted in <strong>sustainability</strong>, by providing <strong>accessible, project-based</strong> learning experiences and tools that spark <strong>innovation</strong> and <strong>environmental action</strong>."
</h3>

            </div>
          </div>

          {/* Vision Card */}
          <div 
            className="rounded-3xl p-8 md:p-10"
            style={{ backgroundColor: '#ffd459' }}
          >
            <div 
              className="shadow-lg h-full flex flex-col"
              style={{ 
                borderRadius: '24px', 
                padding: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.35)'
              }}
            >
              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: '#ffd459' }}
              >
                <Eye className="w-8 h-8 text-white" strokeWidth={2} />
              </div>

              {/* Heading */}
              <h1 
                className="text-[#000000] mb-6"
                style={{ 
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '36px',
                  lineHeight: '1.3'
                }}
              >
                Our Vision
              </h1>

              {/* Body Text as Heading */}
              <h3
  className="flex-grow"
  style={{ 
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize: '25px',
    lineHeight: '1.7',
    color: '#333333'
  }}
>
  "A world where <strong>every young mind</strong>, regardless of geography or background, has the <strong>tools</strong>, <strong>confidence</strong>, and <strong>education</strong> to solve <strong>global sustainability challenges</strong> through <strong>technology</strong>."
</h3>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
