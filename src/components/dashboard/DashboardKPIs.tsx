
import { useMemo } from "react";
import KpiTile from "./KpiTile";

interface KPIData {
  [key: string]: {
    value: number;
    change: number;
    benchmark: number;
  };
}

interface DashboardKPIsProps {
  kpis: KPIData;
}

const getKpiColor = (value: number, benchmark: number) => {
  if (value >= benchmark) return "green";
  if (value >= benchmark * 0.9) return "yellow";
  return "red";
};

export default function DashboardKPIs({ kpis }: DashboardKPIsProps) {
  const renderKpis = useMemo(() => {
    return Object.entries(kpis).map(([key, { value, change, benchmark }]: any) => (
      <KpiTile
        key={key}
        title={key.toUpperCase()}
        value={value}
        change={change}
        benchmark={benchmark}
        color={getKpiColor(value, benchmark)}
      />
    ));
  }, [kpis]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {renderKpis}
    </div>
  );
}
