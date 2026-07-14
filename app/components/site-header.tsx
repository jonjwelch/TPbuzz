import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  ["Explore", "#explore"],
  ["Why TPbuzz", "#why-tpbuzz"],
  ["Roadmap", "#roadmap"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <span className="build-status"><i aria-hidden="true" />In development</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
