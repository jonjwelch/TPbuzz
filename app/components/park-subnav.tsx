"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "attractions", label: "Rides & attractions" },
  { id: "history", label: "History" },
  { id: "reviews", label: "Reviews" },
];

export function ParkSubnav({ parkName }: { parkName: string }) {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    let frame = 0;

    const syncHash = () => {
      const hash = window.location.hash.slice(1);
      if (sections.some(({ id }) => id === hash)) setActiveSection(hash);
    };

    const updateActiveSection = () => {
      frame = 0;
      const subnav = document.querySelector<HTMLElement>(".park-subnav");
      const activationLine = Math.min(190, (subnav?.getBoundingClientRect().bottom ?? 158) + 12);
      let currentSection = sections[0].id;

      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine) currentSection = id;
      });

      setActiveSection(currentSection);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    syncHash();
    updateActiveSection();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className="park-subnav" aria-label={`${parkName} sections`}>
      <div className="shell park-subnav-inner">
        <span className="park-subnav-title"><i aria-hidden="true" />Explore {parkName.replace(" Resort", "")}</span>
        <div className="park-subnav-links">
          {sections.map(({ id, label }) => (
            <a className={activeSection === id ? "is-active" : undefined} href={`#${id}`} key={id} onClick={() => setActiveSection(id)} aria-current={activeSection === id ? "location" : undefined}>{label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
