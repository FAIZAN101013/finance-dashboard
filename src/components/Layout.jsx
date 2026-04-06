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
  const [role, setRole] = useState("Viewer");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    // Portfolio is the only live page — children renders it
    if (activePage === "portfolio") {
      return typeof children === "function" ? children(role) : children;
    }

    // In Layout.jsx
return <UnderConstruction title={PAGE_TITLES[activePage]} pageId={activePage} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity md:hidden ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="md:flex md:h-screen">
        <Sidebar
          active={activePage}
          onNavigate={handleNavigate}
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header
            title={PAGE_TITLES[activePage]}
            role={role}
            setRole={setRole}
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          />

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}