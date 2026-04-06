import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import UnderConstruction from "./UnderConstruction";

const PAGE_TITLES = {
  portfolio: "Portfolio overview",
  activity:  "Activity",
  insights:  "Insights",
  vault:     "Vault",
  settings:  "Settings",
  support:   "Support",
};

export default function Layout({ children }) {
  const [activePage, setActivePage] = useState("portfolio");
  const [role, setRole]             = useState("Viewer");

  const renderContent = () => {
    // Portfolio is the only live page — children renders it
    if (activePage === "portfolio") {
      return typeof children === "function" ? children(role) : children;
    }

    // In Layout.jsx
return <UnderConstruction title={PAGE_TITLES[activePage]} pageId={activePage} />;
  };

  return (
    <div className="flex h-screen bg-gray-50">

      <Sidebar active={activePage} onNavigate={setActivePage} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          title={PAGE_TITLES[activePage]}
          role={role}
          setRole={setRole}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>

      </div>
    </div>
  );
}