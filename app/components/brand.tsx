import Image from "next/image";

type BrandProps = {
  className?: string;
};

export function Brand({ className = "" }: BrandProps) {
  return (
    <a className={`brand ${className}`.trim()} href="/" aria-label="TPbuzz home">
      <Image
        className="brand-logo brand-logo-light"
        src="/brand/tpbuzz-logo.svg"
        width={860}
        height={210}
        alt=""
        aria-hidden="true"
        priority
        sizes="(max-width: 760px) 156px, 184px"
      />
      <Image
        className="brand-logo brand-logo-dark"
        src="/brand/tpbuzz-logo-reversed.svg"
        width={860}
        height={210}
        alt=""
        aria-hidden="true"
        priority
        sizes="(max-width: 760px) 156px, 184px"
      />
    </a>
  );
}
