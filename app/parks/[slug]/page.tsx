import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs, ExperienceFooter, Timeline } from "../../components/experience";
import { ParkAttractionDirectory } from "../../components/park-attraction-directory";
import { ParkSubnav } from "../../components/park-subnav";
import { ParkQuickActions } from "../../components/park-visit-dashboard";
import { SiteHeader } from "../../components/site-header";
import { getCountry, getPark, getParkAttractionDirectory, parks } from "../../data/catalogue";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return parks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const park = getPark((await params).slug);
  return park ? { title: `${park.name} | TPbuzz`, description: park.summary } : {};
}

export default async function ParkPage({ params }: PageProps) {
  const park = getPark((await params).slug);
  if (!park) notFound();
  const country = getCountry(park.countrySlug);
  if (!country) notFound();
  const parkAttractions = getParkAttractionDirectory(park.slug);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="experience-page park-experience park-experience-v2">
        <section className="experience-hero park-hero park-hero-v2">
          <div className="shell">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: country.name, href: `/countries/${country.slug}` }, { label: park.name }]} />
            <div className="experience-hero-grid park-hero-grid">
              <div className="park-hero-copy">
                <p className="eyebrow"><span />{park.location}</p>
                <h1>{park.name}</h1>
                <p className="experience-tagline">{park.tagline}</p>
                <p className="experience-summary">{park.summary}</p>
                <div className="status-row">
                  <span className="status-pill"><i />{park.status}</span>
                  <span>Operated by {park.operator}</span>
                </div>
              </div>
            </div>
            <ParkQuickActions park={park} />
          </div>
        </section>

        <ParkSubnav parkName={park.name} />

        <section className="experience-section park-overview-section" id="overview">
          <div className="shell">
            <div className="park-overview-grid">
              <div className="park-overview-copy">
                <p className="eyebrow">Park overview</p>
                {park.overview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <ul className="park-tags" aria-label="Park highlights">
                  {park.overview.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
              <aside className="park-score-card" aria-label="TPbuzz park preview rating">
                <p className="park-score-label">TPbuzz preview</p>
                <div className="park-score-layout">
                  <div className="park-score-number"><strong>{park.overview.score}</strong><span>/ 10</span><div aria-label="Four and a half stars">★★★★<i>★</i></div></div>
                  <dl className="park-rating-signals">
                    {park.overview.ratingSignals.map((signal) => <div key={signal.label}><dt>{signal.label}</dt><dd><span style={{ width: `${signal.value}%` }} /></dd></div>)}
                  </dl>
                </div>
                <p className="park-score-note">An editorial preview while community ratings and verified visit data are being built.</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="experience-section featured-dark-section park-rides-section" id="attractions">
          <div className="shell">
            <div className="park-section-intro park-section-intro-light">
              <div><p className="eyebrow">Rides &amp; attractions</p><h2>Choose your next adventure.</h2></div>
              <p>Explore every connected ride guide, from essential statistics and accessibility details to history, reviews and live information.</p>
            </div>
            <ParkAttractionDirectory attractions={parkAttractions} />
          </div>
        </section>

        <section className="experience-section park-discovery-section">
          <div className="shell">
            <div className="park-section-intro">
              <div><p className="eyebrow">Discover the resort</p><h2>More than the headline rides.</h2></div>
              <p>Move from landscaped heritage to terrain-hugging thrills and story-led attractions without leaving the same extraordinary estate.</p>
            </div>
            <div className="park-story-grid">
              <article className="park-story-card park-story-card-wide">
                <Image src="/images/parks/alton-towers/gardens-generated.webp" alt="Concept view of historic gardens and estate architecture" fill sizes="(max-width: 760px) 100vw, 66vw" />
                <div><span>Slow the pace</span><h3>The gardens</h3><p>A historic landscape at the heart of the resort.</p></div>
              </article>
              <article className="park-story-card">
                <Image src="/images/parks/alton-towers/terrain-coaster-generated.webp" alt="Concept view of a roller coaster running through a wooded ravine" fill sizes="(max-width: 760px) 100vw, 34vw" />
                <div><span>Built around the land</span><h3>Terrain-led thrills</h3></div>
              </article>
              <article className="park-story-card park-story-card-detail">
                <span className="park-story-index">01 / 03</span><div><span>Plan the whole day</span><h3>One connected resort</h3><p>Rides, gardens, hotels and seasonal experiences brought into one guide.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="experience-section park-history-section" id="history">
          <div className="shell park-history-grid">
            <div><p className="eyebrow">Living history</p><h2>The story keeps moving.</h2><p>From celebrated gardens to landmark attractions, each era has added another layer to the estate.</p></div>
            <Timeline entries={park.timeline} />
          </div>
        </section>

        <section className="experience-section attraction-reviews-section park-reviews-section" id="reviews">
          <div className="shell review-preview-grid">
            <div>
              <p className="eyebrow eyebrow-warm">Community reviews</p>
              <h2>Your visits will shape this guide.</h2>
              <p>Park ratings, written reviews and audience-specific scores will appear here when TPbuzz accounts and moderation tools are ready.</p>
            </div>
            <div className="review-coming-card">
              <span className="review-coming-label">Coming in the community phase</span>
              <div className="review-score-preview"><strong>—</strong><span>/ 10</span></div>
              <p>No fabricated reviews. This space will only show ratings submitted by real TPbuzz members.</p>
              <div className="review-audiences"><span>Thrill seekers</span><span>Families</span><span>Accessibility</span></div>
            </div>
          </div>
        </section>
      </main>
      <ExperienceFooter />
    </>
  );
}
