
import { Outlet, NavLink } from "react-router-dom";
import { ComparisonToggle } from "@/components/dashboard/ComparisonToggle";
import { useState } from "react";

export default function DashboardGoogleAnalytics() {
  const [compareMode, setCompareMode] = useState<"competitors"|"yourself">("competitors");
  const [timeframe, setTimeframe] = useState<"YOY"|"MOM"|"WOW">("MOM");

  const tabs = [
    { name: "Overview", path: "overview" },
    { name: "Funnel", path: "funnel" },
    { name: "Trends", path: "trends" },
    { name: "Alerts", path: "alerts" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Google Analytics Dashboard</h1>
      <ComparisonToggle 
        compareMode={compareMode}
        setCompareMode={setCompareMode}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        className="mb-6"
      />
      <nav className="flex gap-2 mb-4 border-b pb-2">
        {tabs.map(tab => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              "text-sm px-4 py-2 rounded-t-md font-medium transition hover:bg-gray-50 " + (isActive ? "bg-primary text-white" : "")
            }
            end
          >
            {tab.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
