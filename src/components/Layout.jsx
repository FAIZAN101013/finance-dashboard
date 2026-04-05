import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children, pageTitle }) {
  const [activePage, setActivePage] = useState("portfolio");

  const pageTitles = {
    portfolio: "Portfolio overview",
    activity:  "Activity",
    insights:  "Insights",
    vault:     "Vault",
    settings:  "Settings",
    support:   "Support",
  };

  return (
    <div className="flex h-screen bg-[#f5f4f0]">
      <Sidebar active={activePage} onNavigate={setActivePage} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={pageTitle ?? pageTitles[activePage]} />
        <main className="flex-1 overflow-y-auto p-6 space-y-4">
          {children}
        </main>
      </div>
    </div>
  );
}