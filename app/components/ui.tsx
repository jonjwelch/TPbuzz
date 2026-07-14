import type { ReactNode } from "react";

type ArrowLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

export function ArrowLink({ children, href, variant = "primary" }: ArrowLinkProps) {
  return (
    <a className={`button button-${variant}`} href={href}>
      <span>{children}</span>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M4 10h11M11 6l4 4-4 4" />
      </svg>
    </a>
  );
}

type IconProps = {
  name: "map" | "coaster" | "story";
};

export function FeatureIcon({ name }: IconProps) {
  const paths = {
    map: <><path d="m3 5 5-2 4 2 5-2v12l-5 2-4-2-5 2Z" /><path d="M8 3v12M12 5v12" /></>,
    coaster: <><path d="M3 16c2.8-7.5 5.2-9 8-4.5 2.1 3.4 3.8 2.1 6-3.5" /><path d="M5 12v4M9 10v6M14 13v3M3 16h14" /></>,
    story: <><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H10v14H6.5A2.5 2.5 0 0 0 4 18.5Z" /><path d="M16 4.5A2.5 2.5 0 0 0 13.5 2H10v14h3.5a2.5 2.5 0 0 1 2.5 2.5Z" /></>,
  } as const;

  return <svg className="feature-icon" viewBox="0 0 20 20" aria-hidden="true">{paths[name]}</svg>;
}
