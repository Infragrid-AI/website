"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { InfragridLogo } from "./InfragridLogo";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/platform", label: "Platform" },
  { href: "/contact", label: "Contact" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar" aria-label="Primary">
      <Link href="/" className="brand" aria-label="Infragrid home">
        <span className="brand-icon">
          <InfragridLogo />
        </span>
        <span className="brand-name">Infragrid</span>
      </Link>

      <nav className="sidebar-nav">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-link${isActive ? " is-active" : ""}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-foot">
        <span>infragrid.ai</span>
        <span>
          <a href="mailto:hello@infragrid.ai">hello@infragrid.ai</a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/company/infragrid-ai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </span>
        <span>
          <a
            href="https://x.com/infragrid"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
        </span>
      </div>
    </aside>
  );
}
