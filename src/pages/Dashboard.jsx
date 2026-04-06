import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import BalanceChart from "../components/BalanceChart";
import CategoryChart from "../components/CategoryChart";

function Dashboard() {
  return (
    <Layout>

      {/* Cards Row */}
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard title="Total Balance" amount="12,450" type="balance" trend="+6% overall" />
        <SummaryCard title="Income" amount="8,200" type="income" trend="+12% vs last month" />
        <SummaryCard title="Expenses" amount="3,750" type="expense" trend="-4% vs last month" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <BalanceChart />
        <CategoryChart />
      </div>

    </Layout>
  );
}

export default Dashboard;