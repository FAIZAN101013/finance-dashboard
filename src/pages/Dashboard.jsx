import { useState, useEffect } from "react";

import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import BalanceChart from "../components/BalanceChart";
import CategoryChart from "../components/CategoryChart";
import TransactionsTable from "../components/TransactionsTable";
import Insights from "../components/Insights";

import { transactions as initialData } from "../data/mockData";
import { calculateSummary } from "../utils/calculateSummary";
import { formatCurrency } from "../utils/formatCurrency";

function Dashboard() {
  // Mirror the same localStorage state so summary stays in sync with the table
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");
      return saved ? JSON.parse(saved) : initialData;
    } catch {
      return initialData;
    }
  });

  // Keep in sync when TransactionsTable writes to localStorage
  useEffect(() => {
    const sync = () => {
      try {
        const saved = localStorage.getItem("transactions");
        if (saved) setTransactions(JSON.parse(saved));
      } catch {}
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const summary = calculateSummary(transactions);

  return (
    <Layout>
      {(role) => (
        <div className="flex flex-col gap-4">

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SummaryCard
              title="Total Balance"
              amount={formatCurrency(summary.balance)}
              type="balance"
              trend="+6% overall"
            />
            <SummaryCard
              title="Income"
              amount={formatCurrency(summary.income)}
              type="income"
              trend="+12% vs last month"
            />
            <SummaryCard
              title="Expenses"
              amount={formatCurrency(summary.expense)}
              type="expense"
              trend="-4% vs last month"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BalanceChart />
            <CategoryChart />
          </div>

          {/* Insights */}
          <Insights />

          {/* Transactions */}
          <TransactionsTable role={role} />

        </div>
      )}
    </Layout>
  );
}

export default Dashboard;