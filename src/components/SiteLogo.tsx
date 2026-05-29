import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/images/plants/CatSafePlantLogo.png";

export function SiteLogo() {
  return (
    <Link href="/" className="site-logo" aria-label="Cat Safe Plants home">
      <Image
        src={LOGO_SRC}
        alt=""
        width={40}
        height={40}
        priority
      />
    </Link>
  );
}

export const siteLogoSrc = LOGO_SRC;
