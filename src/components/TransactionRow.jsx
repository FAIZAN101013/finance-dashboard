const CAT_COLORS = {
  Salary: "#1D9E75",
  Freelance: "#378ADD",
  Groceries: "#EF9F27",
  Transport: "#E24B4A",
  Shopping: "#BA7517",
  Rent: "#A32D2D",
};

export default function TransactionRow({ tx, role, onDelete, onEdit }) {
  const dotColor = CAT_COLORS[tx.category] ?? "#888780";
  const isIncome = tx.type === "income";

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors last:border-none">
      
      {/* Date */}
      <td className="py-3 px-3 text-xs text-gray-400 whitespace-nowrap">
        {tx.date}
      </td>

      {/* Category */}
      <td className="py-3 px-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: dotColor }}
          />
          {tx.category}
        </span>
      </td>

      {/* Amount */}
      <td className="py-3 px-3">
        <span
          className={`font-mono text-sm font-medium ${
            isIncome ? "text-emerald-700" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"}₹{tx.amount.toLocaleString()}
        </span>
      </td>

      {/* Type */}
      <td className="py-3 px-3">
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${
            isIncome
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {tx.type}
        </span>
      </td>

      {/* ✅ ACTIONS */}
      {role === "Admin" && (
        <td className="py-3 px-3">
          <div className="flex gap-2">
            
            {/* EDIT */}
            <button
              onClick={() => onEdit?.(tx)}
              className="text-xs font-medium text-blue-500 border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>

            {/* DELETE */}
            <button
              onClick={() => {
                if (confirm("Delete this transaction?")) {
                  onDelete?.(tx.id);
                }
              }}
              className="text-xs font-medium text-red-500 border border-gray-200 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
            >
              Delete
            </button>

          </div>
        </td>
      )}
    </tr>
  );
}