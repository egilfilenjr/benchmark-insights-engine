
interface DashboardFiltersProps {
  industry: string;
  setIndustry: (value: string) => void;
  companySize: string;
  setCompanySize: (value: string) => void;
  maturity: string;
  setMaturity: (value: string) => void;
  integration: string;
  setIntegration: (value: string) => void;
}

const industryOptions = ["All", "E-commerce", "SaaS", "Healthcare"];
const sizeOptions = ["All", "1–10", "11–50", "51–200", "501+"];
const maturityOptions = ["All", "Beginner", "Intermediate", "Advanced"];
const platformOptions = ["All", "google_ads", "meta_ads", "linkedin_ads", "tiktok_ads"];

export default function DashboardFilters({
  industry,
  setIndustry,
  companySize,
  setCompanySize,
  maturity,
  setMaturity,
  integration,
  setIntegration,
}: DashboardFiltersProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Dropdown label="Industry" value={industry} onChange={setIndustry} options={industryOptions} />
      <Dropdown label="Size" value={companySize} onChange={setCompanySize} options={sizeOptions} />
      <Dropdown label="Maturity" value={maturity} onChange={setMaturity} options={maturityOptions} />
      <Dropdown label="Integration" value={integration} onChange={setIntegration} options={platformOptions} />
    </div>
  );
}

function Dropdown({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="text-xs font-medium block mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-2 py-1 rounded text-sm"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
