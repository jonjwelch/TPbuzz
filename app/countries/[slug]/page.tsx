import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ExperienceFooter, SectionHeading, StatGrid, ArrowIcon } from "../../components/experience";
import { SiteHeader } from "../../components/site-header";
import { countries, getCountry, getPark } from "../../data/catalogue";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return countries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const country = getCountry((await params).slug);
  return country ? { title: `${country.name} theme parks | TPbuzz`, description: country.introduction } : {};
}

export default async function CountryPage({ params }: PageProps) {
  const country = getCountry((await params).slug);
  if (!country) notFound();
  const featuredParks = country.parkSlugs.map(getPark).filter((park) => park !== undefined);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="experience-page country-experience">
        <section className="experience-hero country-hero">
          <div className="experience-art" aria-hidden="true"><i /><i /><i /></div>
          <div className="shell">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: country.name }]} />
            <div className="experience-hero-grid">
              <div>
                <p className="eyebrow"><span />Explore by country</p>
                <h1>{country.name}</h1>
                <p className="experience-tagline">{country.eyebrow}</p>
                <p className="experience-summary">{country.introduction}</p>
              </div>
              <div className="country-compass" aria-hidden="true"><span>UK</span><i /></div>
            </div>
            <StatGrid stats={country.stats} />
          </div>
        </section>

        <section className="experience-section">
          <div className="shell">
            <SectionHeading eyebrow="Featured destination" title="Begin with a landmark.">
              <p>This first connected preview establishes the pattern that every future park page will follow.</p>
            </SectionHeading>
            <div className="feature-link-grid">
              {featuredParks.map((park) => (
                <Link className="destination-card destination-card-large" href={`/parks/${park.slug}`} key={park.slug}>
                  <div className="destination-art park-art" aria-hidden="true"><i /><i /><i /></div>
                  <div className="destination-copy">
                    <span>{park.location}</span><h2>{park.name}</h2><p>{park.tagline}</p>
                  </div>
                  <ArrowIcon />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section region-section">
          <div className="shell region-panel">
            <div><p className="eyebrow">Browse the nations</p><h2>Four distinct park landscapes.</h2></div>
            <ul>{country.regions.map((region, index) => <li key={region}><span>0{index + 1}</span>{region}</li>)}</ul>
          </div>
        </section>
      </main>
      <ExperienceFooter />
    </>
  );
}
