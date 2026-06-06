"use client";

import { useEffect, useState } from "react";
import { DOMAIN_OPTIONS } from "@/lib/contact-options";

type SegmentId = "lab" | "data_provider" | "general";

type SegmentConfig = {
  id: SegmentId;
  tab: string;
  blurb: string;
  roleLabel: string;
  roleRequired: boolean;
  orgLabel: string;
  orgRequired: boolean;
  needsCountry: boolean;
  /** Label for the multi-select data-type group; null = no group for this segment. */
  dataTypeLabel: string | null;
  dataTypeOptions: string[];
  /** Data providers also pick where their data lives. */
  storageLabel: string | null;
  storageOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
};

const SEGMENTS: SegmentConfig[] = [
  {
    id: "lab",
    tab: "Labs & model builders",
    blurb:
      "Interested in Infragrid data? Fill out the form below and we'll be in touch.",
    roleLabel: "Title",
    roleRequired: true,
    orgLabel: "Company name",
    orgRequired: true,
    needsCountry: false,
    dataTypeLabel: "Data type needed",
    dataTypeOptions: [...DOMAIN_OPTIONS],
    storageLabel: null,
    storageOptions: [],
    messageLabel: "Describe your request",
    messagePlaceholder: "How can we help?",
  },
  {
    id: "data_provider",
    tab: "Data providers & enterprises",
    blurb:
      "Interested in becoming an Infragrid data partner? Fill out the partner form below and we'll be in touch.",
    roleLabel: "Title",
    roleRequired: true,
    orgLabel: "Company name",
    orgRequired: true,
    needsCountry: true,
    dataTypeLabel: "Data or content type",
    dataTypeOptions: [...DOMAIN_OPTIONS],
    storageLabel: "Where is your data/content stored?",
    storageOptions: [
      "S3",
      "Cloud (Google Drive, Dropbox, Other)",
      "Physical Storage (Hard-drive, tape, etc..)",
      "Film Reels or Non-Digital Format",
      "Other",
    ],
    messageLabel: "Describe your data or content",
    messagePlaceholder:
      'e.g. "We have 13M records of...", "We have 10,000 hours of...", etc.',
  },
  {
    id: "general",
    tab: "General",
    blurb:
      "Looking for something else? Reach out and our team will be in touch.",
    roleLabel: "Role / title (optional)",
    roleRequired: false,
    orgLabel: "Company name (optional)",
    orgRequired: false,
    needsCountry: false,
    dataTypeLabel: null,
    dataTypeOptions: [],
    storageLabel: null,
    storageOptions: [],
    messageLabel: "Message or request",
    messagePlaceholder: "How can we help?",
  },
];

const REFERRAL_OPTIONS = [
  "Google Search",
  "AI Search",
  "LinkedIn",
  "X / Twitter",
  "News / Newsletter",
  "Referral / Word of mouth",
  "Email",
  "Conference or event",
  "Podcast",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

export function InterestForm() {
  const [segment, setSegment] = useState<SegmentId>("lab");
  const [checkedTypes, setCheckedTypes] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const active = SEGMENTS.find((s) => s.id === segment)!;

  // Pre-select tab + domain when arriving from a nav dropdown
  // (e.g. /contact?for=data_provider&domain=Healthcare). Read from the URL on
  // mount so the page stays statically rendered.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forParam = params.get("for");
    const domain = params.get("domain");
    /* eslint-disable react-hooks/set-state-in-effect --
       One-time sync of form selection from the URL (nav deep-links like
       /contact?for=data_provider&domain=Healthcare). Reading window keeps the
       page statically rendered (no useSearchParams Suspense boundary needed). */
    if (forParam === "lab" || forParam === "data_provider" || forParam === "general") {
      setSegment(forParam);
    }
    if (domain) setCheckedTypes(new Set([domain]));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  function toggleType(opt: string, on: boolean) {
    setCheckedTypes((prev) => {
      const next = new Set(prev);
      if (on) next.add(opt);
      else next.delete(opt);
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      segment,
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      organization: data.get("organization"),
      role: data.get("role"),
      country: data.get("country"),
      dataTypes: data.getAll("dataTypes"),
      storageLocations: data.getAll("storageLocations"),
      referralSource: data.get("referralSource"),
      message: data.get("message"),
      company_website: data.get("company_website"), // honeypot
    };

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3 className="form-success-h">Thanks — we&apos;ve got it.</h3>
        <p className="form-success-p">
          We&apos;ll reach out soon. If it&apos;s urgent, email{" "}
          <a className="underlined-link" href="mailto:hello@infragrid.ai">
            hello@infragrid.ai
          </a>
          .
        </p>
        <button
          type="button"
          className="form-reset-link"
          onClick={() => setStatus("idle")}
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form className="interest-form" onSubmit={handleSubmit} noValidate>
      <div className="segment-tabs" role="tablist" aria-label="I am a…">
        {SEGMENTS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={segment === s.id}
            className={`segment-tab${segment === s.id ? " is-active" : ""}`}
            onClick={() => setSegment(s.id)}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <p className="form-blurb">{active.blurb}</p>

      {/* First / last name side by side */}
      <div className="field-grid">
        <label className="field">
          <span className="field-label">First name</span>
          <input
            className="field-input"
            type="text"
            name="firstName"
            placeholder="John"
            autoComplete="given-name"
            required
          />
        </label>

        <label className="field">
          <span className="field-label">Last name</span>
          <input
            className="field-input"
            type="text"
            name="lastName"
            placeholder="Doe"
            autoComplete="family-name"
            required
          />
        </label>
      </div>

      <label className="field field-stacked">
        <span className="field-label">{active.orgLabel}</span>
        <input
          className="field-input"
          type="text"
          name="organization"
          autoComplete="organization"
          required={active.orgRequired}
        />
      </label>

      <label className="field field-stacked">
        <span className="field-label">{active.roleLabel}</span>
        <input
          className="field-input"
          type="text"
          name="role"
          autoComplete="organization-title"
          required={active.roleRequired}
        />
      </label>

      <label className="field field-stacked">
        <span className="field-label">Work email</span>
        <input
          className="field-input"
          type="email"
          name="email"
          placeholder="john@infragrid.ai"
          autoComplete="email"
          required
        />
      </label>

      {active.needsCountry && (
        <label className="field field-stacked" key={`${active.id}-country`}>
          <span className="field-label">Country</span>
          <input
            className="field-input"
            type="text"
            name="country"
            placeholder="e.g. USA"
            autoComplete="country-name"
            required
          />
        </label>
      )}

      {/* Data type — multi-select, segment-specific (the Protégé-style group) */}
      {active.dataTypeLabel && (
        <fieldset className="check-group" key={`${active.id}-datatypes`}>
          <legend className="field-label">
            {active.dataTypeLabel}
            <span className="check-group-hint"> — check all that apply</span>
          </legend>
          <div className="check-options">
            {active.dataTypeOptions.map((opt) => (
              <label key={opt} className="check-option">
                <input
                  type="checkbox"
                  name="dataTypes"
                  value={opt}
                  checked={checkedTypes.has(opt)}
                  onChange={(e) => toggleType(opt, e.target.checked)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {/* Storage — data providers only */}
      {active.storageLabel && (
        <fieldset className="check-group" key={`${active.id}-storage`}>
          <legend className="field-label">{active.storageLabel}</legend>
          <div className="check-options">
            {active.storageOptions.map((opt) => (
              <label key={opt} className="check-option">
                <input type="checkbox" name="storageLocations" value={opt} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <label className="field field-stacked">
        <span className="field-label">{active.messageLabel}</span>
        <textarea
          className="field-input field-textarea"
          name="message"
          rows={5}
          placeholder={active.messagePlaceholder}
          required
        />
      </label>

      <label className="field field-stacked">
        <span className="field-label">How did you hear about us?</span>
        <select className="field-input field-select" name="referralSource" defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          {REFERRAL_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>

      {/* Honeypot — visually hidden, ignored by humans, filled by bots. */}
      <div className="hp-field" aria-hidden="true">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p className="form-error" role="alert">
          {errorMsg}
        </p>
      )}

      <button type="submit" className="form-submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
