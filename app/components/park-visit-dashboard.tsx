import type { Park } from "../data/catalogue";

type VisitIconType = "ticket" | "clock" | "weather" | "queue" | "map";

function VisitIcon({ type }: { type: VisitIconType }) {
  if (type === "ticket") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5A2.5 2.5 0 0 0 6.5 10 2.5 2.5 0 0 0 4 12.5V17h16v-4.5a2.5 2.5 0 0 1 0-5V3H4v4.5Z" /><path d="M14 7h2M14 11h2M14 15h2" /></svg>;
  }
  if (type === "clock") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></svg>;
  }
  if (type === "weather") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16.5H6.5a3.5 3.5 0 1 1 .7-6.9A5.5 5.5 0 0 1 17.7 11a2.8 2.8 0 1 1-.5 5.5H8Z" /><path d="M9 19.5h.01M13 19.5h.01M17 19.5h.01" /></svg>;
  }
  if (type === "queue") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="7" r="2" /><circle cx="17" cy="7" r="2" /><path d="M4 18v-3a3 3 0 0 1 6 0v3M14 18v-3a3 3 0 0 1 6 0v3M10 10.5h4" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z" /><path d="M9 4v14M15 6v14" /><circle cx="15" cy="11" r="1.5" /></svg>;
}

function ExternalArrow() {
  return <span className="visit-card-arrow" aria-hidden="true">↗</span>;
}

export function ParkQuickActions({ park }: { park: Park }) {
  const cards = [
    { label: "Tickets", icon: "ticket" as const, ...park.visit.tickets },
    { label: "Opening times", icon: "clock" as const, ...park.visit.openingTimes },
    { label: "Weather", icon: "weather" as const, ...park.visit.weather },
    { label: "Queue times", icon: "queue" as const, ...park.visit.queues },
    { label: "Park map", icon: "map" as const, value: "Explore map", ...park.visit.map },
  ];

  return (
    <nav className="park-quick-actions" aria-label={`Plan a visit to ${park.name}`}>
        {cards.map((card) => {
          const content = <><span className="park-action-icon"><VisitIcon type={card.icon} /></span><span className="park-action-copy"><span>{card.label}</span><strong>{card.value}</strong><small>{card.note}</small></span>{"href" in card ? <ExternalArrow /> : null}</>;
          return "href" in card ? <a className="park-action-button" href={card.href} target="_blank" rel="noreferrer" key={card.label}>{content}</a> : <span className="park-action-button park-action-preview" key={card.label}>{content}</span>;
        })}
    </nav>
  );
}
