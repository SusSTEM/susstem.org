import { useMemo, useState } from "react";
import { Newspaper, Sparkles, ArrowRight } from "lucide-react";
import { NewsletterSignupForm } from "../components/NewsletterSignupForm";

interface NewsletterPageProps {
  onNavigate?: (page: string) => void;
  isSubscribed?: boolean;
  onSubscribe: (email: string) => void;
}

export function NewsletterPage({ onNavigate, isSubscribed, onSubscribe }: NewsletterPageProps) {
  const publications = useMemo(
    () => [
      {
        title: "SusSTEM Insider No. 03",
        date: "June 2026",
        summary: "Workshop highlights, student wins, and a look at the next sustainability challenge.",
      },
      {
        title: "SusSTEM Insider No. 02",
        date: "March 2026",
        summary: "A recap of our growing project library and the schools helping us pilot new ideas.",
      },
      {
        title: "SusSTEM Insider No. 01",
        date: "December 2025",
        summary: "The first issue that introduced our mission, team, and founding story.",
      },
    ],
    []
  );
  const [activePublication, setActivePublication] = useState(publications[0]);

  return (
    <main className="bg-[#f5f7f1] text-[#072d2d]">
      <section className="bg-[#072d2d] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-[#a4ff7b]">
              <Sparkles className="h-4 w-4" />
              Insider updates
            </div>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">
                A newsletter for the people building SusSTEM with us.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
                Stay close to the work with publication drops, student stories, behind-the-scenes updates, and partner announcements in a format that feels as polished as the rest of the site.
              </p>
            </div>

            {isSubscribed ? (
              <div className="rounded-3xl border border-[#a4ff7b]/25 bg-[#a4ff7b]/10 px-5 py-4 text-sm leading-6 text-white sm:max-w-lg">
                You&apos;re already subscribed. Browse the archive below to read previous publications.
              </div>
            ) : null}
          </div>

          <div className="rounded-[2rem] bg-white p-6 text-[#072d2d] shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff2e7] text-[#20593A]">
                <Newspaper className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b7b75]">Newsletter</p>
                <h2 className="text-2xl font-bold">Stay in the loop</h2>
              </div>
            </div>

            <NewsletterSignupForm onSubscribe={onSubscribe} submitLabel="Yes, send me updates" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:py-16" id="archive">
        <div className="mb-8 max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#20593A]">Previous publications</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Read what we&apos;ve already shared.</h2>
          <p className="text-base leading-7 text-[#4f5f59]">
            Use this archive as the home for future issues, launch notes, and roundups. It keeps the newsletter page useful even after someone subscribes.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {publications.map((publication, index) => (
            <article key={publication.title} className="rounded-[1.75rem] border border-[#d9e2d5] bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#eff2e7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#20593A]">
                  Issue {index + 1}
                </span>
                <span className="text-sm text-[#6b7b75]">{publication.date}</span>
              </div>
              <h3 className="text-xl font-bold text-[#072d2d]">{publication.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#4f5f59]">{publication.summary}</p>
              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#20593A] transition-colors hover:text-[#072d2d]"
                onClick={() => setActivePublication(publication)}
              >
                Read issue
                <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#d9e2d5] bg-[#fbfcf8] p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#20593A]">Read issue</p>
              <h3 className="mt-1 text-2xl font-bold text-[#072d2d]">{activePublication.title}</h3>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#20593A] ring-1 ring-[#d9e2d5]">
              {activePublication.date}
            </span>
          </div>
          <p className="max-w-3xl text-base leading-7 text-[#4f5f59]">
            {activePublication.summary} Future editions can expand this space with downloadable PDFs, video recaps, and event roundups once they are ready to publish.
          </p>
        </div>
      </section>
    </main>
  );
}