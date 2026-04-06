import { useState } from "react";
import { FiX } from "react-icons/fi";

const TYPES = [
  { value: "expense", label: "— Expense", active: "bg-red-50 text-red-600 border-red-200" },
  { value: "income",  label: "+ Income",  active: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

export default function EditTransactionModal({ tx, onSave, onClose }) {
  const [form, setForm] = useState({
    date:     tx.date     ?? "",
    category: tx.category ?? "",
    amount:   tx.amount   ?? "",
    type:     tx.type     ?? "expense",
  });

  const isValid = form.date && form.category.trim() && Number(form.amount) > 0;

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onSave({ ...tx, ...form, amount: Number(form.amount) });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-lg">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-gray-900">Edit transaction</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors"
          >
            <FiX size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. Groceries"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
              Amount (₹)
            </label>
            <input
              type="number"
              placeholder="0"
              min="1"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Type toggle */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
              Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TYPES.map(({ value, label, active }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set("type", value)}
                  className={`py-2 rounded-xl text-xs font-medium border transition-colors ${
                    form.type === value
                      ? active
                      : "bg-white text-gray-400 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-200 disabled:cursor-not-allowed transition-colors mt-1"
          >
            Save changes
          </button>

        </form>

        <button
          onClick={onClose}
          className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors mt-3"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}