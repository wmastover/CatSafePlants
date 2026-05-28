import Link from "next/link";

interface SiteNavProps {
  active?: "library" | "home";
}

export function SiteNav({ active }: SiteNavProps) {
  return (
    <nav className="nav">
      <div className="nav-left" />
      <Link href="/" className="wordmark wordmark-link">
        cat <em>safe</em> plants
      </Link>
      <div className="nav-right">
        <Link href="/" className={active === "library" ? "active" : undefined}>
          Library
        </Link>
      </div>
    </nav>
  );
}
