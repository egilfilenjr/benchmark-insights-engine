// src/components/benchmarks/BenchmarkTable.tsx

type BenchmarkRow = {
  metric: string;
  value: string | number;
  percentile: number;
};

type BenchmarkTableProps = {
  data: BenchmarkRow[];
};

export function BenchmarkTable({ data }: BenchmarkTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="border border-gray-200 px-4 py-2">Metric</th>
            <th className="border border-gray-200 px-4 py-2">Value</th>
            <th className="border border-gray-200 px-4 py-2">Percentile</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-sm text-gray-800">
              <td className="border border-gray-200 px-4 py-2">{row.metric}</td>
              <td className="border border-gray-200 px-4 py-2">{row.value}</td>
              <td className="border border-gray-200 px-4 py-2">{row.percentile}th</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
