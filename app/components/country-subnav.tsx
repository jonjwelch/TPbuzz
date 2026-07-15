"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "parks", label: "Parks" },
  { id: "regions", label: "Regions" },
];

export function CountrySubnav({ countryName }: { countryName: string }) {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nav = document.querySelector<HTMLElement>(".country-subnav");
      const line = (nav?.getBoundingClientRect().bottom ?? 158) + 12;
      let current = sections[0].id;
      sections.forEach(({ id }) => {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= line) current = id;
      });
      setActiveSection(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => { removeEventListener("scroll", schedule); removeEventListener("resize", schedule); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return <nav className="country-subnav" aria-label={`${countryName} sections`}><div className="shell country-subnav-inner">
    <span className="country-subnav-title"><i aria-hidden="true" />Explore {countryName}</span>
    <div className="country-subnav-links">{sections.map(({ id, label }) => <a className={activeSection === id ? "is-active" : undefined} href={`#${id}`} onClick={() => setActiveSection(id)} aria-current={activeSection === id ? "location" : undefined} key={id}>{label}</a>)}</div>
  </div></nav>;
}
