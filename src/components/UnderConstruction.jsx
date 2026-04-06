import {
  FiActivity,
  FiPieChart,
  FiLock,
  FiSettings,
  FiHelpCircle,
  FiLayout,
} from "react-icons/fi";

// Map each page to a relevant icon
const PAGE_ICONS = {
  activity: FiActivity,
  insights: FiPieChart,
  vault:    FiLock,
  settings: FiSettings,
  support:  FiHelpCircle,
};

export default function UnderConstruction({ title, pageId }) {
  const Icon = PAGE_ICONS[pageId] ?? FiLayout;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">

      {/* Icon box */}
      <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
        <Icon size={26} className="text-emerald-600" strokeWidth={1.5} />
      </div>

      {/* Text */}
      <h2 className="text-base font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-400 leading-relaxed mb-6">
        We're building something great here.<br />Check back soon.
      </p>

      {/* In progress badge */}
      <span className="inline-flex items-center gap-2 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        In progress
      </span>

    </div>
  );
}