const foundations = [
  ["Discover", "Parks, attractions and stories connected in one place."],
  ["Plan", "Useful information shaped around real visits."],
  ["Belong", "A trusted community built by people who love theme parks."],
] as const;

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="page-title">
        <nav aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="TPbuzz home">
            <span className="brand-mark" aria-hidden="true">TP</span>
            <span>TPbuzz</span>
          </a>
          <span className="status"><i aria-hidden="true" />In development</span>
        </nav>

        <div className="hero-copy" id="top">
          <p className="eyebrow">The next chapter is taking shape</p>
          <h1 id="page-title">Where Theme Parks Come Alive.</h1>
          <p className="lede">
            We are building a richer way to discover parks, explore attractions,
            follow the stories and plan what comes next.
          </p>
        </div>

        <div className="track" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
      </section>

      <section className="foundations" aria-labelledby="foundation-title">
        <div className="section-heading">
          <p className="eyebrow">Built with purpose</p>
          <h2 id="foundation-title">One home for every adventure.</h2>
        </div>
        <div className="card-grid">
          {foundations.map(([title, description], index) => (
            <article className="card" key={title}>
              <span className="number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <span>TPbuzz</span>
        <span>Where Theme Parks Come Alive</span>
      </footer>
    </main>
  );
}
