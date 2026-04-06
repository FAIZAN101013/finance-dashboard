import {
  FiLayers,
  FiCreditCard,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";

import { categoryData, balanceData } from "../data/mockData";

export default function Insights() {
  // Highest spending category
  const highest = categoryData.reduce((max, item) =>
    item.value > max.value ? item : max
  );

  // Total expenses + highest % share
  const total     = categoryData.reduce((sum, item) => sum + item.value, 0);
  const highestPct = total ? ((highest.value / total) * 100).toFixed(0) : 0;

  // Monthly trend (last vs previous balance)
  const latest = balanceData.at(-1)?.balance ?? 0;
  const prev   = balanceData.at(-2)?.balance ?? 0;
  const trend  = prev ? (((latest - prev) / prev) * 100).toFixed(1) : 0;
  const isUp   = Number(trend) >= 0;

  const cards = [
    {
      label:   "Highest spending",
      value:   highest.name,
      sub:     `₹${highest.value.toLocaleString()} · ${highestPct}% of total`,
      progress: Number(highestPct),
      barColor: "#EF9F27",
      icon:    FiLayers,
      iconCls: "bg-red-50 text-red-600",
      valueCls: "text-gray-900",
    },
    {
      label:   "Total expenses",
      value:   `₹${total.toLocaleString()}`,
      sub:     `Across ${categoryData.length} categories`,
      progress: 60,
      barColor: "#888780",
      icon:    FiCreditCard,
      iconCls: "bg-gray-100 text-gray-500",
      valueCls: "text-gray-900",
    },
    {
      label:   "Monthly trend",
      value:   `${isUp ? "+" : ""}${trend}%`,
      sub:     "vs previous month",
      progress: Math.min(Math.abs(Number(trend)), 100),
      barColor: isUp ? "#1D9E75" : "#E24B4A",
      icon:    isUp ? FiTrendingUp : FiTrendingDown,
      iconCls: isUp ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600",
      valueCls: isUp ? "text-emerald-700" : "text-red-600",
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-gray-900">Insights</h3>
        <span className="text-xs text-gray-400">
          {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-3">
        {cards.map(({ label, value, sub, progress, barColor, icon: Icon, iconCls, valueCls }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">

            {/* Top row */}
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                {label}
              </p>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${iconCls}`}>
                <Icon size={12} />
              </div>
            </div>

            {/* Value */}
            <p className={`text-xl font-semibold font-mono tracking-tight leading-none ${valueCls}`}>
              {value}
            </p>

            {/* Sub */}
            <p className="text-xs text-gray-400">{sub}</p>

            {/* Progress bar */}
            <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden mt-1">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: barColor }}
              />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}