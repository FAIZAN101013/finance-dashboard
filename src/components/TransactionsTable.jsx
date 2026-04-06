import { useState, useEffect } from "react";
import { transactions as initialData } from "../data/mockData";
import TransactionRow from "./TransactionRow";
import TransactionFilters from "./TransactionFilters";
import AddTransactionModal from "./AddTransactionModal";
import EditTransactionModal from "./EditTransactionModal";

export default function TransactionsTable({ role }) {
  const [search, setSearch]         = useState("");
  const [filter, setFilter]         = useState("all");
  const [sortKey, setSortKey]       = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTx, setEditingTx]   = useState(null); // tx object or null

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
    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (sortKey === "amount") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (sortKey === "date") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between mb-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <h3 className="text-[15px] font-semibold text-gray-900">Transactions</h3>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs text-gray-500">Sort by</label>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="text-xs border border-gray-200 rounded-xl px-2 py-1 bg-white focus:outline-none"
            >
              <option value="date">Date</option>
              <option value="category">Category</option>
              <option value="amount">Amount</option>
              <option value="type">Type</option>
            </select>
            <button
              type="button"
              onClick={() => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))}
              className="text-xs font-medium text-gray-600 border border-gray-200 rounded-xl px-2 py-1 bg-white hover:bg-gray-50"
            >
              {sortDirection === "asc" ? "Ascending" : "Descending"}
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