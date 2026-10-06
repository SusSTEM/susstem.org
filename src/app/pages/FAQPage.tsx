import { useState } from "react";
import {
  HandHeart,
  Handshake,
  HelpCircle,
  Lightbulb,
  MessageCircleQuestion,
  Users,
  type LucideIcon,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  icon: LucideIcon;
}

interface FAQSection {
  eyebrow: string;
  title: string;
  description: string;
  items: FAQItem[];
}

interface FAQPageProps {
  onNavigate?: (page: string) => void;
}

// Keep the questions here so the FAQ can be updated without changing the accordion UI.
const faqSections: FAQSection[] = [
  {
    eyebrow: "For volunteers, partners & contributors",
    title: "Want to help make an impact?",
    description:
      "Find your place in the SusSTEM community, whether you are ready to lend your time, expertise, resources, or support.",
    items: [
      {
        question: "How can I volunteer with SusSTEM?",
        answer:
          "We welcome people who can support workshops, mentor students, share specialist knowledge, or help behind the scenes. Visit our Volunteer page or contact us at hello@susstem.org to tell us how you would like to help.",
        icon: HandHeart,
      },
      {
        question: "How can my organisation partner with SusSTEM?",
        answer:
          "We work with schools, community groups, businesses, and other organisations to create meaningful STEM learning opportunities. Send us a message with a little about your organisation and what you would like to explore together.",
        icon: Handshake,
      },
      {
        question: "What can I contribute to SusSTEM?",
        answer:
          "Contributions can include funding, equipment, professional expertise, project ideas, or introductions to communities that could benefit from our programme. Every contribution helps us make hands-on learning more accessible.",
        icon: Lightbulb,
      },
      {
        question: "Do I need STEM experience to get involved?",
        answer:
          "No. Enthusiasm, curiosity, and a willingness to learn are just as valuable as technical experience. We will help you find a role that matches your skills, time, and interests.",
        icon: Users,
      },
      {
        question: "How do I get started?",
        answer:
          "Choose the way you would like to get involved, then complete the relevant form or email hello@susstem.org. Our team will follow up with the next steps.",
        icon: MessageCircleQuestion,
      },
    ],
  },
  {
    eyebrow: "For new visitors",
    title: "New to SusSTEM?",
    description:
      "Here are a few quick answers to help you understand who we are and how our programme works.",
    items: [
      {
        question: "What is SusSTEM?",
        answer:
          "SusSTEM is a hands-on STEM learning community that helps young people explore sustainability through practical projects, collaboration, and real-world problem solving.",
        icon: HelpCircle,
      },
      {
        question: "Who is SusSTEM for?",
        answer:
          "Our programmes are designed for students and educators, with opportunities for volunteers, partners, and contributors to support the learning journey.",
        icon: Users,
      },
      {
        question: "What happens in a SusSTEM programme?",
        answer:
          "Participants investigate a sustainability challenge, learn through making and testing, and work together to develop ideas that can have a positive impact in their communities.",
        icon: Lightbulb,
      },
      {
        question: "Can my school or community group take part?",
        answer:
          "Yes. We are always interested in hearing from schools and community groups that want to bring practical, sustainability-focused STEM learning to their students or members.",
        icon: Handshake,
      },
      {
        question: "Where can I learn more?",
        answer:
          "Explore the programme and project sections on our website, or contact us at hello@susstem.org. We would be happy to help you find the right place to begin.",
        icon: MessageCircleQuestion,
      },
    ],
  },
];

function FAQAccordion({ items, idPrefix }: { items: FAQItem[]; idPrefix: string }) {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#dce5d8] overflow-hidden rounded-[1.5rem] border border-[#dce5d8] bg-white">
      {items.map((item, index) => {
        const isOpen = openQuestion === index;
        const answerId = `${idPrefix}-answer-${index}`;
        const Icon = item.icon;

        return (
          <div key={item.question} className="text-[#072d2d]">
            <button
              type="button"
              className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-[#f8faf5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#20593a] sm:px-7 sm:py-6"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenQuestion(isOpen ? null : index)}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center text-[#072d2d]">
                <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="flex-1 text-base font-semibold leading-6 sm:text-lg">{item.question}</span>
              <span
                className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#072d2d] text-[#072d2d] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                <span className="absolute h-px w-3 bg-current" />
                <span className="absolute h-3 w-px bg-current" />
              </span>
            </button>

            <div
              id={answerId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
              aria-hidden={!isOpen}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="bg-[#eff2e7] px-5 py-5 pl-[4.5rem] text-sm leading-7 text-[#20593a] sm:px-7 sm:py-6 sm:pl-[5.75rem] sm:text-base">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  return (
    <main className="bg-[#eff2e7] text-[#072d2d]">
      <section className="bg-[#072d2d] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eff2e7] text-[#20593a]">
              <MessageCircleQuestion className="h-7 w-7" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a4ff7b]">
              SusSTEM FAQs
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Questions? Start here.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Learn more about SusSTEM, our community, and the ways you can be part of practical
              sustainability-focused STEM learning.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 sm:py-16 lg:py-20">
        <div className="space-y-14">
          {faqSections.map((section) => (
            <section key={section.title} aria-labelledby={`faq-section-${section.title}`}>
              <div className="mb-6 max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#20593a]">
                  {section.eyebrow}
                </p>
                <h2
                  id={`faq-section-${section.title}`}
                  className="mt-3 text-3xl font-bold leading-tight sm:text-4xl"
                >
                  {section.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-[#4f5f59]">{section.description}</p>
              </div>
              <FAQAccordion items={section.items} idPrefix={`faq-${section.title.replace(/\W+/g, "-").toLowerCase()}`} />
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-[1.75rem] bg-[#20593a] px-6 py-8 text-center text-white sm:px-10">
          <h2 className="text-2xl font-bold">Still have a question?</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">
            We would love to hear from you. Reach out and our team will point you in the right
            direction.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.("contact")}
            className="mt-6 rounded-full bg-[#a4ff7b] px-6 py-3 text-sm font-bold text-[#072d2d] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a4ff7b]"
          >
            Contact us
          </button>
        </div>
      </section>
    </main>
  );
}
