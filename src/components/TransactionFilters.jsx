import { FiSearch } from "react-icons/fi";

const FILTERS = [
  { value: "all",     label: "All" },
  { value: "income",  label: "Income" },
  { value: "expense", label: "Expense" },
];

const activeClass = {
  all:     "bg-gray-100 text-gray-600 border-gray-200",
  income:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  expense: "bg-red-50 text-red-600 border-red-200",
};

export default function TransactionFilters({ search, setSearch, filter, setFilter }) {
  return (
    <div className="flex gap-2 mb-4">

      {/* Search */}
      <div className="relative flex-1">
        <FiSearch
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Filter pills */}
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors ${
            filter === value
              ? activeClass[value]
              : "bg-white text-gray-400 border-gray-200 hover:bg-gray-50"
          }`}
        >
          {label}
        </button>
      ))}

    </div>
  );
}