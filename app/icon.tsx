import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Favicon — the Infragrid mark (artwork is already centered).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          borderRadius: 7,
          overflow: "hidden",
        }}
      >
        <img src={src} width={size.width} height={size.height} alt="" />
      </div>
    ),
    { ...size },
  );
}
