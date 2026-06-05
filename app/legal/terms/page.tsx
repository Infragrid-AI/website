import type { Metadata } from "next";

const title = "Infragrid | Terms of Service";
const description =
  "Terms of Service for the Infragrid Exchange (researchers/buyers) and Infragrid Partners (data providers).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/legal/terms" },
  openGraph: { title, description, url: "/legal/terms", type: "website" },
};

const EFFECTIVE = "Effective June 4, 2026";

export default function TermsPage() {
  return (
    <>
      <section className="hero">
        <h1 className="h-display">Terms of Service</h1>
        <p className="lede" style={{ maxWidth: "60ch" }}>
          The terms that govern the Infragrid Exchange, Infragrid Partners, and our role connecting
          data buyers and providers.
        </p>
        <p className="muted" style={{ marginTop: 8 }}>{EFFECTIVE}</p>
      </section>

      <section className="section content">
        <div className="legal prose">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of services
            operated by Infragrid (&ldquo;Infragrid,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;),
            including:
          </p>
          <ul>
            <li>
              <strong>Infragrid Exchange</strong> (exchange.infragrid.ai) — where qualified
              researchers and organizations (&ldquo;Buyers&rdquo;) browse anonymized dataset
              previews and submit inquiries.
            </li>
            <li>
              <strong>Infragrid Partners</strong> (partners.infragrid.ai) — where approved data
              providers (&ldquo;Providers&rdquo;) publish datasets, upload samples, and manage
              buyer inquiries.
            </li>
          </ul>
          <p>
            By creating an account or using either service you agree to these Terms. Infragrid acts
            as an intermediary (a data broker) that connects Buyers and Providers; we are not a
            party to the eventual data-licensing agreement between them unless we expressly agree in
            writing.
          </p>

          <h2>1. Accounts &amp; eligibility</h2>
          <ul>
            <li>
              You must use a valid company email and provide accurate information. You are
              responsible for activity under your account and for keeping credentials secure.
            </li>
            <li>
              <strong>Buyers</strong> must be bona fide researchers or research organizations.
            </li>
            <li>
              <strong>Providers</strong> join by invitation or approval — Infragrid must approve
              your company before you can publish.
            </li>
          </ul>

          <h2>2. For Buyers (Exchange)</h2>
          <ul>
            <li>Use datasets and samples only for lawful, legitimate research purposes.</li>
            <li>
              <strong>No re-identification.</strong> You will not attempt to re-identify any
              individual, household, or entity, or link data to other datasets for that purpose.
            </li>
            <li>You will not resell, sublicense, or redistribute data without written consent.</li>
            <li>
              Sample schemas and example rows are for evaluation only and may be synthetic or
              de-identified. Submitting an inquiry or price offer does not create an obligation on
              Infragrid or any Provider to transact.
            </li>
          </ul>

          <h2>3. For Providers (Partners)</h2>
          <ul>
            <li>
              You represent and warrant that you have all rights necessary to offer the data and
              that you may grant the licenses contemplated by a sale.
            </li>
            <li>
              You will publish only properly <strong>de-identified / anonymized</strong> data and
              will comply with all applicable privacy and data-protection laws. Do not upload
              personal data or anything you lack the right to share.
            </li>
            <li>
              You are responsible for the accuracy of your listings (descriptions, schema, volume,
              licensing terms). You set your own pricing expectations; final pricing is negotiated
              per deal.
            </li>
            <li>
              Internal listing details (such as provenance notes and your price estimate) are shared
              with Infragrid to broker deals and are not displayed to Buyers.
            </li>
          </ul>

          <h2>4. Brokering &amp; transactions</h2>
          <p>
            Infragrid facilitates introductions between Buyers and Providers. When a Buyer submits
            an inquiry, we may share relevant contact and deal details with the relevant Provider
            (and vice versa) to progress the relationship. Any actual provision of data is subject
            to a separate data-use or licensing agreement between the parties, and may involve
            Infragrid fees or commercial terms agreed separately.
          </p>

          <h2>5. Intellectual property</h2>
          <p>
            The services and Infragrid&rsquo;s materials are owned by Infragrid and its licensors.
            Providers retain ownership of their underlying data; Buyers receive only the rights
            granted in an executed agreement. Access to the services does not transfer ownership.
          </p>

          <h2>6. Acceptable use</h2>
          <p>
            You will not misuse the services, attempt to gain unauthorized access, scrape beyond
            permitted use, or interfere with other users. We may suspend or terminate accounts that
            violate these Terms or that we reasonably believe create legal or privacy risk.
          </p>

          <h2>7. Disclaimers &amp; liability</h2>
          <p>
            The services are provided &ldquo;as is.&rdquo; To the maximum extent permitted by law,
            Infragrid disclaims implied warranties and is not liable for indirect, incidental, or
            consequential damages arising from your use of the services or from any transaction
            between Buyers and Providers.
          </p>

          <h2>8. Changes</h2>
          <p>
            We may update these Terms. Material changes will be reflected by the effective date
            above; continued use after changes constitutes acceptance.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about these Terms? Email{" "}
            <a href="mailto:hello@infragrid.ai">hello@infragrid.ai</a>.
          </p>
        </div>
      </section>
    </>
  );
}
