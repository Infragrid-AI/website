export function InfragridLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      focusable={false}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%", fill: "currentColor" }}
    >
      {/* Centered to match the shared marketplace mark (logo-512.png): the raw
          artwork sits low-and-right in the viewBox, so scale + translate to
          center it with the same padding as the centered logo. */}
      <g transform="translate(-1.34 -0.84) scale(0.908)">
        <path d="M6.4 24.9c4.8-4.8 8.5-10.8 10.9-17.8l2.5.9c-2.3 7.4-6.2 13.8-11.6 19L6.4 24.9Zm8.2 2.2c4.1-4.4 7.2-9.8 9-15.9l2.5.7c-1.8 6.5-5 12.2-9.5 16.9l-2-1.7Zm7.9 1.2c3.2-3.6 5.6-7.9 7-12.7l2.3.7c-1.4 5.2-3.9 9.8-7.6 13.7l-1.7-1.7Z" />
      </g>
    </svg>
  );
}
