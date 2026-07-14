import Image from "next/image";

type BrandProps = {
  className?: string;
};

export function Brand({ className = "" }: BrandProps) {
  return (
    <a className={`brand ${className}`.trim()} href="#top" aria-label="TPbuzz home">
      <Image
        className="brand-logo"
        src="/brand/tpbuzz-logo.png"
        width={1057}
        height={370}
        alt=""
        aria-hidden="true"
        priority
        sizes="(max-width: 760px) 126px, 148px"
      />
    </a>
  );
}
