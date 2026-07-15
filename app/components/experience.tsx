import Link from "next/link";
import type { ReactNode } from "react";
import type { TimelineEntry } from "../data/catalogue";

type Breadcrumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function StatGrid({ stats }: { stats: Array<{ label: string; value: string }> }) {
  return (
    <dl className="experience-stats">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt>{stat.label}</dt>
          <dd>{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

type AttractionStatIcon = "speed" | "track" | "calendar" | "height" | "thrill";

function StatIcon({ type }: { type: AttractionStatIcon }) {
  if (type === "speed") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17a8 8 0 1 1 16 0" /><path d="m12 14 4-5" /><path d="M7 17h10" /></svg>;
  }
  if (type === "track") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="17" r="2" /><circle cx="18" cy="7" r="2" /><path d="M7.5 15.7c2.2-2.1 2.6-5.1 5.1-6.4 1.3-.7 2.7-.6 3.6-.9" /><path d="M6 19v2M18 3v2" /></svg>;
  }
  if (type === "calendar") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16" /><path d="M8 14h3M14 14h2M8 17h2" /></svg>;
  }
  if (type === "height") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" /><path d="M5 3h4M5 21h4" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-7 12h6l-1 8 7-12h-6l1-8Z" /></svg>;
}

export function AttractionStatGrid({ stats }: { stats: Array<{ label: string; value: string }> }) {
  const icons: AttractionStatIcon[] = ["speed", "track", "calendar", "height", "thrill"];

  return (
    <dl className="experience-stats attraction-stats">
      {stats.map((stat, index) => (
        <div key={stat.label}>
          <span className="attraction-stat-icon"><StatIcon type={icons[index] ?? "track"} /></span>
          <div className="attraction-stat-copy"><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
        </div>
      ))}
    </dl>
  );
}

type ParkStatIcon = "calendar" | "location" | "estate" | "stay" | "guide";

function ParkStatIconGraphic({ type }: { type: ParkStatIcon }) {
  if (type === "calendar") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16" /><path d="M8 14h8M8 17h5" /></svg>;
  }
  if (type === "location") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  }
  if (type === "estate") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V10l8-6 8 6v11" /><path d="M8 21v-7h8v7M3 21h18M9 8V3h3" /></svg>;
  }
  if (type === "stay") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19v-9M20 19v-6a3 3 0 0 0-3-3H9" /><path d="M4 15h16M4 19v2M20 19v2" /><circle cx="7" cy="8" r="2" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" /><path d="M8 8h7M8 12h7M8 16h4M19 20a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3" /></svg>;
}

export function ParkStatGrid({ stats }: { stats: Array<{ label: string; value: string }> }) {
  const icons: ParkStatIcon[] = ["calendar", "location", "estate", "stay", "guide"];

  return (
    <dl className="experience-stats park-stats">
      {stats.map((stat, index) => (
        <div key={stat.label}>
          <span className="park-stat-icon"><ParkStatIconGraphic type={icons[index] ?? "guide"} /></span>
          <div><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
        </div>
      ))}
    </dl>
  );
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="timeline">
      {entries.map((entry) => (
        <li key={`${entry.year}-${entry.title}`}>
          <span className="timeline-year">{entry.year}</span>
          <div><h3>{entry.title}</h3><p>{entry.description}</p></div>
        </li>
      ))}
    </ol>
  );
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="experience-section-heading">
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      {children ? <div className="section-support">{children}</div> : null}
    </div>
  );
}

export function ExperienceFooter() {
  return (
    <footer className="site-footer experience-footer">
      <div className="shell footer-inner">
        <div><strong>TPbuzz</strong><span>Where Theme Parks Come Alive.</span></div>
        <p>Project Horizon · First connected experience</p>
      </div>
    </footer>
  );
}

export function ArrowIcon() {
  return <span className="card-arrow" aria-hidden="true">↗</span>;
}
