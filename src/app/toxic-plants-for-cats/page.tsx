import type { Metadata } from "next";
import Link from "next/link";
import { ListPage } from "@/components/ListPage";
import { getAllPlants } from "@/lib/plants";
import { siteConfig } from "@/lib/site.config";

const pageTitle = "Toxic Plants for Cats: The Complete ASPCA-Verified List";
const pageDescription =
  "Every plant on this list is ASPCA-verified toxic to cats. Common houseplants, garden ornamentals, and seasonal hazards — symptoms, severity, and safe alternatives.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${siteConfig.url}/toxic-plants-for-cats/` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/toxic-plants-for-cats/`,
    type: "article",
  },
};

export default function ToxicPlantsForCatsListPage() {
  const plants = getAllPlants();
  const toxicCount = plants.filter((p) => p.frontmatter.verdict === "toxic").length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Toxic Plants for Cats — The Complete ASPCA-Verified List",
    description: pageDescription,
    datePublished: "2026-06-02",
    dateModified: "2026-06-02",
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/toxic-plants-for-cats/`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the most toxic plant for cats?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "True lilies (Lilium and Hemerocallis species) are the most dangerous common plants for cats — any exposure can cause fatal acute kidney failure within 72 hours. Sago palm, oleander, foxglove, and yew are also rapidly fatal. Each has its own dedicated page on this site with ASPCA citation, symptoms, and what to do.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do if my cat ate a toxic plant?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Call a vet immediately. The ASPCA Animal Poison Control Center is available 24/7 at (888) 426-4435. If the plant was a true lily, see our emergency action page at /emergency/cat-ate-a-lily/. Bring a photo or sample of the plant, and do not induce vomiting unless directed by a vet.",
        },
      },
      {
        "@type": "Question",
        name: "Are all houseplants toxic to cats?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "No — many popular houseplants are non-toxic per the ASPCA. Spider plant, Boston fern, areca palm, and orchids are among the widely owned cat-safe options. See our cat-safe plants list for the full set.",
        },
      },
      {
        "@type": "Question",
        name: "How can I tell if a plant is toxic to cats?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Check the Latin name against the ASPCA Animal Poison Control plant database. Common names are unreliable — Bird of Paradise can mean a mild plant or a severe one depending on the species. Always verify the Latin binomial before bringing a plant into a cat household.",
        },
      },
      {
        "@type": "Question",
        name: "Which seasonal plants are toxic to cats?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "At Easter, lilies are the biggest hazard. At Christmas, mistletoe, holly, poinsettia, and the cut Christmas tree all carry varying risks. Autumn brings autumn crocus (deadly) and chrysanthemums. Each has its own page on this site with severity and safer alternatives.",
        },
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
      <ListPage
        kicker="The warnings"
        title="Toxic plants for cats —"
        titleEm="the complete ASPCA list."
        dek={`${toxicCount} houseplants, garden ornamentals, and seasonal hazards that are toxic to cats per the ASPCA. Severity, symptoms, and safe alternatives for each.`}
        intro={
          <>
            <p>
              <strong>If your cat already ate a plant, this is the wrong page.</strong>{" "}
              Call a vet. The ASPCA Animal Poison Control Center is available
              24/7 at <a href="tel:+18884264435">(888) 426-4435</a>. For lily
              ingestion specifically — the deadliest common plant for cats — go
              to our <Link href="/emergency/cat-ate-a-lily/">emergency action page</Link>.
            </p>
            <p>
              The {toxicCount} plants below are the ASPCA-verified toxic plants
              we have published in-depth pages for. Each one links to a full
              profile with the ASPCA citation, the specific toxic principle
              (alkaloid, glycoside, oxalate, oil), severity, symptoms timeline,
              and a curated set of cat-safe lookalikes. The most dangerous —
              true lilies, sago palm, oleander, foxglove, yew, autumn crocus —
              can kill within 72 hours and warrant the strictest household
              vigilance.
            </p>
            <p>
              <strong>How we verify.</strong> Every toxicity claim on this site
              is backed by a direct ASPCA citation. Where the ASPCA database is
              silent or ambiguous (the{" "}
              <Link href="/plants/zz-plant">ZZ plant</Link> is the working
              example), we say so on the species page and lean conservative
              rather than guess. See the{" "}
              <a
                href="https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants"
                rel="noopener nofollow"
              >
                ASPCA Animal Poison Control plant database
              </a>{" "}
              for the upstream source.
            </p>
          </>
        }
        plants={plants}
        filterVerdict="toxic"
        afterGrid={
          <section
            className="list-faq"
            style={{ maxWidth: 760, margin: "3rem auto 0", padding: "0 1.5rem" }}
          >
            <h2>Toxic plants for cats — common questions</h2>
            <h3>What is the most toxic plant for cats?</h3>
            <p>
              <Link href="/plants/lily">True lilies</Link> (Lilium and
              Hemerocallis) cause fatal acute kidney failure within 72 hours
              from any exposure — pollen, petal, leaf, or vase water.{" "}
              <Link href="/plants/sago-palm">Sago palm</Link> causes liver
              failure (cycasin). <Link href="/plants/oleander">Oleander</Link>,{" "}
              <Link href="/plants/foxglove">foxglove</Link>, and{" "}
              <Link href="/plants/yew">yew</Link> stop the heart (cardiac
              glycosides and taxine). <Link href="/plants/autumn-crocus">Autumn crocus</Link>{" "}
              causes multi-organ failure (colchicine). All six are deadly.
            </p>
            <h3>What plants should I never have in a cat household?</h3>
            <p>
              The six deadly plants above, plus the seasonal high-risk plants
              that arrive once a year. At Easter,{" "}
              <Link href="/plants/easter-lily">Easter lily</Link> is the single
              biggest pet-poison hazard. At Christmas,{" "}
              <Link href="/plants/mistletoe">mistletoe</Link> and{" "}
              <Link href="/plants/holly">holly</Link> share the spotlight with{" "}
              <Link href="/plants/poinsettia">poinsettia</Link> (much less
              dangerous than reputation, but still mildly toxic).
            </p>
            <h3>Are popular houseplants like pothos and peace lily toxic?</h3>
            <p>
              Yes, both. <Link href="/plants/pothos">Pothos</Link>,{" "}
              <Link href="/plants/peace-lily">peace lily</Link>,{" "}
              <Link href="/plants/philodendron">philodendron</Link>,{" "}
              <Link href="/plants/monstera">monstera</Link>, and{" "}
              <Link href="/plants/dieffenbachia">dieffenbachia</Link> all
              contain insoluble calcium oxalate crystals — painful oral burning
              and drooling, rarely deadly, always uncomfortable. The whole
              Araceae (aroid) family shares this profile.{" "}
              <Link href="/plants/snake-plant">Snake plant</Link> and{" "}
              <Link href="/plants/aloe-vera">aloe vera</Link> are also toxic
              (saponins) but milder.
            </p>
            <h3>What about lawn and garden plants?</h3>
            <p>
              Many common garden ornamentals are toxic.{" "}
              <Link href="/plants/azalea">Azalea</Link> (rhododendron) is
              severely toxic — cardiac risk from grayanotoxin.{" "}
              <Link href="/plants/hydrangea">Hydrangea</Link> contains
              cyanogenic glycosides.{" "}
              <Link href="/plants/daffodil">Daffodil</Link> bulbs are toxic
              (lycorine). <Link href="/plants/tulip">Tulip</Link> bulbs cause
              GI upset and cardiac signs.{" "}
              <Link href="/plants/lantana">Lantana</Link> and{" "}
              <Link href="/plants/geranium">geranium</Link> are also on the
              ASPCA toxic list. Outdoor cats are at meaningful risk in any
              ornamental garden.
            </p>
            <h3>What if a plant is not on the ASPCA list?</h3>
            <p>
              Absence from the ASPCA list is not a safety claim. The database
              is curated and incomplete. Several mainstream houseplants — most
              notably <Link href="/plants/zz-plant">ZZ plant</Link> — are not
              on the ASPCA list but are reported toxic by every other
              poison-control source. We treat the gap conservatively and flag
              it on the species page.
            </p>
            <h3>Where can I see the full toxic vs safe database?</h3>
            <p>
              Our <Link href="/library/">library</Link> shows every plant page
              on this site, filtered by safe and toxic. The matching cat-safe
              page is <Link href="/cat-safe-plants/">Cat-safe plants</Link> for
              the non-toxic side of the list.
            </p>
          </section>
        }
      />
    </>
  );
}
