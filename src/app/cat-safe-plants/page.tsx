import type { Metadata } from "next";
import Link from "next/link";
import { ListPage } from "@/components/ListPage";
import { getAllPlants } from "@/lib/plants";
import { siteConfig } from "@/lib/site.config";

const pageTitle = "Cat Safe Plants: The Complete ASPCA-Verified List";
const pageDescription =
  "Every plant on this list is ASPCA-verified non-toxic to cats. Houseplants, herbs, and flowers you can keep around your cat — sourced and reviewed.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${siteConfig.url}/cat-safe-plants/` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/cat-safe-plants/`,
    type: "article",
  },
};

export default function CatSafePlantsListPage() {
  const plants = getAllPlants();
  const safeCount = plants.filter((p) => p.frontmatter.verdict === "safe").length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Cat Safe Plants — The Complete ASPCA-Verified List",
            description: pageDescription,
            datePublished: "2026-06-01",
            dateModified: "2026-06-01",
            author: { "@type": "Organization", name: siteConfig.name },
            publisher: { "@type": "Organization", name: siteConfig.name },
            mainEntityOfPage: `${siteConfig.url}/cat-safe-plants/`,
          }),
        }}
      />
      <ListPage
        kicker="The list"
        title="Cat-safe plants —"
        titleEm="the complete ASPCA list."
        dek={`${safeCount} houseplants and herbs that are non-toxic to cats per the ASPCA. Every entry is sourced and reviewed.`}
        intro={
          <>
            <p>
              <strong>Yes — there are plenty of cat-safe plants.</strong> The ASPCA
              maintains a list of plants that are{" "}
              <a
                href="https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants"
                rel="noopener nofollow"
              >
                non-toxic to cats
              </a>
              , and the {safeCount} plants below are the most popular and most
              search-tested entries on that list. Each one has its own page with
              ASPCA citation, care instructions, and notes on what happens if
              your cat does decide to chew.
            </p>
            <p>
              If you are setting up a household with a cat, the safest approach
              is to assume every plant is toxic until you have checked the
              specific Latin name on the ASPCA list. Common names are unreliable
              (see <Link href="/plants/strelitzia-reginae">Bird of Paradise</Link>{" "}
              vs. <Link href="/plants/caesalpinia-gilliesii">Mexican Bird of Paradise</Link>{" "}
              for one example). The list below is the start — for the full
              database including toxic plants you must avoid, see the{" "}
              <Link href="/library/">library</Link>.
            </p>
            <p>
              <strong>How we verify.</strong> Every plant on this list has been
              checked against the ASPCA Animal Poison Control plant database. If
              an entry is ambiguous, missing, or uses a common name shared with
              a toxic species, we say so on the species page rather than guess.
            </p>
          </>
        }
        plants={plants}
        filterVerdict="safe"
        afterGrid={
          <section
            className="list-faq"
            style={{ maxWidth: 760, margin: "3rem auto 0", padding: "0 1.5rem" }}
          >
            <h2>Cat-safe plants — common questions</h2>
            <h3>What plant is 100% safe for cats?</h3>
            <p>
              No plant is &ldquo;100% safe&rdquo; in the sense that a cat eating a kilogram
              of it would feel nothing — fibre alone causes vomiting in any
              animal. But the ASPCA non-toxic list contains plants with no
              recognised toxic principle, meaning a normal sample-bite produces
              no poisoning. <Link href="/plants/spider-plant">Spider plant</Link>
              , <Link href="/plants/boston-fern">Boston fern</Link>,{" "}
              <Link href="/plants/african-violet">African violet</Link>, and{" "}
              <Link href="/plants/orchid">orchids</Link> are among the most
              widely owned cat-safe houseplants.
            </p>
            <h3>What plants do cats love that are safe?</h3>
            <p>
              <Link href="/plants/catnip">Catnip</Link> is the headline cat
              attractant — non-toxic and actively enjoyed by most cats.{" "}
              <Link href="/plants/spider-plant">Spider plants</Link> have a mild
              attractant effect too (similar to a catnip-lite high). Cat grass
              (oat, barley, or wheatgrass) is non-toxic and often used as a
              redirection plant for cats that chew houseplants.
            </p>
            <h3>What is the most popular cat-safe houseplant?</h3>
            <p>
              By search volume, <Link href="/plants/spider-plant">spider plant</Link>{" "}
              tops the list, followed by{" "}
              <Link href="/plants/boston-fern">Boston fern</Link> and{" "}
              <Link href="/plants/areca-palm">areca palm</Link>. All three are
              ASPCA non-toxic and easy to grow indoors.
            </p>
            <h3>Are succulents safe for cats?</h3>
            <p>
              Some are, many are not. <Link href="/plants/haworthia">Haworthia</Link>{" "}
              is ASPCA non-toxic. <Link href="/plants/jade-plant">Jade plant</Link>
              , <Link href="/plants/aloe-vera">aloe vera</Link>, and{" "}
              <Link href="/plants/kalanchoe">kalanchoe</Link> are popular
              succulents that are toxic to cats. Always check the Latin name
              before assuming a succulent is safe.
            </p>
          </section>
        }
      />
    </>
  );
}
