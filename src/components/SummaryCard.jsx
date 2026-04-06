
import { FiTrendingUp, FiTrendingDown, FiCreditCard } from "react-icons/fi";


const config = {
  income:  { label: "+ Income",  icon: FiTrendingUp ,   bg: "bg-emerald-50", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
  expense: { label: "- Expense", icon: FiTrendingDown,  bg: "bg-red-50",     text: "text-red-600",    badge: "bg-red-100 text-red-600" },
  balance: { label: "Balance",   icon: FiCreditCard,    bg: "bg-gray-100",   text: "text-gray-500",   badge: "bg-gray-100 text-gray-500" },
};

export default function SummaryCard({ title, amount, type = "balance", trend, currency = "₹" }) {
  const { icon: Icon, bg, text, badge } = config[type] ?? config.balance;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{title}</span>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bg} ${text}`}>
          <Icon size={14} />
        </div>
      </div>

      <p className="text-2xl font-semibold tracking-tight font-mono">
        {amount}
      </p>

      {trend && (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${badge}`}>
          {trend}
        </span>
      )}
    </div>
  );
}