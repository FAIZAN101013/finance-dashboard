import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { categoryData } from "../data/mockData";

const COLORS = [
  { hex: "#1D9E75" },
  { hex: "#378ADD" },
  { hex: "#EF9F27" },
  { hex: "#E24B4A" },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm text-sm">
      <p className="text-gray-400 text-xs mb-0.5">{d.name}</p>
      <p className="font-semibold text-gray-900 font-mono">
        ₹{d.value.toLocaleString()}
      </p>
    </div>
  );
};

export default function CategoryChart() {
  const total = categoryData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">

      {/* Header */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
          Spending breakdown
        </p>
        <p className="text-2xl font-semibold text-gray-900 font-mono tracking-tight">
          ₹{total.toLocaleString()}
        </p>
      </div>

      {/* Donut + Legend */}
      <div className="flex items-center gap-4">

        {/* Fixed pixel height — never "100%" */}
        <div style={{ width: 160, height: 160, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={72}
                strokeWidth={0}
                paddingAngle={2}
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length].hex}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 flex-1">
          {categoryData.map((entry, index) => {
            const pct = ((entry.value / total) * 100).toFixed(0);
            return (
              <div key={index} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2 h-2 rounded-sm flex-shrink-0"
                    style={{ background: COLORS[index % COLORS.length].hex }}
                  />
                  <span className="text-xs text-gray-500 truncate">{entry.name}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: COLORS[index % COLORS.length].hex,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-7 text-right">
                    {pct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}