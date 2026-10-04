import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Newspaper, Sparkles } from "lucide-react";
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
  const activePublicationIndex = publications.findIndex(
    (publication) => publication.title === activePublication.title
  );
  const showPreviousPublication = () => {
    const previousIndex =
      (activePublicationIndex - 1 + publications.length) % publications.length;
    setActivePublication(publications[previousIndex]);
  };
  const showNextPublication = () => {
    const nextIndex = (activePublicationIndex + 1) % publications.length;
    setActivePublication(publications[nextIndex]);
  };

  return (
    <main className="bg-[#f5f7f1] text-[#072d2d]">
      <section className="bg-[#072d2d] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-[#a4ff7b]">
              <Sparkles className="h-4 w-4" />
              Insider updates
            </div>
            <div className="space-y-4">
              <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Follow our Journey in building SusSTEM with us.
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
                Publication drops, student stories, behind-the-scenes updates, and more about the impact that your contribution at SusSTEM is making.
              </p>
            </div>

            {isSubscribed ? (
              <div className="mx-auto rounded-3xl border border-[#a4ff7b]/25 bg-[#a4ff7b]/10 px-5 py-4 text-sm leading-6 text-white sm:max-w-lg">
                You&apos;re already subscribed. Browse the archive below to read previous publications.
              </div>
            ) : null}
          </div>

          <div className="mx-auto mt-12 max-w-6xl">
            <div className="rounded-[2rem] bg-white p-6 text-[#072d2d] shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff2e7] text-[#20593A]">
                  <Newspaper className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b7b75]">Newsletter</p>
                  <h2 className="text-2xl font-bold">In the Know</h2>
                </div>
              </div>

              <NewsletterSignupForm onSubscribe={onSubscribe} submitLabel="Yes, send me updates" />
            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:py-16" id="archive">
        <div className="mx-auto mb-8 max-w-3xl space-y-3 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Read what we&apos;ve already shared.</h2>
        </div>

        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#d9e2d5] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#20593A]">
                Issue {activePublicationIndex + 1} of {publications.length}
              </p>
              <h3 className="mt-1 text-2xl font-bold text-[#072d2d]">{activePublication.title}</h3>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#20593A] ring-1 ring-[#d9e2d5]">
              {activePublication.date}
            </span>
          </div>
          <p className="max-w-3xl text-base leading-7 text-[#4f5f59]">
            {activePublication.summary} Future editions can expand this space with downloadable PDFs, video recaps, and event roundups once they are ready to publish.
          </p>
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={showPreviousPublication}
              className="inline-flex items-center gap-2 rounded-full border border-[#20593A] px-4 py-2 text-sm font-semibold text-[#20593A] transition-colors hover:bg-[#20593A] hover:text-white"
              aria-label="View previous publication"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>
            <div className="flex items-center gap-2" aria-label="Publication slider navigation">
              {publications.map((publication, index) => (
                <button
                  key={publication.title}
                  type="button"
                  onClick={() => setActivePublication(publication)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === activePublicationIndex ? "bg-[#20593A]" : "bg-[#cdd7c9] hover:bg-[#8a938c]"
                  }`}
                  aria-label={`View ${publication.title}`}
                  aria-current={index === activePublicationIndex ? "true" : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={showNextPublication}
              className="inline-flex items-center gap-2 rounded-full border border-[#20593A] px-4 py-2 text-sm font-semibold text-[#20593A] transition-colors hover:bg-[#20593A] hover:text-white"
              aria-label="View next publication"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}