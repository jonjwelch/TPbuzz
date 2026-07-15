"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { AttractionCategory, AttractionDirectoryItem } from "../data/catalogue";

const filters: Array<"All attractions" | AttractionCategory> = [
  "All attractions",
  "Thrill rides",
  "Family rides",
  "Children's rides",
  "Indoor attractions",
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function DirectoryCard({ attraction }: { attraction: AttractionDirectoryItem }) {
  const content = (
    <>
      <Image
        src={attraction.heroImage}
        alt={`Generated concept view for ${attraction.name}`}
        fill
        sizes="(max-width: 760px) 100vw, (max-width: 1120px) 50vw, 33vw"
      />
      <span className="park-card-image-label">{attraction.imageLabel}</span>
      <span className="park-directory-status"><i aria-hidden="true" />{attraction.status}</span>
      <div className="park-attraction-card-copy">
        <span>{attraction.type}</span>
        <h3>{attraction.name}</h3>
        <p>{attraction.tagline}</p>
        <dl className="park-card-facts">
          <div><dt>Area</dt><dd>{attraction.area}</dd></div>
          <div><dt>Minimum height</dt><dd>{attraction.minimumHeight}</dd></div>
        </dl>
        <div className={`park-guide-state${attraction.hasGuide ? " is-published" : ""}`}>
          {attraction.hasGuide ? "Explore full guide" : "Full guide coming soon"}
          {attraction.hasGuide ? <b aria-hidden="true">↗</b> : null}
        </div>
      </div>
    </>
  );

  return attraction.hasGuide ? (
    <Link className="park-attraction-card park-directory-card" href={`/attractions/${attraction.slug}`}>
      {content}
    </Link>
  ) : (
    <article className="park-attraction-card park-directory-card is-preview">
      {content}
    </article>
  );
}

export function ParkAttractionDirectory({ attractions }: { attractions: AttractionDirectoryItem[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All attractions");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => Object.fromEntries(filters.map((filter) => [
    filter,
    filter === "All attractions" ? attractions.length : attractions.filter(({ categories }) => categories.includes(filter)).length,
  ])), [attractions]);

  const visibleAttractions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("en-GB");
    return attractions.filter((attraction) => {
      const matchesFilter = activeFilter === "All attractions" || attraction.categories.includes(activeFilter);
      const searchableText = [attraction.name, attraction.type, attraction.area, attraction.tagline, ...attraction.categories].join(" ").toLocaleLowerCase("en-GB");
      return matchesFilter && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeFilter, attractions, query]);

  return (
    <div className="park-directory">
      <div className="park-directory-toolbar">
        <div className="park-directory-search">
          <label htmlFor="park-attraction-search">Search attractions</label>
          <div><SearchIcon /><input id="park-attraction-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘coaster’ or ‘family’" /></div>
        </div>
        <div className="park-directory-count" aria-live="polite">
          <strong>{visibleAttractions.length.toString().padStart(2, "0")}</strong>
          <span>{visibleAttractions.length === 1 ? "attraction" : "attractions"}</span>
        </div>
      </div>

      <div className="park-directory-filters" role="group" aria-label="Filter attractions">
        {filters.map((filter) => (
          <button type="button" className={activeFilter === filter ? "is-active" : undefined} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)} key={filter}>
            <span>{filter}</span><b>{counts[filter]}</b>
          </button>
        ))}
      </div>

      {visibleAttractions.length ? (
        <div className="park-attraction-grid park-directory-grid">
          {visibleAttractions.map((attraction) => <DirectoryCard attraction={attraction} key={attraction.slug} />)}
        </div>
      ) : (
        <div className="park-directory-empty">
          <span>Nothing found</span>
          <h3>Try another search.</h3>
          <p>Search by attraction name, ride type, area or audience.</p>
          <button type="button" onClick={() => { setQuery(""); setActiveFilter("All attractions"); }}>Clear filters</button>
        </div>
      )}
    </div>
  );
}
