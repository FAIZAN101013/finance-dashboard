import { useState } from "react";
import { FiBell } from "react-icons/fi";
 
export default function Header({ title = "Portfolio overview", notifCount = 3 }) {
  const [role, setRole] = useState("Viewer");
 
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
 
  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 border-b border-gray-100">
      {/* Left */}
      <div className="flex flex-col gap-0.5">
        <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">{title}</h2>
        <span className="text-xs text-gray-400">{today}</span>
      </div>
 
      {/* Right */}
      <div className="flex items-center gap-2.5">
        {/* Notification bell */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <FiBell size={15} className="text-gray-400" />
          {notifCount > 0 && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          )}
        </button>
 
        {/* Role selector */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="text-[12.5px] font-medium border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-800 appearance-none cursor-pointer pr-7 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23888' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 8px center",
          }}
        >
          <option>Viewer</option>
          <option>Admin</option>
        </select>
      </div>
    </div>
  );
}