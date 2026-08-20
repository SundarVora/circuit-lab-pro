import { useCallback, useState } from "react";
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
  type NodeMouseHandler,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { CircuitNode } from "./CircuitNode";
import { Palette } from "./Palette";
import { ScopePanel } from "./ScopePanel";
import { COMPONENT_SPECS, type ComponentKind } from "./symbols";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

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

function Canvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeContextMenu,
}: {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodeContextMenu: NodeMouseHandler;
}) {
  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
        nodesDraggable
        nodesConnectable
        elementsSelectable
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-background dot-grid"
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={0} color="transparent" />
        <Controls className="!border-border !bg-panel [&_button]:!border-border [&_button]:!bg-panel [&_button]:!fill-foreground hover:[&_button]:!bg-surface" />
      </ReactFlow>
    </div>
  );
}

export function Board() {
  return (
    <ReactFlowProvider>
      <BoardShell />
    </ReactFlowProvider>
  );
}

let seq = 100;

function BoardShell() {
  const [paletteOpen, setPaletteOpen] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges],
  );

  const addComponent = useCallback(
    (kind: ComponentKind) => {
      const spec = COMPONENT_SPECS.find((s) => s.kind === kind);
      if (!spec) return;

      // Center of the visible canvas, in flow coordinates.
      const pane = document.querySelector(".react-flow")?.getBoundingClientRect();
      const center = pane
        ? screenToFlowPosition({
            x: pane.left + pane.width / 2,
            y: pane.top + pane.height / 2,
          })
        : { x: 0, y: 0 };

      // Slight scatter so stacked spawns stay visible.
      const jitter = (seq % 5) * 18;
      seq += 1;

      const id = `node-${seq}-${Date.now()}`;
      setNodes((nds) =>
        nds
          .map((n) => ({ ...n, selected: false }))
          .concat({
            id,
            type: "circuit",
            position: { x: center.x - 90 + jitter, y: center.y - 24 + jitter },
            data: { kind, label: spec.label, value: spec.value },
            selected: true,
          }),
      );
    },
    [screenToFlowPosition, setNodes],
  );

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
            {nodes.length} parts · sim off
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
            <Palette onAdd={addComponent} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <ResizablePanelGroup orientation="vertical" className="flex-col">
            <ResizablePanel defaultSize="65%" minSize="25%">
              <Canvas
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
              />
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

      <div className="border-t border-border bg-panel md:hidden">
        <Palette onAdd={addComponent} />
      </div>
    </div>
  );
}
