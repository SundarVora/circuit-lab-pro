export type ComponentKind = "resistor" | "capacitor" | "battery" | "ground" | "wire";

export interface ComponentSpec {
  kind: ComponentKind;
  label: string;
  value: string;
  hint: string;
}

export const COMPONENT_SPECS: ComponentSpec[] = [
  { kind: "resistor", label: "Resistor", value: "1 kΩ", hint: "Limits current" },
  { kind: "capacitor", label: "Capacitor", value: "10 µF", hint: "Stores charge" },
  { kind: "battery", label: "Battery", value: "9 V", hint: "DC source" },
  { kind: "ground", label: "Ground", value: "0 V", hint: "Reference node" },
  { kind: "wire", label: "Wire", value: "0 Ω", hint: "Junction / link" },
];

const stroke = {
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Symbol({ kind, className }: { kind: ComponentKind; className?: string }) {
  const common = { ...stroke, stroke: "currentColor" };
  switch (kind) {
    case "resistor":
      return (
        <svg viewBox="0 0 64 28" className={className} aria-hidden>
          <path d="M2 14h10l4-8 6 16 6-16 6 16 6-16 4 8h12" {...common} />
        </svg>
      );
    case "capacitor":
      return (
        <svg viewBox="0 0 64 28" className={className} aria-hidden>
          <path d="M2 14h25M37 14h25M27 3v22M37 3v22" {...common} />
        </svg>
      );
    case "battery":
      return (
        <svg viewBox="0 0 64 28" className={className} aria-hidden>
          <path d="M2 14h20M42 14h20M22 4v20M29 9v10M35 4v20M42 9v10" {...common} />
        </svg>
      );
    case "ground":
      return (
        <svg viewBox="0 0 64 28" className={className} aria-hidden>
          <path d="M32 2v12M18 14h28M23 20h18M28 25h8" {...common} />
        </svg>
      );
    case "wire":
      return (
        <svg viewBox="0 0 64 28" className={className} aria-hidden>
          <path d="M2 14h60" {...common} />
          <circle cx="32" cy="14" r="3.5" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
