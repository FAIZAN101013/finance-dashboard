import {
  FiHome,
  FiActivity,
  FiPieChart,
  FiLock,
  FiSettings,
  FiHelpCircle,
  FiX,
} from "react-icons/fi";

const navItems = [
  { id: "portfolio", label: "Portfolio", icon: FiHome },
  { id: "activity",  label: "Activity",  icon: FiActivity, badge: 3 },
  { id: "insights",  label: "Insights",  icon: FiPieChart },
  { id: "vault",     label: "Vault",     icon: FiLock },
];

const bottomItems = [
  { id: "settings", label: "Settings", icon: FiSettings },
  { id: "support",  label: "Support",  icon: FiHelpCircle },
];

const NavButton = ({ id, label, icon: Icon, badge, active, onNavigate }) => (
  <button
    onClick={() => onNavigate?.(id)}
    aria-current={active === id ? "page" : undefined}
    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium w-full text-left transition-colors duration-150 ${
      active === id
        ? "bg-emerald-50 text-emerald-700"
        : "text-gray-400 hover:bg-gray-50 hover:text-gray-800"
    }`}
  >
    <Icon size={15} />
    <span className="flex-1">{label}</span>
    {badge && (
      <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

export default function Sidebar({ active = "portfolio", onNavigate, mobileOpen = false, onClose }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white h-full flex flex-col justify-between px-3 py-5 border-r border-gray-100 transition-transform duration-300 md:static md:translate-x-0 md:w-56 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:flex`}>

      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h1 className="text-lg font-semibold tracking-tight px-2">
            fin<span className="text-emerald-600">ora</span>
          </h1>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
              aria-label="Close menu"
            >
              <FiX size={18} />
            </button>
          )}
        </div>

        <div className="h-px bg-gray-100 mb-4" />

        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <NavButton key={item.id} {...item} active={active} onNavigate={onNavigate} />
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div>
        <div className="h-px bg-gray-100 my-3" />

        <nav className="flex flex-col gap-0.5 mb-3">
          {bottomItems.map((item) => (
            <NavButton key={item.id} {...item} active={active} onNavigate={onNavigate} />
          ))}
        </nav>

        {/* User card */}
        <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            FA
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 leading-none">Faizan</p>
            <p className="text-xs text-gray-400 mt-0.5">Premium</p>
          </div>
        </div>
      </div>

    </aside>
  );
}