import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Kapital Grants — Non-dilutive capital to start. Institutional capital to scale.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once at build time into the static og:image every share card uses.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* The mark from app/icon.svg, redrawn inline so the card carries
              the real logo rather than a plain swatch. */}
          <svg width="44" height="44" viewBox="0 0 32 32">
            <rect width="32" height="32" fill="#d4ff4f" />
            <g stroke="#0a0a0a" strokeWidth="4" fill="none">
              <path d="M11 6.5 V25.5" />
              <path d="M12.2 16 L22.5 7" />
              <path d="M12.2 16 L22.5 25" />
            </g>
          </svg>
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "6px",
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            KAPITAL GRANTS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "62px",
              lineHeight: 1.1,
              color: "#ffffff",
              fontWeight: 600,
              letterSpacing: "-1.5px",
            }}
          >
            Non-dilutive capital to start.
          </div>
          <div
            style={{
              fontSize: "62px",
              lineHeight: 1.1,
              color: "#8a8a8a",
              fontWeight: 600,
              letterSpacing: "-1.5px",
            }}
          >
            Institutional capital to scale.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "22px", color: "#8a8a8a" }}>
          <div style={{ display: "flex" }}>Grants · Accelerators · VCs · Family offices</div>
          <div style={{ display: "flex", color: "#d4ff4f" }}>{site.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    size,
  );
}
