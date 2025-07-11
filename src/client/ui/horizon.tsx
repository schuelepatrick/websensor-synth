// src/client/ui/Horizon.tsx
import type { Orientation } from "../sensors";

interface Props {
  ori: Orientation;          // α = yaw wird ignoriert
  size?: number;             // Breite & Höhe in px
}

export default function Horizon({ ori, size = 200 }: Props) {
  // Roll (γ) dreht das Rechteck, Pitch (β) verschiebt es vertikal
  const roll = ori.gamma;                // -90 … 90
  const pitch = ori.beta;                // -180 … 180
  const translateY = (pitch / 180) * (size / 2);   // max ±size/2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}
      style={{ border: "1px solid #999", borderRadius: "50%" }}
    >
      {/* Himmel & Erde */}
      <g transform={`rotate(${roll}) translate(0 ${translateY})`}>
        <rect
          x={-size}
          y={-size}
          width={size * 2}
          height={size}
          fill="#4da6ff"
        />
        <rect
          x={-size}
          y={0}
          width={size * 2}
          height={size}
          fill="#704214"
        />
        <line
          x1={-size}
          y1={0}
          x2={size}
          y2={0}
          stroke="#fff"
          strokeWidth="2"
        />
      </g>
      {/* Außenkreis */}
      <circle cx={0} cy={0} r={size / 2 - 2} fill="none" stroke="#555" />
    </svg>
  );
}
