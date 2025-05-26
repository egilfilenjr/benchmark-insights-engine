import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";

// Tiered dropdowns
const industries = [
  "E-commerce",
  "SaaS",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Consumer Goods",
  "Media",
  "Agency / Consulting",
  "Nonprofit",
  "Real Estate",
  "Legal",
  "Government",
  "Other",
];

const subIndustries: Record<string, string[]> = {
  "E-commerce": ["Fashion", "Supplements", "Electronics", "Dropshipping", "Home Goods", "Other"],
  SaaS: ["B2B SaaS", "Productivity", "AI Tools", "Marketing Tools", "Fintech SaaS", "Health SaaS", "Other"],
  Healthcare: ["Clinics", "Dental", "Telehealth", "Wellness", "Pharma", "Hospitals", "Other"],
  Finance: ["Banking", "Fintech", "Credit Unions", "Insurance", "Investments", "Other"],
  Retail: ["Apparel", "Footwear", "Furniture", "Convenience", "Department Store", "Other"],
  Education: ["K–12", "Higher Ed", "EdTech", "Tutoring", "Online Courses", "Other"],
};

const companySizes = ["1–10", "11–50", "51–200", "201–500", "501–1,000", "1,001–5,000", "5,001+"];
const revenueRanges = ["< $500k", "$500k–$1M", "$1M–$5M", "$5M–$20M", "$20M–$100M", "$100M+"];
const businessModels = ["B2B", "B2C", "Both", "Marketplace", "Franchise", "Nonprofit"];
const salesMotions = ["Inbound", "Outbound", "Product-led", "Hybrid"];
const customerTypes = ["Consumers", "Businesses", "Both", "Government", "Schools"];
const productTypes = ["Physical Goods", "Digital Products", "Subscriptions", "Services", "Other"];
const geoFocus = ["Local", "Regional", "National", "Multi-national", "Global"];

export default function Onboarding() {
  const user = useUser();
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const selectedIndustry = watch("industry");

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();
    if (data) {
      Object.entries(data).forEach(([key, value]) => setValue(key, value));
      setStep(data.onboarding_step || 1);
    }
  };

  const saveStep = async () => {
    const values = getValues();
    await supabase
      .from("profiles")
      .update({ ...values, onboarding_step: step + 1 })
      .eq("id", user?.id);
  };

  const onNext = async () => {
    await saveStep();
    setStep(step + 1);
  };

  const onBack = () => setStep(step - 1);

  const onSubmit = async () => {
    const values = getValues();
    await supabase
      .from("profiles")
      .update({ ...values, onboarding_step: 5 })
      .eq("id", user?.id);
    console.log("✅ Final onboarding step saved.");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Select label="Industry" name="industry" options={industries} register={register} />
            {selectedIndustry && subIndustries[selectedIndustry] && (
              <Select
                label="Sub-Industry"
                name="sub_industry"
                options={subIndustries[selectedIndustry]}
                register={register}
              />
            )}
            <Select label="Company Size" name="company_size" options={companySizes} register={register} />
            <Select label="Revenue Range" name="revenue_range" options={revenueRanges} register={register} />
            <Select label="Business Model" name="business_model" options={businessModels} register={register} />
          </>
        );
      case 2:
        return (
          <>
            <Select label="Target Customer Type" name="customer_type" options={customerTypes} register={register} />
            <Select label="Primary Product Type" name="product_type" options={productTypes} register={register} />
            <Select label="Sales Motion" name="sales_motion" options={salesMotions} register={register} />
            <Select label="Geographic Focus" name="geo_focus" options={geoFocus} register={register} />
          </>
        );
      case 3:
        return (
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold">🎉 Almost done!</p>
            <p className="text-sm text-muted-foreground">
              Click “Finish” to complete your onboarding. You can update this info anytime in Settings.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <ProgressBar step={step} total={3} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        {renderStep()}
        <div className="flex justify-between pt-6">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <Button type="button" onClick={onNext}>
              Next
            </Button>
          ) : (
            <Button type="submit">Finish</Button>
          )}
        </div>
      </form>
    </div>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  const percent = (step / total) * 100;
  return (
    <div className="mb-4">
      <div className="text-xs font-medium text-muted-foreground mb-1">{`Step ${step} of ${total}`}</div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-lilac rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function Select({ label, name, options, register }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select {...register(name)} className="w-full border p-2 rounded">
        <option value="">Select {label}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
