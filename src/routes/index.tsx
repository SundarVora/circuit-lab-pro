import { createFileRoute } from "@tanstack/react-router";
import { Board } from "@/components/circuit/Board";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CircuitLab — Visual Electronic Circuit Simulator" },
      {
        name: "description",
        content:
          "Drag resistors, capacitors and batteries onto a dark node-based breadboard and watch signals on a built-in oscilloscope panel.",
      },
      { property: "og:title", content: "CircuitLab — Visual Electronic Circuit Simulator" },
      {
        property: "og:description",
        content:
          "A premium, dark-mode circuit sandbox for beginners and hobbyists: drag-and-drop parts, wire them up, read the scope.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Board />;
}
