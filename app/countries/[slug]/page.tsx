import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ExperienceFooter, StatGrid } from "../../components/experience";
import { CountryParkDirectory } from "../../components/country-park-directory";
import { CountrySubnav } from "../../components/country-subnav";
import { SiteHeader } from "../../components/site-header";
import { countries, getCountry } from "../../data/catalogue";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return countries.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const country = getCountry((await params).slug);
  return country ? { title: `${country.name} theme parks | TPbuzz`, description: country.introduction } : {};
}

export default async function CountryPage({ params }: PageProps) {
  const country = getCountry((await params).slug);
  if (!country) notFound();

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    <main id="main-content" className="experience-page country-experience-v2">
      <section className="experience-hero country-hero-v2">
        <div className="shell">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: country.name }]} />
          <div className="experience-hero-grid country-hero-grid"><div className="country-hero-copy">
            <p className="eyebrow"><span />Explore by country</p>
            <h1>{country.name}</h1>
            <p className="experience-tagline">{country.eyebrow}</p>
            <p className="experience-summary">{country.introduction}</p>
          </div></div>
          <span className="generated-image-label">Generated concept image</span>
          <StatGrid stats={country.stats} />
        </div>
      </section>

      <CountrySubnav countryName={country.name} />

      <section className="experience-section country-overview-section" id="overview">
        <div className="shell country-intro-grid">
          <div><p className="eyebrow">Country overview</p><p className="country-intro-lede">Coastal amusement parks, woodland resorts and story-led family destinations make the United Kingdom one of Europe’s most varied park landscapes.</p></div>
          <p>Start with a curated preview of recognisable destinations. As TPbuzz grows, every park card will connect to ride guides, planning information, history, news and community reviews.</p>
        </div>
      </section>

      <section className="experience-section country-parks-section" id="parks">
        <div className="shell">
          <div className="park-section-intro park-section-intro-light"><div><p className="eyebrow">Parks to discover</p><h2>Choose your next adventure.</h2></div><p>Search the first country collection by park, location or the kind of day out you want. Alton Towers already opens into a complete guide; the remaining destinations show how the national directory will grow.</p></div>
          <CountryParkDirectory parks={country.parkDirectory} />
        </div>
      </section>

      <section className="experience-section country-regions-section" id="regions"><div className="shell region-panel"><div><p className="eyebrow">Browse the nations</p><h2>Four distinct park landscapes.</h2><p>Regional discovery will eventually connect parks with nearby attractions, transport, accommodation and trip ideas.</p></div><ul>{country.regions.map((region, index) => <li key={region}><span>0{index + 1}</span>{region}</li>)}</ul></div></section>
    </main>
    <ExperienceFooter />
  </>;
}
