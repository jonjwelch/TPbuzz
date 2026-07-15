"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CountryParkCategory, CountryParkDirectoryItem } from "../data/catalogue";

const filters: Array<"All parks" | CountryParkCategory> = ["All parks", "Thrill parks", "Family parks", "Destination resorts", "Seaside parks"];

export function CountryParkDirectory({ parks }: { parks: CountryParkDirectoryItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All parks");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => parks.filter((park) => (filter === "All parks" || park.categories.includes(filter)) && [park.name, park.location, park.type].join(" ").toLowerCase().includes(query.trim().toLowerCase())), [filter, parks, query]);
  return <div className="park-directory country-directory">
    <div className="park-directory-toolbar"><div className="park-directory-search"><label htmlFor="country-park-search">Search parks</label><div><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg><input id="country-park-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘family’ or ‘Surrey’" /></div></div><div className="park-directory-count" aria-live="polite"><strong>{String(visible.length).padStart(2, "0")}</strong><span>{visible.length === 1 ? "park" : "parks"}</span></div></div>
    <div className="park-directory-filters" role="group" aria-label="Filter parks">{filters.map((item) => <button type="button" className={filter === item ? "is-active" : undefined} aria-pressed={filter === item} onClick={() => setFilter(item)} key={item}><span>{item}</span><b>{item === "All parks" ? parks.length : parks.filter(({ categories }) => categories.includes(item)).length}</b></button>)}</div>
    <div className="country-park-grid">{visible.map((park) => {
      const content = <><Image src={park.image} alt={`Generated concept view representing ${park.name}`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"/><span className="park-card-image-label">Generated concept image</span><div className="country-park-card-copy"><span>{park.type} · {park.location}</span><h3>{park.name}</h3><p>{park.summary}</p><b>{park.hasGuide ? "Explore full guide ↗" : "Full guide coming soon"}</b></div></>;
      return park.hasGuide ? <Link className="country-park-card" href={`/parks/${park.slug}`} key={park.slug}>{content}</Link> : <article className="country-park-card is-preview" key={park.slug}>{content}</article>;
    })}</div>
  </div>;
}
