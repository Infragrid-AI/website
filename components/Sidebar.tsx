"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InfragridLogo } from "./InfragridLogo";
import { SEGMENT_NAV } from "@/lib/contact-options";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/platform", label: "Platform" },
  ...SEGMENT_NAV.map(({ label, href }) => ({ href, label })),
  { href: "/contact", label: "Contact" },
];

function NavDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLabel =
    navLinks.find(({ href }) => href === pathname)?.label ?? "Menu";

  // Close on outside click or Escape. (Route-change reset is handled by the
  // key={pathname} remount in Sidebar, so no setState-in-effect is needed.)
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`nav-dropdown${open ? " is-open" : ""}`} ref={dropdownRef}>
      <button
        type="button"
        className="nav-dropdown-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Navigation menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-dropdown-current">{currentLabel}</span>
        <svg
          className="nav-dropdown-chevron"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul className="nav-dropdown-menu" role="menu">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href} role="none">
                <Link
                  href={href}
                  role="menuitem"
                  className={`nav-dropdown-item${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span>{label}</span>
                  {isActive && (
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

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

      {/* Mobile: custom dropdown menu (remounts per route to reset open state) */}
      <NavDropdown key={pathname} pathname={pathname} />

      {/* Desktop: link list */}
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
