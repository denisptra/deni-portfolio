import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Head */}
          <circle cx="16" cy="16" r="12" fill="#f5f5f0" />
          {/* Ears */}
          <circle cx="6" cy="6" r="4.5" fill="#1a1a1a" />
          <circle cx="26" cy="6" r="4.5" fill="#1a1a1a" />
          <circle cx="6" cy="6" r="2.2" fill="#444" />
          <circle cx="26" cy="6" r="2.2" fill="#444" />
          {/* Eye patches */}
          <ellipse cx="11" cy="15" rx="4.5" ry="4" fill="#1a1a1a" transform="rotate(-10 11 15)" />
          <ellipse cx="21" cy="15" rx="4.5" ry="4" fill="#1a1a1a" transform="rotate(10 21 15)" />
          {/* Eyes */}
          <circle cx="11" cy="15" r="2" fill="#fff" />
          <circle cx="21" cy="15" r="2" fill="#fff" />
          <circle cx="11.5" cy="15.3" r="1" fill="#111" />
          <circle cx="21.5" cy="15.3" r="1" fill="#111" />
          {/* Nose */}
          <path d="M14 19.5 Q16 21.5 18 19.5" fill="#1a1a1a" />
          {/* Smile */}
          <path d="M13 21.5 Q16 23.5 19 21.5" stroke="#1a1a1a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          {/* Cheeks */}
          <circle cx="8" cy="19" r="2" fill="#f5a0a0" opacity="0.3" />
          <circle cx="24" cy="19" r="2" fill="#f5a0a0" opacity="0.3" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
