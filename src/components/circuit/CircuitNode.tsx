import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Symbol, type ComponentKind } from "./symbols";

export type CircuitNodeData = {
  kind: ComponentKind;
  label: string;
  value: string;
};

export function CircuitNode({ data, selected }: NodeProps) {
  const d = data as CircuitNodeData;
  const isGround = d.kind === "ground";

  return (
    <div
      className={[
        "group relative rounded-md border bg-panel/90 px-3 py-2 backdrop-blur transition-all",
        selected
          ? "border-primary text-primary glow-signal"
          : "border-border text-foreground hover:border-primary/50",
      ].join(" ")}
    >
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-3">
        <Symbol kind={d.kind} className="h-6 w-14 shrink-0" />
        <div className="leading-tight">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {d.label}
          </div>
          <div
            className={[
              "font-mono text-sm",
              selected ? "text-primary text-signal-glow" : "text-foreground",
            ].join(" ")}
          >
            {d.value}
          </div>
        </div>
      </div>
      {!isGround && <Handle type="source" position={Position.Right} />}
    </div>
  );
}
