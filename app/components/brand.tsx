type BrandProps = {
  className?: string;
};

export function Brand({ className = "" }: BrandProps) {
  return (
    <a className={`brand ${className}`.trim()} href="#top" aria-label="TPbuzz home">
      <span className="brand-wordmark" aria-hidden="true">
        <span className="brand-tp">TP</span>
        <span className="brand-buzz">buzz</span>
      </span>
    </a>
  );
}
