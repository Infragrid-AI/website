import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Social share card (link previews on X, LinkedIn, Slack, iMessage, etc.).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Infragrid — RL transformation, one slice at a time";

export default async function OpengraphImage() {
  const buf = await readFile(join(process.cwd(), "public/logo-512.png"));
  const src = `data:image/png;base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#17201b",
          color: "#f0f3ee",
          padding: 80,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ffffff",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <img src={src} width={60} height={60} alt="" />
          </div>
          <span style={{ fontSize: 30, fontWeight: 600 }}>Infragrid</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ fontSize: 66, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
            RL transformation,
            <br />
            one slice at a time.
          </span>
          <span style={{ fontSize: 28, color: "#9db3a4", maxWidth: 880 }}>
            Agents embedded in enterprise operations — deployed in your environment, scoped to one
            bounded slice.
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
