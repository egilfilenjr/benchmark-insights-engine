
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@supabase/supabase-js";

export default function Onboarding() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company_name: "",
    industry: "",
    company_size: "",
    goals: [] as string[]
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (!user) {
        navigate('/auth/login');
      }
    };

    getCurrentUser();
  }, [navigate]);

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      if (user) {
        await supabase
          .from('profiles')
          .update({ 
            ...formData,
            onboarding_step: 5 
          })
          .eq('id', user.id);
      }
      navigate('/dashboard');
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome! Let's get started</CardTitle>
          <p className="text-sm text-muted-foreground">Step {step} of 4</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => updateFormData('company_name', e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <select
                  id="industry"
                  className="w-full border rounded px-3 py-2"
                  value={formData.industry}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                >
                  <option value="">Select industry</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="SaaS">SaaS</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="company_size">Company Size</Label>
                <select
                  id="company_size"
                  className="w-full border rounded px-3 py-2"
                  value={formData.company_size}
                  onChange={(e) => updateFormData('company_size', e.target.value)}
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <Label>What are your main goals?</Label>
              <div className="space-y-2">
                {["Reduce CPA", "Increase ROAS", "Scale campaigns", "Improve targeting"].map((goal) => (
                  <label key={goal} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(goal)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData('goals', [...formData.goals, goal]);
                        } else {
                          updateFormData('goals', formData.goals.filter(g => g !== goal));
                        }
                      }}
                    />
                    <span>{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleNext} className="w-full">
            {step === 4 ? "Complete Setup" : "Next"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
