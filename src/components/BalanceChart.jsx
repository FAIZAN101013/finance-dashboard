import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { balanceData } from "../data/mockData";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm text-sm">
      <p className="text-gray-400 text-xs mb-0.5">{label}</p>
      <p className="font-semibold text-gray-900 font-mono">
        ₹{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

export default function BalanceChart() {
  const latest = balanceData?.[balanceData.length - 1]?.balance ?? 0;
  const prev   = balanceData?.[balanceData.length - 2]?.balance ?? 0;
  const pct    = prev ? (((latest - prev) / prev) * 100).toFixed(1) : null;
  const isUp   = latest >= prev;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Balance trend
          </p>
          <p className="text-2xl font-semibold text-gray-900 font-mono tracking-tight">
            ₹{latest.toLocaleString()}
          </p>
        </div>

        {pct && (
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              isUp
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {isUp ? "+" : ""}{pct}% this month
          </span>
        )}
      </div>

      {/* Chart — fixed pixel height, never "100%" */}
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart
          data={balanceData}
          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#1D9E75" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#1D9E75" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "inherit" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "inherit" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#1D9E75"
            strokeWidth={2}
            fill="url(#balanceGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#1D9E75", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}