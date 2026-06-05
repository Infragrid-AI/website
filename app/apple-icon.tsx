import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Apple touch icon — the Infragrid mark on white (iOS rounds it). Artwork is
// already centered.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const buf = await readFile(join(process.cwd(), "public/logo-512.png"));
  const src = `data:image/png;base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          overflow: "hidden",
        }}
      >
        <img src={src} width={size.width} height={size.height} alt="" />
      </div>
    ),
    { ...size },
  );
}
