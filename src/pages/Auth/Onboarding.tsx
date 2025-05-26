import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";

const industries = ["E-commerce", "SaaS", "Healthcare", "Finance", "Education", "Retail", "Nonprofit", "Other"];
const sizes = ["1–10", "11–50", "51–200", "201–500", "501–1,000", "1,001–5,000", "5,001+"];
const revenues = ["< $500k", "$500k–$1M", "$1M–$5M", "$5M–$20M", "$20M–$100M", "$100M+"];
const models = ["B2B", "B2C", "Both", "Marketplace", "Nonprofit", "Franchise"];
const geo = ["Local", "Regional", "National", "Global"];
const channels = ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "Email", "SEO", "Affiliate"];
const crms = ["HubSpot", "Salesforce", "Klaviyo", "Mailchimp", "Zoho", "Other"];
const commerce = ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Custom"];
const spend = ["< $5k", "$5k–$25k", "$25k–$100k", "$100k–$500k", "$500k+"];
const roles = ["Founder", "CMO", "Marketing Manager", "Media Buyer", "Agency", "Other"];
const reporting = ["Daily", "Weekly", "Monthly", "Quarterly"];
const maturity = ["Beginner", "Intermediate", "Advanced", "Enterprise"];

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
  } = useForm({ defaultValues: {} });

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
    await supabase.from("profiles").update({
      ...values,
      onboarding_step: step + 1,
    }).eq("id", user?.id);
  };

  const onNext = async () => {
    await saveStep();
    setStep(step + 1);
  };

  const onBack = () => setStep(step - 1);

  const onSubmit = async () => {
    const values = getValues();
    await supabase.from("profiles").update({
      ...values,
      onboarding_step: 5,
    }).eq("id", user?.id);
    console.log("🎉 Onboarding Complete!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Dropdown label="Industry" options={industries} register={register} name="industry" />
            <Dropdown label="Company Size" options={sizes} register={register} name="company_size" />
            <Dropdown label="Revenue" options={revenues} register={register} name="revenue" />
            <Dropdown label="Business Model" options={models} register={register} name="model" />
            <Dropdown label="Geo Focus" options={geo} register={register} name="geo" />
          </>
        );
      case 2:
        return (
          <>
            <Multi label="Marketing Channels" options={channels} register={register} name="channels" />
            <Dropdown label="Monthly Ad Spend" options={spend} register={register} name="ad_spend" />
            <Dropdown label="CRM/CDP" options={crms} register={register} name="crm" />
            <Dropdown label="Commerce Platform" options={commerce} register={register} name="commerce_platform" />
          </>
        );
      case 3:
        return (
          <>
            <Dropdown label="Your Role" options={roles} register={register} name="role" />
            <Dropdown label="Reporting Frequency" options={reporting} register={register} name="reporting_frequency" />
            <Dropdown label="Analytics Maturity" options={maturity} register={register} name="analytics_maturity" />
            <Checkbox label="Work with an agency" register={register} name="works_with_agency" />
            <Checkbox label="Need integration help" register={register} name="needs_help" />
            <Checkbox label="Join beta access group" register={register} name="join_beta" />
          </>
        );
      case 4:
        return (
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold">🎉 All set!</p>
            <p className="text-sm text-muted-foreground">Click Finish to save your onboarding profile.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <ProgressBar step={step} />
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
          {step < 4 ? (
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

function ProgressBar({ step }: { step: number }) {
  const steps = ["Basics", "Marketing", "Preferences", "Done"];
  return (
    <div className="flex justify-between text-xs font-medium text-muted-foreground px-1">
      {steps.map((label, i) => (
        <span key={label} className={step >= i + 1 ? "text-primary" : ""}>
          {label}
        </span>
      ))}
    </div>
  );
}

function Dropdown({ label, options, register, name }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select {...register(name)} className="w-full border p-2 rounded">
        <option value="">Select {label}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Multi({ label, options, register, name }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select {...register(name)} multiple className="w-full border p-2 rounded h-32">
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, name, register }: any) {
  return (
    <div className="flex items-center space-x-2">
      <input type="checkbox" {...register(name)} />
      <label>{label}</label>
    </div>
  );
}
