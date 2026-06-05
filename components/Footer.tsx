import Link from "next/link";
import { InfragridLogo } from "./InfragridLogo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-icon footer-icon" style={{ width: 28, height: 28 }}>
            <InfragridLogo />
          </span>
          <span>Infragrid</span>
        </div>

        <div className="footer-columns">
          <div>
            <p className="footer-heading">Site</p>
            <Link href="/">About</Link>
            <Link href="/platform">Platform</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <p className="footer-heading">Direct</p>
            <a href="mailto:hello@infragrid.ai">hello@infragrid.ai</a>
            <a
              href="https://www.linkedin.com/company/infragrid-ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/infragrid"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
          </div>
        </div>

        <p className="footer-note">
          On-prem, read-only, slice-scoped. Built for security and legal review.
        </p>
      </div>
    </footer>
  );
}
