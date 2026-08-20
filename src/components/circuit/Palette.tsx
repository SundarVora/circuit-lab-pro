import { COMPONENT_SPECS, Symbol, type ComponentKind } from "./symbols";

export function Palette({ onAdd }: { onAdd: (kind: ComponentKind) => void }) {
  return (
    <aside className="flex h-full w-full flex-col overflow-y-auto bg-panel">
      <div className="border-b border-border px-4 py-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Parts bin
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Drag onto the board</p>
      </div>

      <div className="flex flex-col gap-2 p-3">
        {COMPONENT_SPECS.map((spec) => (
          <button
            key={spec.kind}
            type="button"
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("application/circuit-part", spec.kind);
              event.dataTransfer.effectAllowed = "move";
            }}
            onDoubleClick={() => onAdd(spec.kind)}
            className="flex cursor-grab items-center gap-3 rounded-md border border-border bg-surface/60 px-3 py-2.5 text-left transition-all hover:border-primary/60 hover:bg-surface active:cursor-grabbing"
          >
            <Symbol kind={spec.kind} className="h-6 w-12 shrink-0 text-primary" />
            <div className="min-w-0">
              <div className="truncate text-sm text-foreground">{spec.label}</div>
              <div className="truncate font-mono text-[11px] text-muted-foreground">
                {spec.value} · {spec.hint}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-auto border-t border-border p-3">
        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
          Tip: drag a part in, then pull from a terminal dot to wire it up.
        </p>
      </div>
    </aside>
  );
}
