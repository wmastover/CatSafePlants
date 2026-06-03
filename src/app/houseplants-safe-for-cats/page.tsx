import type { Metadata } from "next";
import Link from "next/link";
import { ListPage } from "@/components/ListPage";
import { getAllPlants } from "@/lib/plants";
import { siteConfig } from "@/lib/site.config";

const pageTitle = "Houseplants Safe for Cats — ASPCA-Verified Indoor Plants";
const pageDescription =
  "Indoor plants that are non-toxic to cats per the ASPCA. Real photos, care notes, and what each one looks like at home.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${siteConfig.url}/houseplants-safe-for-cats/` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/houseplants-safe-for-cats/`,
    type: "article",
  },
};

export default function HouseplantsSafeForCatsListPage() {
  const plants = getAllPlants();
  const safe = plants.filter((p) => p.frontmatter.verdict === "safe");
  const safeCount = safe.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Houseplants Safe for Cats — ASPCA-Verified Indoor Plants",
            description: pageDescription,
            datePublished: "2026-06-01",
            dateModified: "2026-06-01",
            author: { "@type": "Organization", name: siteConfig.name },
            publisher: { "@type": "Organization", name: siteConfig.name },
            mainEntityOfPage: `${siteConfig.url}/houseplants-safe-for-cats/`,
          }),
        }}
      />
      <ListPage
        kicker="Indoor plants"
        title="Houseplants safe for cats —"
        titleEm="every entry ASPCA-verified."
        dek={`${safeCount} indoor plants you can keep around your cat. Each one has a dedicated page with the ASPCA citation, care notes, and lookalikes.`}
        intro={
          <>
            <p>
              <strong>The indoor plants that are safe to keep around a cat
              are not the same as the popular ones.</strong> Many of the
              statement houseplants of the last decade — fiddle leaf fig,
              monstera, pothos, philodendron, peace lily, ZZ plant — are toxic
              to cats. The good news is that every aesthetic moment has a
              cat-safe substitute, and the ASPCA non-toxic list is longer than
              most cat owners realise.
            </p>
            <p>
              The {safeCount} houseplants below are all on the ASPCA non-toxic
              list, sorted by name. Each entry links to a full page with care
              instructions, real photos, and the toxic look-alike you might be
              confusing it with at the garden centre.
            </p>
            <p>
              <strong>Quick wins.</strong> If you are setting up a cat-safe
              indoor jungle from scratch, the easiest first plants are{" "}
              <Link href="/plants/spider-plant">spider plant</Link>,{" "}
              <Link href="/plants/boston-fern">Boston fern</Link>,{" "}
              <Link href="/plants/areca-palm">areca palm</Link>,{" "}
              <Link href="/plants/parlor-palm">parlor palm</Link>, and{" "}
              <Link href="/plants/calathea">calathea</Link>. They cover the
              hanging, floor-pot, statement-tree, and tabletop slots that most
              toxic houseplants traditionally fill.
            </p>
          </>
        }
        plants={plants}
        filterVerdict="safe"
        afterGrid={
          <section
            className="list-faq"
          >
            <h2>Indoor plants safe for cats — common questions</h2>
            <h3>What is the most popular cat-safe indoor plant?</h3>
            <p>
              <Link href="/plants/spider-plant">Spider plant</Link>. It is on
              every indoor-plant list, is ASPCA non-toxic, and even has a
              mild attractant effect on cats (similar to a low-dose catnip).
              It is also one of the easiest houseplants to keep alive.
            </p>
            <h3>What indoor plant looks like a monstera but is safe?</h3>
            <p>
              <Link href="/plants/calathea">Calathea</Link> — particularly the
              large-leafed cultivars — gives the same big-tropical-leaf vibe
              without the calcium oxalates that make monstera and philodendron
              toxic. <Link href="/plants/prayer-plant">Prayer plant</Link>{" "}
              (Maranta) is the smaller-leaf cousin.
            </p>
            <h3>Are ferns safe for cats?</h3>
            <p>
              <Link href="/plants/boston-fern">Boston fern</Link> and other
              true ferns (Nephrolepis, Adiantum, Pteris) are ASPCA non-toxic.
              The trap is the so-called <Link href="/plants/asparagus-fern">asparagus fern</Link> —
              not a true fern at all, and ASPCA toxic to cats. Always check
              the Latin name.
            </p>
            <h3>Are palms safe for cats?</h3>
            <p>
              True palms — <Link href="/plants/areca-palm">areca palm</Link>,{" "}
              <Link href="/plants/parlor-palm">parlor palm</Link>,{" "}
              <Link href="/plants/ponytail-palm">ponytail palm</Link>,{" "}
              <Link href="/plants/bamboo">bamboo palm</Link> — are ASPCA
              non-toxic. The deadly exception is{" "}
              <Link href="/plants/sago-palm">sago palm</Link>, which despite
              the name is a cycad (not a true palm) and is one of the most
              toxic plants on the ASPCA list.
            </p>
            <h3>What about hanging plants?</h3>
            <p>
              For hanging baskets, <Link href="/plants/spider-plant">spider plant</Link>
              , <Link href="/plants/boston-fern">Boston fern</Link>, and{" "}
              <Link href="/plants/string-of-pearls">string of pearls</Link> all
              cascade well — except string of pearls is{" "}
              <em>not</em> safe (it is ASPCA toxic). For trailing cat-safe
              options, stick to spider plant, Boston fern,{" "}
              <Link href="/plants/swedish-ivy">Swedish ivy</Link>, and{" "}
              <Link href="/plants/wax-plant">wax plant (Hoya)</Link>.
            </p>
          </section>
        }
      />
    </>
  );
}
