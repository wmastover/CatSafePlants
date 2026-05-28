import Link from "next/link";
import { PlantImage } from "./PlantImage";
import { MdxBody } from "./MdxBody";
import { SiteNav } from "./SiteNav";
import { PlantBreadcrumbs } from "./PlantBreadcrumbs";
import { PlantJsonLd } from "./PlantJsonLd";
import { amazonSearchUrl, formatPrice, siteConfig } from "@/lib/site.config";
import type { PlantDocument } from "@/lib/plant-schema";
import { getRelatedPlants } from "@/lib/plants";

function CareIcon({ type }: { type?: string }) {
  const icons: Record<string, React.ReactNode> = {
    light: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1" />
      </svg>
    ),
    water: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 2c4 5 6 9 6 12a6 6 0 1 1-12 0c0-3 2-7 6-12Z" />
      </svg>
    ),
    soil: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 12h18M3 7h18M3 17h18" />
      </svg>
    ),
    placement: (
      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M5 21V9l7-5 7 5v12" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  };
  return <>{icons[type ?? "light"] ?? icons.light}</>;
}

function verdictTag(verdict: string): string {
  if (verdict === "safe") return "◦ Safe";
  if (verdict === "toxic") return "◦ Toxic";
  return "◦ Unknown";
}

function splitTitle(title: string): { main: string; em: string } {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return { main: title, em: "" };
  const em = words.pop() ?? "";
  return { main: words.join(" "), em };
}

interface PlantPageProps {
  plant: PlantDocument;
  pageUrl: string;
}

export function PlantPage({ plant, pageUrl }: PlantPageProps) {
  const fm = plant.frontmatter;
  const isToxic = fm.verdict === "toxic";
  const related = getRelatedPlants(fm.related);
  const titleParts = splitTitle(fm.title);
  const factsClass = fm.facts.length <= 4 ? "facts facts-4" : "facts";

  const obsSection = fm.observationsSection ?? {
    lab: "§ II · Observed effects",
    title: "What we have ",
    titleEm: "actually seen.",
  };
  const cultivarsSection = fm.cultivarsSection ?? {
    lab: "§ III · Cultivars in cultivation",
    title: "Four common ",
    titleEm: "varieties.",
  };
  const careSection = fm.careSection ?? {
    lab: "§ IV · Husbandry",
    title: "Keeping the plant ",
    titleEm: "alive.",
  };
  const sourcesSection = fm.sourcesSection ?? {
    lab: "§ V · Sources & references",
    title: "",
  };
  const relatedSection = fm.relatedSection ?? {
    lab: isToxic ? "§ IV · Also avoid" : "§ VI · Adjacent species",
    title: isToxic ? "Other plants " : "If you liked this, ",
    titleEm: isToxic ? "not to bring home." : "also safe.",
  };
  const lookalikesSection = fm.lookalikesSection ?? {
    lab: "§ I · Safe lookalikes",
    title: "Three plants that look the part, ",
    titleEm: "without the risk.",
  };

  return (
    <>
      <PlantJsonLd plant={plant} url={pageUrl} />
      <main className={`page${isToxic ? " toxic" : ""}`}>
        <SiteNav active="library" />
        <PlantBreadcrumbs plant={fm} />

        <section className="hero">
          <div className="hero-left">
            <h1 className="h1">
              {titleParts.main}
              {titleParts.em && (
                <>
                  <br />
                  <em>{titleParts.em}.</em>
                </>
              )}
            </h1>
            <p className="latin">{fm.latin}</p>

            <div className={`verdict-card${isToxic ? " toxic" : ""}`}>
              <div className="verdict-mark">{fm.verdictMark}</div>
              <div className="verdict-text">
                <div className="label">{fm.verdictLabel}</div>
                <div
                  className="ruling"
                  dangerouslySetInnerHTML={{ __html: fm.verdictText }}
                />
              </div>
            </div>

            {!isToxic && <p className="dek">{fm.dek}</p>}

            {!isToxic && fm.affiliate && (
              <div className="buy-card">
                <div className="kicker">Where to buy</div>
                <div className="buy-row">
                  <div className="buy-from">
                    <div className="label">From</div>
                    <div className="amount">{formatPrice(fm.affiliate.price)}</div>
                  </div>
                  <a
                    href={amazonSearchUrl(fm.affiliate.amazonQuery)}
                    target="_blank"
                    rel="sponsored noopener nofollow"
                    className="buy-btn"
                  >
                    Buy on Amazon <span className="arrow">→</span>
                  </a>
                </div>
                {fm.affiliate.altLinks && fm.affiliate.altLinks.length > 0 && (
                  <div className="buy-alt">
                    Also at{" "}
                    {fm.affiliate.altLinks.map((link, i) => (
                      <span key={link.url}>
                        {i > 0 && " · "}
                        <a href={link.url} target="_blank" rel="sponsored noopener nofollow">
                          {link.label}
                        </a>
                      </span>
                    ))}
                  </div>
                )}
                <div className="buy-disclose">{siteConfig.affiliate.discloseText}</div>
              </div>
            )}
          </div>

          <div className="hero-right">
            <div className="figure">
              <PlantImage
                slug={fm.slug}
                imagePath={fm.hero.src}
                alt={fm.hero.alt}
                placeholder={fm.hero.alt}
              />
              {fm.hero.tag && <div className="figure-tag">{fm.hero.tag}</div>}
              {fm.hero.scale && (
                <div className="figure-scale">
                  <div className="bar" />
                  <div>{fm.hero.scale}</div>
                </div>
              )}
            </div>
            {fm.hero.caption && (
              <p className="figcaption">
                <strong>Plate I</strong>
                {fm.hero.caption}
              </p>
            )}
          </div>

          {isToxic && <p className="dek">{fm.dek}</p>}
        </section>

        {isToxic && fm.lookalikes && fm.lookalikes.length > 0 && (
          <>
            <div className="section-rule" id="lookalikes">
              <div className="lab">{lookalikesSection.lab}</div>
              <h2>
                {lookalikesSection.title}
                {lookalikesSection.titleEm && <em>{lookalikesSection.titleEm}</em>}
              </h2>
            </div>
            {fm.lookalikesIntro && (
              <div className="swap-intro">
                <div />
                <p>{fm.lookalikesIntro}</p>
              </div>
            )}
            <section className="swap">
              {fm.lookalikes.map((item) => (
                <div className="swap-card" key={item.title}>
                  <div className="pic">
                    <PlantImage
                      slug={item.slug ?? fm.slug}
                      imagePath={item.image}
                      alt={item.title}
                      placeholder={item.title}
                    />
                    <div className="tag">◦ Cat safe</div>
                  </div>
                  <h4>{item.title}</h4>
                  <div className="lat">{item.latin}</div>
                  <p className="why">{item.why}</p>
                  {item.price && (
                    <div className="from">
                      From <strong>{formatPrice(item.price)}</strong>
                    </div>
                  )}
                  <a
                    href={amazonSearchUrl(item.amazonQuery)}
                    target="_blank"
                    rel="sponsored noopener nofollow"
                    className="buy"
                  >
                    Buy on Amazon <span className="arrow">→</span>
                  </a>
                </div>
              ))}
            </section>
          </>
        )}

        <div className={factsClass}>
          <div className="facts-label">At a glance</div>
          {fm.facts.map((fact) => (
            <div className="fact" key={fact.label}>
              <div className="k">{fact.label}</div>
              <div className="v">
                {fact.italic ? <em>{fact.value}</em> : fact.value}
                {fact.sub && <small>{fact.sub}</small>}
              </div>
            </div>
          ))}
        </div>

        <section className="body">
          <div className="col">
            <h2>
              {fm.bodyTitle}
              {fm.bodyTitleEm && <em>{fm.bodyTitleEm}</em>}
            </h2>
            <MdxBody content={plant.content} />
            {fm.pullQuote && <div className="pull">&ldquo;{fm.pullQuote}&rdquo;</div>}
          </div>

          {fm.sidebar && fm.sidebar.length > 0 && (
            <aside className="col">
              {fm.sidebar.map((card) => (
                <div
                  className={`side-card${card.warn ? " warn" : ""}`}
                  key={card.kicker}
                >
                  <div className="kicker">{card.kicker}</div>
                  <h4 dangerouslySetInnerHTML={{ __html: card.title }} />
                  {card.body && (
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "16px",
                        lineHeight: 1.45,
                        margin: "0 0 8px",
                      }}
                    >
                      {card.body}
                    </p>
                  )}
                  {card.items && card.items.length > 0 && (
                    card.ordered ? (
                      <ol>
                        {card.items.map((item) => (
                          <li key={item.text}>
                            <div className="it">
                              {item.text}
                              {item.sub && <small>{item.sub}</small>}
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ul>
                        {card.items.map((item) => (
                          <li key={item.text}>
                            <div className="it">
                              {item.text}
                              {item.sub && <small>{item.sub}</small>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                  {card.footer && (
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontStyle: "italic",
                        fontSize: "14px",
                        color: "var(--sage)",
                        margin: "8px 0 0",
                        lineHeight: 1.4,
                      }}
                    >
                      {card.footer}
                    </p>
                  )}
                </div>
              ))}
            </aside>
          )}
        </section>

        <div className="section-rule">
          <div className="lab">{obsSection.lab}</div>
          <h2>
            {obsSection.title}
            {obsSection.titleEm && <em>{obsSection.titleEm}</em>}
          </h2>
        </div>
        <section className="obs">
          {fm.observations.map((obs, i) => (
            <div className="obs-card" key={obs.title}>
              <div className="n">Obs. {String(i + 1).padStart(2, "0")}</div>
              <h4>{obs.title}</h4>
              <p>{obs.description}</p>
              <div className={`freq${obs.warn ? " warn" : ""}`}>{obs.frequency}</div>
            </div>
          ))}
        </section>

        {!isToxic && fm.cultivars && fm.cultivars.length > 0 && (
          <>
            <div className="section-rule">
              <div className="lab">{cultivarsSection.lab}</div>
              <h2>
                {cultivarsSection.title}
                {cultivarsSection.titleEm && <em>{cultivarsSection.titleEm}</em>}
              </h2>
            </div>
            <section className="varieties">
              {fm.cultivars.map((variety) => (
                <div className="variety" key={variety.name}>
                  <div className="pic">
                    <PlantImage
                      slug={fm.slug}
                      imagePath={variety.image}
                      alt={variety.name}
                      placeholder={variety.name}
                    />
                    <div className="v-tag">{variety.tag}</div>
                  </div>
                  <h4>
                    {variety.name}
                    {variety.subtitle && <em> ({variety.subtitle})</em>}
                  </h4>
                  <p>{variety.description}</p>
                </div>
              ))}
            </section>
          </>
        )}

        {!isToxic && fm.care && fm.care.length > 0 && (
          <>
            <div className="section-rule">
              <div className="lab">{careSection.lab}</div>
              <h2>
                {careSection.title}
                {careSection.titleEm && <em>{careSection.titleEm}</em>}
              </h2>
            </div>
            <section className="care">
              {fm.care.map((item) => (
                <div className="care-item" key={item.key}>
                  <CareIcon type={item.icon} />
                  <div className="k">{item.key}</div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <div className="scale">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className={i < item.scale ? "on" : undefined} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        <section className="sources">
          <div className="lab">{sourcesSection.lab}</div>
          <ol>
            {fm.sources.map((source) => (
              <li key={source.citation}>
                <div className="src-body">
                  {source.url ? (
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      <span dangerouslySetInnerHTML={{ __html: source.citation }} />
                    </a>
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: source.citation }} />
                  )}
                  {source.note && <small>{source.note}</small>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {related.length > 0 && (
          <>
            <div className="section-rule">
              <div className="lab">{relatedSection.lab}</div>
              <h2>
                {relatedSection.title}
                {relatedSection.titleEm && <em>{relatedSection.titleEm}</em>}
              </h2>
            </div>
            <section className="related">
              {related.map((rel) => {
                const relToxic = rel.frontmatter.verdict === "toxic";
                return (
                  <Link
                    href={`/plants/${rel.slug}/`}
                    className={`related-card${relToxic ? " warn" : ""}`}
                    key={rel.slug}
                  >
                    <div className="pic">
                      <PlantImage
                        slug={rel.slug}
                        imagePath={rel.frontmatter.hero.src}
                        alt={rel.frontmatter.title}
                        placeholder={rel.frontmatter.title}
                      />
                    </div>
                    <div className="meta">
                      <div className="mark" />
                      <div>
                        <h4>{rel.frontmatter.title}</h4>
                        <div className="lat">{rel.frontmatter.latin}</div>
                      </div>
                      <div className="v-tag">{verdictTag(rel.frontmatter.verdict)}</div>
                    </div>
                  </Link>
                );
              })}
            </section>
          </>
        )}

        <div className="colophon">
          <div>
            cat{" "}
            <em
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                textTransform: "none",
                letterSpacing: 0,
                color: "var(--sage)",
              }}
            >
              safe
            </em>{" "}
            plants · {fm.plateNumber ?? "Pl. —"}
          </div>
          <div className="end">{fm.colophonEnd ?? "— end of entry —"}</div>
          <div className="right">
            {new Date(fm.lastReviewed).toLocaleDateString("en-GB", {
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </main>
    </>
  );
}
