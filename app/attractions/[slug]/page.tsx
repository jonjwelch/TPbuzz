import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AttractionSubnav } from "../../components/attraction-subnav";
import { AttractionStatGrid, Breadcrumbs, ExperienceFooter, SectionHeading, Timeline } from "../../components/experience";
import { SiteHeader } from "../../components/site-header";
import { attractions, getAttraction, getCountry, getPark } from "../../data/catalogue";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return attractions.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const attraction = getAttraction((await params).slug);
  return attraction ? { title: `${attraction.name} at Alton Towers | TPbuzz`, description: attraction.summary } : {};
}

export default async function AttractionPage({ params }: PageProps) {
  const attraction = getAttraction((await params).slug);
  if (!attraction) notFound();
  const park = getPark(attraction.parkSlug);
  const country = park ? getCountry(park.countrySlug) : undefined;
  if (!park || !country) notFound();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="experience-page attraction-experience">
        <section className="experience-hero attraction-hero">
          <div className="shell">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: country.name, href: `/countries/${country.slug}` }, { label: park.name, href: `/parks/${park.slug}` }, { label: attraction.name }]} />
            <div className="experience-hero-grid">
              <div className="attraction-hero-copy">
                <p className="eyebrow"><span />{attraction.type}</p>
                <h1>{attraction.name}</h1>
                <p className="experience-tagline">{attraction.tagline}</p>
                <p className="experience-summary">{attraction.summary}</p>
                <div className="status-row"><span className="status-pill"><i />{attraction.status}</span><span>At {park.name}</span></div>
              </div>
            </div>
            <AttractionStatGrid stats={attraction.stats} />
          </div>
        </section>

        <AttractionSubnav attractionName={attraction.name} />

        <section className="experience-section attraction-overview" id="overview">
          <div className="shell attraction-overview-grid">
            <div className="attraction-overview-copy">
              <p className="eyebrow">Ride overview</p>
              <h2>Wood. Fire. Folklore.</h2>
              <p className="overview-lede">Wicker Man is built around more than track and timber. Its queue, preshow, soundtrack and central effigy turn a compact wooden coaster into one connected piece of theatre.</p>
              <p>Riders move from warnings carved into the landscape to the ceremony inside the preshow, before the train races repeatedly through the six-storey structure at the heart of the story.</p>
              <ul className="attraction-tags" aria-label="Attraction highlights">
                <li>Best after dark</li><li>High thrill</li><li>Indoor preshow</li>
              </ul>
            </div>
            <aside className="attraction-score-card" aria-label="TPbuzz attraction preview">
              <div className="score-card-topline"><span>TPbuzz preview</span><i aria-hidden="true" /></div>
              <div className="score-card-value"><strong>8.8</strong><span>/ 10</span></div>
              <div className="score-card-stars" aria-hidden="true">★★★★<span>★</span></div>
              <p>A design-preview score while community ratings are being built.</p>
              <dl>
                <div><dt>Thrill</dt><dd><span style={{ width: "88%" }} /></dd></div>
                <div><dt>Theming</dt><dd><span style={{ width: "94%" }} /></dd></div>
                <div><dt>Family</dt><dd><span style={{ width: "72%" }} /></dd></div>
              </dl>
            </aside>
          </div>
          <div className="shell">
            <div className="overview-image-card" role="img" aria-label="Wicker Man wooden coaster and burning effigy">
              <span>Signature moment</span>
              <div><strong>Through the flames</strong><p>The central structure is both icon and finale.</p></div>
            </div>
          </div>
        </section>

        <section className="experience-section experience-story-section" id="experience">
          <div className="shell">
            <SectionHeading eyebrow="The experience" title="A story in three acts.">
              <p>From the first symbol in the queue to the final turn, every stage supports the same ritualistic world.</p>
            </SectionHeading>
            <div className="experience-act-grid">
              {attraction.experience.map((act, index) => <article className="experience-act" key={act.title}><span>Act 0{index + 1}</span><h3>{act.title}</h3><p>{act.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="experience-section ride-facts-section" id="ride-stats">
          <div className="shell ride-facts-panel">
            <div><p className="eyebrow">Know before you ride</p><h2>Useful at a glance.</h2></div>
            <dl>
              <div><dt>Opened</dt><dd>{attraction.opened}</dd></div>
              <div><dt>Manufacturer</dt><dd>{attraction.manufacturer}</dd></div>
              <div><dt>Minimum height</dt><dd>{attraction.minimumHeight}</dd></div>
              <div><dt>Top speed</dt><dd>{attraction.topSpeed}</dd></div>
              <div><dt>Track length</dt><dd>{attraction.trackLength}</dd></div>
              <div><dt>Thrill level</dt><dd>{attraction.thrillLevel}</dd></div>
            </dl>
          </div>
        </section>

        <section className="experience-section attraction-gallery-section" id="gallery">
          <div className="shell">
            <SectionHeading eyebrow="Visual story" title="Inside the ritual.">
              <p>A temporary image study showing how galleries will feel once licensed and community photography is available.</p>
            </SectionHeading>
            <div className="attraction-gallery">
              <figure className="gallery-frame gallery-frame-wide"><figcaption><span>01</span><strong>The effigy</strong></figcaption></figure>
              <figure className="gallery-frame gallery-frame-high"><figcaption><span>02</span><strong>Into the structure</strong></figcaption></figure>
              <figure className="gallery-frame gallery-frame-low"><figcaption><span>03</span><strong>After dark</strong></figcaption></figure>
            </div>
          </div>
        </section>

        <section className="experience-section" id="history">
          <div className="shell"><SectionHeading eyebrow="Attraction timeline" title="From project to icon." /><Timeline entries={attraction.timeline} /></div>
        </section>

        <section className="experience-section attraction-reviews-section" id="reviews">
          <div className="shell review-preview-grid">
            <div>
              <p className="eyebrow eyebrow-warm">Community reviews</p>
              <h2>Your experience will shape this page.</h2>
              <p>Ratings, written reviews and audience-specific scores will appear here when TPbuzz accounts and moderation tools are ready.</p>
            </div>
            <div className="review-coming-card">
              <span className="review-coming-label">Coming in the community phase</span>
              <div className="review-score-preview"><strong>—</strong><span>/ 10</span></div>
              <p>No fabricated reviews. This space will only show ratings submitted by real TPbuzz members.</p>
              <div className="review-audiences"><span>Thrill seekers</span><span>Families</span><span>Accessibility</span></div>
            </div>
          </div>
        </section>

        <section className="experience-section attraction-next-section">
          <div className="shell attraction-next-card">
            <div><p className="eyebrow">Continue exploring</p><h2>Discover {park.name}.</h2><p>Return to the park experience for its story, highlights and attraction collection.</p></div>
            <Link className="button button-primary" href={`/parks/${park.slug}`}>Explore the park <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <ExperienceFooter />
    </>
  );
}
