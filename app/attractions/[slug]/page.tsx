import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ExperienceFooter, SectionHeading, StatGrid, Timeline } from "../../components/experience";
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
              <div>
                <p className="eyebrow"><span />{attraction.type}</p>
                <h1>{attraction.name}</h1>
                <p className="experience-tagline">{attraction.tagline}</p>
                <p className="experience-summary">{attraction.summary}</p>
                <div className="status-row"><span className="status-pill"><i />{attraction.status}</span><span>At {park.name}</span></div>
              </div>
            </div>
            <StatGrid stats={attraction.stats} />
          </div>
        </section>

        <section className="experience-section">
          <div className="shell">
            <SectionHeading eyebrow="The experience" title="A story in three acts.">
              <p>From the first symbol in the queue to the final turn, every stage supports the same ritualistic world.</p>
            </SectionHeading>
            <div className="experience-act-grid">
              {attraction.experience.map((act, index) => <article className="experience-act" key={act.title}><span>Act 0{index + 1}</span><h3>{act.title}</h3><p>{act.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="experience-section ride-facts-section">
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

        <section className="experience-section">
          <div className="shell"><SectionHeading eyebrow="Attraction timeline" title="From project to icon." /><Timeline entries={attraction.timeline} /></div>
        </section>
      </main>
      <ExperienceFooter />
    </>
  );
}
