import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = Array.from({ length: 240 }, (_, i) => {
  const t = (i / 240) * 4 * Math.PI;
  return {
    t: Number(((i / 240) * 20).toFixed(2)),
    v1: Number((5 * Math.sin(t)).toFixed(3)),
    v2: Number((3 * Math.sin(t + Math.PI / 3)).toFixed(3)),
  };
});

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-surface/50 px-3 py-1.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="font-mono text-sm text-primary">{value}</div>
    </div>
  );
}

export function ScopePanel() {
  return (
    <section className="flex h-full flex-col bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Oscilloscope
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-trace">
            <span className="h-1.5 w-1.5 rounded-full bg-trace" /> CH1
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> CH2
          </span>
        </div>
        <div className="flex gap-2">
          <Readout label="Time/div" value="2.0 ms" />
          <Readout label="Volts/div" value="1.0 V" />
          <Readout label="Freq" value="100 Hz" />
        </div>
      </div>

      <div className="min-h-0 flex-1 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: -12 }}>
            <CartesianGrid stroke="var(--grid)" strokeDasharray="2 4" />
            <XAxis
              dataKey="t"
              tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "monospace" }}
              stroke="var(--border)"
              tickLine={false}
            />
            <YAxis
              domain={[-6, 6]}
              tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "monospace" }}
              stroke="var(--border)"
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                fontFamily: "monospace",
                fontSize: 12,
              }}
              labelStyle={{ color: "var(--muted-foreground)" }}
            />
            <Line
              type="monotone"
              dataKey="v1"
              stroke="var(--trace)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="v2"
              stroke="var(--signal)"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="4 3"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
