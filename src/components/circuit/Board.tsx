import { useCallback, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { CircuitNode } from "./CircuitNode";
import { Palette } from "./Palette";
import { ScopePanel } from "./ScopePanel";
import { COMPONENT_SPECS, type ComponentKind } from "./symbols";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const nodeTypes = { circuit: CircuitNode };

const initialNodes: Node[] = [
  {
    id: "n1",
    type: "circuit",
    position: { x: 80, y: 120 },
    data: { kind: "battery", label: "Battery", value: "9 V" },
  },
  {
    id: "n2",
    type: "circuit",
    position: { x: 330, y: 60 },
    data: { kind: "resistor", label: "Resistor", value: "1 kΩ" },
  },
  {
    id: "n3",
    type: "circuit",
    position: { x: 330, y: 200 },
    data: { kind: "capacitor", label: "Capacitor", value: "10 µF" },
  },
  {
    id: "n4",
    type: "circuit",
    position: { x: 590, y: 130 },
    data: { kind: "ground", label: "Ground", value: "0 V" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "n1", target: "n2" },
  { id: "e2", source: "n1", target: "n3" },
  { id: "e3", source: "n2", target: "n4" },
  { id: "e4", source: "n3", target: "n4" },
];

let seq = 100;

function Canvas() {
  const wrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [dragOver, setDragOver] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges],
  );

  const spawn = useCallback(
    (kind: ComponentKind, position: { x: number; y: number }) => {
      const spec = COMPONENT_SPECS.find((s) => s.kind === kind);
      if (!spec) return;
      seq += 1;
      setNodes((nds) =>
        nds.concat({
          id: `n${seq}`,
          type: "circuit",
          position,
          data: { kind, label: spec.label, value: spec.value },
        }),
      );
    },
    [setNodes],
  );

  return (
    <div
      ref={wrapper}
      className="relative h-full w-full"
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const kind = e.dataTransfer.getData("application/circuit-part") as ComponentKind;
        if (!kind) return;
        spawn(kind, screenToFlowPosition({ x: e.clientX, y: e.clientY }));
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-background dot-grid"
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={0} color="transparent" />
        <Controls className="!border-border !bg-panel [&_button]:!border-border [&_button]:!bg-panel [&_button]:!fill-foreground hover:[&_button]:!bg-surface" />
      </ReactFlow>

      {dragOver && (
        <div className="pointer-events-none absolute inset-3 rounded-lg border-2 border-dashed border-primary/60" />
      )}
    </div>
  );
}

export function Board() {
  const [paletteOpen, setPaletteOpen] = useState(true);

  return (
    <ReactFlowProvider>
      <BoardShell paletteOpen={paletteOpen} setPaletteOpen={setPaletteOpen} />
    </ReactFlowProvider>
  );
}

function BoardShell({
  paletteOpen,
  setPaletteOpen,
}: {
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
}) {
  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="flex shrink-0 items-center gap-4 border-b border-border bg-panel px-4 py-2.5">
        <button
          type="button"
          onClick={() => setPaletteOpen(!paletteOpen)}
          className="rounded border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
        >
          {paletteOpen ? "◀ parts" : "parts ▶"}
        </button>
        <h1 className="font-mono text-sm tracking-[0.2em] text-primary text-signal-glow">
          CIRCUITLAB
        </h1>
        <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
          untitled_board.ckt
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 font-mono text-[11px] text-muted-foreground md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-trace" />
            idle · sim off
          </span>
          <button
            type="button"
            className="rounded border border-primary/50 bg-primary/10 px-3 py-1 font-mono text-[11px] text-primary transition-colors hover:bg-primary/20"
          >
            RUN
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {paletteOpen && (
          <div className="hidden w-60 shrink-0 border-r border-border md:block">
            <Palette onAdd={() => undefined} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <ResizablePanelGroup orientation="vertical" className="flex-col">
            <ResizablePanel defaultSize="65%" minSize="25%">
              <Canvas />
            </ResizablePanel>
            <ResizableHandle
              withHandle
              className="!h-1.5 !w-full !bg-border transition-colors hover:!bg-primary/60"
            />
            <ResizablePanel defaultSize="35%" minSize="12%" className="border-t border-border">
              <ScopePanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <div className="border-t border-border bg-panel p-2 md:hidden">
        <div className="flex gap-2 overflow-x-auto">
          <Palette onAdd={() => undefined} />
        </div>
      </div>
    </div>
  );
}
