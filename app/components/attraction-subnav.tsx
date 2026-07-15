"use client";

import { useEffect, useState } from "react";

const sections = [
  ["overview", "Overview"],
  ["experience", "Experience"],
  ["ride-stats", "Ride stats"],
  ["gallery", "Gallery"],
  ["history", "History"],
  ["reviews", "Reviews"],
] as const;

export function AttractionSubnav({ attractionName }: { attractionName: string }) {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const activationLine = 190;
      let currentSection: (typeof sections)[number][0] = sections[0][0];

      sections.forEach(([id]) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className="attraction-subnav" aria-label={`${attractionName} sections`}>
      <div className="shell attraction-subnav-inner">
        <span className="attraction-subnav-title"><i aria-hidden="true" />Explore {attractionName}</span>
        <div className="attraction-subnav-links">
          {sections.map(([id, label]) => (
            <a href={`#${id}`} className={activeSection === id ? "is-active" : undefined} aria-current={activeSection === id ? "location" : undefined} key={id}>{label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
