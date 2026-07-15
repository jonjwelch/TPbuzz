"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "attractions", label: "Rides & attractions" },
  { id: "plan", label: "Plan your visit" },
  { id: "history", label: "History" },
  { id: "reviews", label: "Reviews" },
];

export function ParkSubnav({ parkName }: { parkName: string }) {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.slice(1);
      if (sections.some(({ id }) => id === hash)) setActiveSection(hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -58%", threshold: 0 },
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("hashchange", syncHash);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="park-subnav" aria-label={`${parkName} sections`}>
      <div className="shell park-subnav-inner">
        <span className="park-subnav-title"><i />Explore {parkName.replace(" Resort", "")}</span>
        <div className="park-subnav-links">
          {sections.map(({ id, label }) => (
            <a className={activeSection === id ? "is-active" : undefined} href={`#${id}`} key={id} aria-current={activeSection === id ? "location" : undefined}>{label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
