import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, Breadcrumbs, ExperienceFooter, SectionHeading, StatGrid, Timeline } from "../../components/experience";
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
      <main id="main-content" className="experience-page park-experience">
        <section className="experience-hero park-hero">
          <div className="shell">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: country.name, href: `/countries/${country.slug}` }, { label: park.name }]} />
            <div className="experience-hero-grid">
              <div>
                <p className="eyebrow"><span />{park.location}</p>
                <h1>{park.name}</h1>
                <p className="experience-tagline">{park.tagline}</p>
                <p className="experience-summary">{park.summary}</p>
                <div className="status-row"><span className="status-pill"><i />{park.status}</span><span>Operated by {park.operator}</span></div>
              </div>
            </div>
            <StatGrid stats={park.stats} />
          </div>
        </section>

        <section className="experience-section">
          <div className="shell">
            <SectionHeading eyebrow="Why it stands apart" title="A park shaped by its setting." />
            <div className="highlight-grid">
              {park.highlights.map((highlight, index) => <article className="highlight-card" key={highlight.title}><span>0{index + 1}</span><h3>{highlight.title}</h3><p>{highlight.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="experience-section featured-dark-section">
          <div className="shell">
            <SectionHeading eyebrow="Featured attraction" title="Meet the flames." />
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

        <section className="experience-section">
          <div className="shell"><SectionHeading eyebrow="Living history" title="The story keeps moving." /><Timeline entries={park.timeline} /></div>
        </section>
      </main>
      <ExperienceFooter />
    </>
  );
}
