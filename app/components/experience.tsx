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
