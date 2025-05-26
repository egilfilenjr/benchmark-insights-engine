
interface MetricSelectorProps {
  selectedMetric: string;
  setSelectedMetric: (metric: string) => void;
  metrics: string[];
}

export default function MetricSelector({ 
  selectedMetric, 
  setSelectedMetric, 
  metrics 
}: MetricSelectorProps) {
  return (
    <div className="flex gap-3">
      {metrics.map((metric) => (
        <button
          key={metric}
          onClick={() => setSelectedMetric(metric)}
          className={`text-sm px-2 py-1 rounded ${
            selectedMetric === metric ? "bg-blue-500 text-white" : "bg-muted"
          }`}
        >
          {metric.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
