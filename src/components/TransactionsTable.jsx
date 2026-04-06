import { useState, useEffect } from "react";
import { transactions as initialData } from "../data/mockData";
import TransactionRow from "./TransactionRow";
import TransactionFilters from "./TransactionFilters";
import AddTransactionModal from "./AddTransactionModal";
import EditTransactionModal from "./EditTransactionModal";

const SORT_OPTIONS = [
  { value: "date",     label: "Date" },
  { value: "category", label: "Category" },
  { value: "amount",   label: "Amount" },
  { value: "type",     label: "Type" },
];

export default function TransactionsTable({ role }) {
  const [search, setSearch]               = useState("");
  const [filter, setFilter]               = useState("all");
  const [sortKey, setSortKey]             = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showAddModal, setShowAddModal]   = useState(false);
  const [editingTx, setEditingTx]         = useState(null);

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");
      return saved ? JSON.parse(saved) : initialData;
    } catch {
      return initialData;
    }
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  }, [data]);

  const handleAdd = (newTx) => {
    setData((prev) => [{ ...newTx, id: Date.now() }, ...prev]);
  };

  const handleSave = (updatedTx) => {
    setData((prev) => prev.map((tx) => tx.id === updatedTx.id ? updatedTx : tx));
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((tx) => tx.id !== id));
  };

  const filteredData = data.filter((tx) => {
    const matchesSearch = tx.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || tx.type === filter;
    return matchesSearch && matchesFilter;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const normalize = (val, key) => {
      if (key === "amount") return Number(val);
      if (key === "date")   return new Date(val).getTime();
      return String(val).toLowerCase();
    };

    const aValue = normalize(a[sortKey], sortKey);
    const bValue = normalize(b[sortKey], sortKey);

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;

    if (sortKey !== "date") {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return bDate - aDate;
    }

    return 0;
  });

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between mb-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <h3 className="text-[15px] font-semibold text-gray-900">Transactions</h3>

          {/* Sort controls */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mr-1">
              Sort
            </span>

            {/* Sort key pills */}
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSortKey(opt.value)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all duration-150 ${
                  sortKey === opt.value
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}

            {/* Divider */}
            <span className="w-px h-4 bg-gray-200 mx-0.5" />

            {/* Asc / Desc toggle */}
            <button
              type="button"
              onClick={() => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))}
              className="flex items-center gap-1 text-[11px] font-medium text-gray-500 border border-gray-200 rounded-full px-2.5 py-1 bg-white hover:border-gray-400 hover:text-gray-700 transition-all duration-150"
            >
              {sortDirection === "asc" ? (
                <>
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 10V2M3 5l3-3 3 3"/>
                  </svg>
                  Asc
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2v8M3 7l3 3 3-3"/>
                  </svg>
                  Desc
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {filteredData.length} transaction{filteredData.length !== 1 ? "s" : ""}
          </span>
          {role === "Admin" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              + Add
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[540px]">
          <thead>
            <tr className="border-b border-gray-100">
              {["Date", "Category", "Amount", "Type", ...(role === "Admin" ? ["Action"] : [])].map((h) => (
                <th
                  key={h}
                  className="pb-2.5 px-3 text-left text-[11px] font-medium text-gray-400 uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((tx) => (
              <TransactionRow
                key={tx.id}
                tx={tx}
                role={role}
                onEdit={() => setEditingTx(tx)}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-sm text-gray-400">No transactions found</p>
          <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Add modal */}
      {showAddModal && (
        <AddTransactionModal
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit modal */}
      {editingTx && (
        <EditTransactionModal
          tx={editingTx}
          onSave={handleSave}
          onClose={() => setEditingTx(null)}
        />
      )}

    </div>
  );
}