import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { siteConfig } from "@/lib/site.config";

const pageTitle = "My Cat Ate a Lily — Emergency Action Plan";
const pageDescription =
  "Your cat ate a lily. This is a veterinary emergency — call your vet now. Step-by-step action plan, symptoms timeline, and what to expect.";
const pageUrl = `${siteConfig.url}/emergency/cat-ate-a-lily/`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: "article",
  },
};

const aspcaTel = "+18884264435";
const aspcaDisplay = "(888) 426-4435";

const faq = [
  {
    question: "My cat ate a lily — what should I do right now?",
    answer:
      "Call a vet immediately. Lily poisoning in cats is a true emergency that requires treatment within hours to prevent fatal kidney failure. Call your regular vet, the nearest emergency veterinary hospital, or the ASPCA Animal Poison Control Center at (888) 426-4435. Do not wait for symptoms — treatment must start before kidney damage begins.",
  },
  {
    question: "How long does a cat have after eating a lily?",
    answer:
      "Treatment within 6 hours is best; within 18 hours is usually the cutoff for a good prognosis. After 24 hours, acute kidney failure has typically set in and survival drops sharply. The faster you act, the better the outcome.",
  },
  {
    question: "Do I need to bring the lily to the vet?",
    answer:
      "Yes if you can. Photograph the plant or bring a leaf, petal, or pollen sample in a sealed bag. This helps confirm whether it is a true lily (Lilium or Hemerocallis — deadly) or a non-true lily like peace lily or calla lily (toxic but not nephrotoxic).",
  },
  {
    question: "Should I make my cat vomit?",
    answer:
      "Only on direct instruction from a vet. Do not try to induce vomiting at home — it can cause aspiration and waste critical time. Get to the vet; they will decontaminate safely.",
  },
  {
    question: "How much lily is dangerous?",
    answer:
      "Any exposure to a true lily is potentially fatal. A few licks of pollen, a single chewed petal, or a sip of vase water can be enough. There is no known safe dose for cats.",
  },
  {
    question: "What if it was a peace lily or calla lily?",
    answer:
      "Peace lily and calla lily are not true lilies. They contain calcium oxalate crystals — painful oral irritation and drooling, but not kidney failure. Still call a vet for guidance, but the prognosis is far better.",
  },
];

export default function CatAteALilyEmergencyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pageTitle,
    description: pageDescription,
    url: pageUrl,
    datePublished: "2026-06-02",
    dateModified: "2026-06-02",
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Emergency",
        item: `${siteConfig.url}/emergency/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Cat Ate a Lily",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="emergency-root landing-root">
        <div className="landing-grid-bg" />
        <SiteNav />
        <main className="emergency-page">
        <nav aria-label="Breadcrumb" className="emergency-crumbs">
          <Link href="/">Home</Link> <span aria-hidden>·</span>{" "}
          <span>Emergency</span> <span aria-hidden>·</span>{" "}
          <span>Cat ate a lily</span>
        </nav>

        <header className="emergency-hero">
          <div className="emergency-kicker">⚠ Veterinary emergency</div>
          <h1>My cat ate a lily. What do I do?</h1>
          <p className="emergency-dek">
            Call a vet now. True lilies cause fatal kidney failure in cats and treatment
            must begin within hours. This page is a checklist, not a substitute for the
            phone call.
          </p>

          <div className="emergency-cta-row">
            <a className="emergency-cta primary" href={`tel:${aspcaTel}`}>
              📞 Call ASPCA Poison Control — {aspcaDisplay}
            </a>
            <p className="emergency-cta-note">
              24/7 · $95 consult · you will receive a case number to give your vet.
            </p>
          </div>
        </header>

        <section className="emergency-steps">
          <h2>Do this now — in order</h2>
          <ol>
            <li>
              <strong>Take the plant away</strong> and put it where the cat cannot reach
              it. Don&apos;t clean up petals or vase water yet — your vet may want to see
              them.
            </li>
            <li>
              <strong>Identify the plant.</strong> Photograph it. If it is a{" "}
              <em>Lilium</em> (Asiatic, Oriental, Easter, Tiger, Stargazer) or a{" "}
              <em>Hemerocallis</em> (daylily), it is deadly. Peace lily, calla lily, and
              Peruvian lily are still toxic but not nephrotoxic — call a vet anyway, the
              prognosis is better.
            </li>
            <li>
              <strong>Call a vet immediately.</strong> Your regular vet, the nearest 24-hour
              emergency hospital, or ASPCA Animal Poison Control at{" "}
              <a href={`tel:${aspcaTel}`}>{aspcaDisplay}</a>. Do not wait for symptoms.
            </li>
            <li>
              <strong>Bring evidence.</strong> A leaf, a petal, a photo of the plant, and
              vase water if any. Bring the cat in a carrier — no food or water for the
              trip unless your vet says otherwise.
            </li>
            <li>
              <strong>Do not induce vomiting at home.</strong> It can cause aspiration and
              waste time. Your vet will decontaminate safely.
            </li>
            <li>
              <strong>Expect IV fluids.</strong> Standard treatment is 48–72 hours of
              aggressive IV fluid therapy to flush the toxin and protect the kidneys.
              Bloodwork at admission and again at 24 and 48 hours.
            </li>
          </ol>
        </section>

        <section className="emergency-timeline">
          <h2>Symptom timeline — what to expect</h2>
          <div className="emergency-timeline-grid">
            <article>
              <header>0–2 hours</header>
              <p>
                Drooling, vomiting, loss of appetite. Sometimes lethargy. This is the
                window where treatment is most effective — kidney damage has usually not
                started yet.
              </p>
            </article>
            <article>
              <header>2–12 hours</header>
              <p>
                Vomiting may pause, giving false reassurance. Inside, the kidneys are
                beginning to fail. Get to the vet now if you have not already.
              </p>
            </article>
            <article>
              <header>12–24 hours</header>
              <p>
                Increased urination then sudden drop-off (oliguria/anuria), severe
                lethargy, dehydration. Bloodwork shows rising BUN and creatinine. Prognosis
                worsens sharply at this stage.
              </p>
            </article>
            <article>
              <header>24–72 hours</header>
              <p>
                Acute kidney failure. Without aggressive treatment, this stage is usually
                fatal within three to six days. Even with treatment, kidney damage can be
                permanent.
              </p>
            </article>
          </div>
        </section>

        <section className="emergency-which">
          <h2>Which lily was it?</h2>
          <p>
            Not every plant called &ldquo;lily&rdquo; is a true lily. Treatment is urgent
            for any of them, but the prognosis is very different.
          </p>
          <ul className="emergency-lily-list">
            <li>
              <strong>Deadly (kidney failure):</strong>{" "}
              <Link href="/plants/lily/">true lily (Lilium spp.)</Link>,{" "}
              <Link href="/plants/easter-lily/">Easter lily</Link>, daylily (Hemerocallis),
              tiger lily, Asiatic lily, Oriental lily, Stargazer.
            </li>
            <li>
              <strong>Toxic but not nephrotoxic:</strong>{" "}
              <Link href="/plants/peace-lily/">peace lily</Link>,{" "}
              <Link href="/plants/calla-lily/">calla lily</Link>,{" "}
              <Link href="/plants/peruvian-lily/">Peruvian lily</Link>. Calcium oxalate
              crystals — painful oral burning and drooling. Still call a vet.
            </li>
          </ul>
        </section>

        <section className="emergency-faq">
          <h2>Frequently asked questions</h2>
          {faq.map((q, i) => (
            <details key={i}>
              <summary>{q.question}</summary>
              <p>{q.answer}</p>
            </details>
          ))}
        </section>

        <footer className="emergency-foot">
          <p>
            This page is informational and not a substitute for veterinary care. If your
            cat may have ingested a lily, contact a vet immediately. Last reviewed{" "}
            <time dateTime="2026-06-02">June 2, 2026</time>.
          </p>
          <p>
            Sources: ASPCA Animal Poison Control Center, Pet Poison Helpline. See our full{" "}
            <Link href="/plants/lily/">lily plant profile</Link> for citations.
          </p>
        </footer>
        </main>
      </div>
    </>
  );
}
