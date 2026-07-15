import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, Breadcrumbs, ExperienceFooter, ParkStatGrid, Timeline } from "../../components/experience";
import { ParkSubnav } from "../../components/park-subnav";
import { SiteHeader } from "../../components/site-header";
import { getAttraction, getCountry, getPark, parks } from "../../data/catalogue";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return parks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const park = getPark((await params).slug);
  return park ? { title: `${park.name} | TPbuzz`, description: park.summary } : {};
}

const ratingSignals = [
  { label: "Thrills", value: 92 },
  { label: "Atmosphere", value: 91 },
  { label: "Families", value: 82 },
];

export default async function ParkPage({ params }: PageProps) {
  const park = getPark((await params).slug);
  if (!park) notFound();
  const country = getCountry(park.countrySlug);
  if (!country) notFound();
  const featuredAttractions = park.attractionSlugs.map(getAttraction).filter((attraction) => attraction !== undefined);

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
            <ParkStatGrid stats={park.stats} />
          </div>
        </section>

        <ParkSubnav parkName={park.name} />

        <section className="experience-section park-overview-section" id="overview">
          <div className="shell park-overview-grid">
            <div className="park-overview-copy">
              <p className="eyebrow">Park overview</p>
              <h2>Adventure, shaped by the landscape.</h2>
              <p>Alton Towers is not a park laid out on a blank canvas. Historic gardens, woodland paths and dramatic changes in terrain shape how every part of the resort is discovered.</p>
              <p>Its biggest attractions sit alongside quiet corners and traces of the estate that came before them, creating a day that can feel both intensely energetic and unexpectedly restorative.</p>
              <ul className="park-tags" aria-label="Park highlights">
                <li>Destination resort</li><li>Major thrill rides</li><li>Historic gardens</li>
              </ul>
            </div>
            <aside className="park-score-card" id="reviews" aria-label="TPbuzz park preview rating">
              <p className="park-score-label">TPbuzz preview</p>
              <div className="park-score-layout">
                <div className="park-score-number"><strong>9.1</strong><span>/ 10</span><div aria-label="Four and a half stars">★★★★<i>★</i></div></div>
                <dl className="park-rating-signals">
                  {ratingSignals.map((signal) => <div key={signal.label}><dt>{signal.label}</dt><dd><span style={{ width: `${signal.value}%` }} /></dd></div>)}
                </dl>
              </div>
              <p className="park-score-note">An editorial preview while community ratings and verified visit data are being built.</p>
            </aside>
          </div>
        </section>

        <section className="experience-section park-discovery-section" id="attractions">
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

        <section className="experience-section featured-dark-section park-featured-section">
          <div className="shell">
            <div className="park-section-intro park-section-intro-light">
              <div><p className="eyebrow">Featured attraction</p><h2>Meet the flames.</h2></div>
              <p>Start with one of the resort’s most distinctive modern stories, then follow every connected detail.</p>
            </div>
            <div className="feature-link-grid">
              {featuredAttractions.map((attraction) => (
                <Link className="destination-card ride-destination-card" href={`/attractions/${attraction.slug}`} key={attraction.slug}>
                  <div className="destination-art wicker-art" aria-hidden="true"><i /><i /><i /></div>
                  <div className="destination-copy"><span>{attraction.type}</span><h2>{attraction.name}</h2><p>{attraction.tagline}</p></div>
                  <ArrowIcon />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section park-planning-section" id="plan">
          <div className="shell">
            <div className="park-section-intro"><div><p className="eyebrow">Plan your visit</p><h2>Know before you go.</h2></div><p>The live planning layer will eventually bring today’s hours, queues, weather and practical guidance together here.</p></div>
            <div className="park-planning-grid">
              <article><span>01</span><h3>Opening &amp; access</h3><p>Seasonal hours, travel information and arrival guidance.</p><b>Live data coming next</b></article>
              <article><span>02</span><h3>Build your day</h3><p>Balance headline rides, quieter experiences and time to explore.</p><b>Planning tools in development</b></article>
              <article><span>03</span><h3>Stay at the resort</h3><p>Compare hotels and understand how a short break changes the visit.</p><b>Accommodation guide planned</b></article>
            </div>
          </div>
        </section>

        <section className="experience-section park-history-section" id="history">
          <div className="shell park-history-grid">
            <div><p className="eyebrow">Living history</p><h2>The story keeps moving.</h2><p>From celebrated gardens to landmark attractions, each era has added another layer to the estate.</p></div>
            <Timeline entries={park.timeline} />
          </div>
        </section>
      </main>
      <ExperienceFooter />
    </>
  );
}
