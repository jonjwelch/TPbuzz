import { SiteHeader } from "./components/site-header";
import { ArrowLink, FeatureIcon } from "./components/ui";

const discoveries = [
  {
    icon: "map" as const,
    eyebrow: "Explore the world",
    title: "Parks",
    description: "Find the places that match your perfect day, from local favourites to destination resorts.",
    meta: "Countries · Resorts · Maps",
  },
  {
    icon: "coaster" as const,
    eyebrow: "Know every detail",
    title: "Attractions",
    description: "Go beyond basic statistics with history, accessibility, reviews and practical ride guidance.",
    meta: "Coasters · Dark rides · More",
  },
  {
    icon: "story" as const,
    eyebrow: "Follow what changes",
    title: "Stories",
    description: "Connect today’s news with construction, timelines and the moments that shaped each park.",
    meta: "News · History · Community",
  },
] as const;

const signals = [
  ["Live", "Queue intelligence", "Know what is moving before you arrive."],
  ["Today", "Park conditions", "Weather, hours and events in one clear view."],
  ["For you", "Personal discovery", "Follow the parks and rides that matter to you."],
] as const;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="page-title">
          <div className="hero-atmosphere" aria-hidden="true">
            <span className="orb orb-sky" />
            <span className="orb orb-coral" />
            <span className="track-line track-line-one" />
            <span className="track-line track-line-two" />
          </div>

          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span />The world of theme parks, connected</p>
              <h1 id="page-title">Every park.<br />Every ride.<br /><em>Every story.</em></h1>
              <p className="lede">
                TPbuzz is building a richer way to discover parks, understand attractions,
                follow what is changing and plan the days you will never forget.
              </p>
              <div className="hero-actions">
                <ArrowLink href="/countries/united-kingdom">Explore the UK</ArrowLink>
                <ArrowLink href="#roadmap" variant="secondary">See what comes next</ArrowLink>
              </div>
            </div>

            <div className="discovery-preview" aria-label="Preview of TPbuzz discovery">
              <div className="preview-toolbar">
                <span className="preview-kicker">Discover</span>
                <span className="preview-pulse"><i />Live preview</span>
              </div>
              <div className="preview-search">
                <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 4 4" /></svg>
                <span>Search parks, rides and stories</span>
                <kbd>⌘ K</kbd>
              </div>
              <div className="preview-feature">
                <div className="preview-landscape" aria-hidden="true">
                  <span className="preview-sun" />
                  <svg viewBox="0 0 480 230" preserveAspectRatio="none">
                    <path className="coaster-track" d="M-10 190C70 185 62 43 151 43s87 160 181 115c58-28 57-90 158-93" />
                    <path className="coaster-supports" d="M50 148v50M151 43v155M246 148v50M351 145v53M430 78v120" />
                  </svg>
                </div>
                <div className="preview-feature-copy">
                  <span className="preview-label">Featured destination</span>
                  <strong>Your next adventure starts here.</strong>
                  <div className="preview-stats">
                    <span><b>Connected</b> park guides</span>
                    <span><b>Trusted</b> community insight</span>
                  </div>
                </div>
              </div>
              <div className="preview-dots" aria-hidden="true"><i /><i /><i /></div>
            </div>
          </div>
        </section>

        <section className="section discovery-section" id="explore" aria-labelledby="explore-title">
          <div className="shell">
            <div className="section-intro split-heading">
              <div>
                <p className="eyebrow">Designed for discovery</p>
                <h2 id="explore-title">Start with what excites you.</h2>
              </div>
              <p>Whether you are planning a first visit or following every construction update, TPbuzz brings the useful details and the bigger story together.</p>
            </div>

            <div className="discovery-grid">
              {discoveries.map((item, index) => (
                <article className="discovery-card" key={item.title}>
                  <div className="card-topline">
                    <span className="icon-wrap"><FeatureIcon name={item.icon} /></span>
                    <span className="card-index">0{index + 1}</span>
                  </div>
                  <p className="card-eyebrow">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="card-meta"><span>{item.meta}</span><i aria-hidden="true">↗</i></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section signal-section" id="why-tpbuzz" aria-labelledby="signal-title">
          <div className="signal-glow" aria-hidden="true" />
          <div className="shell signal-layout">
            <div className="signal-copy">
              <p className="eyebrow eyebrow-warm">More than a directory</p>
              <h2 id="signal-title">A living view of every adventure.</h2>
              <p>Facts are only the beginning. TPbuzz will connect live conditions, trusted knowledge and community experience so every page feels current and useful.</p>
              <div className="signal-status"><span><i />Foundation online</span><span>Project Horizon · v0.2</span></div>
            </div>
            <div className="signal-list">
              {signals.map(([label, title, description]) => (
                <article className="signal-card" key={title}>
                  <span>{label}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                  <i aria-hidden="true">→</i>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section roadmap-section" id="roadmap" aria-labelledby="roadmap-title">
          <div className="shell roadmap-panel">
            <div>
              <p className="eyebrow">The journey has started</p>
              <h2 id="roadmap-title">Built carefully.<br />Made to grow.</h2>
            </div>
            <div className="roadmap-copy">
              <p>The platform foundation is now live. Next come the connected park database, editorial tools and the first true discovery experiences.</p>
              <span className="roadmap-marker"><i />Now building the core experience</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div><strong>TPbuzz</strong><span>Where Theme Parks Come Alive.</span></div>
          <p>Project Horizon · Building in the open</p>
        </div>
      </footer>
    </>
  );
}
