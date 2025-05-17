import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

const industries = ["SaaS", "Ecommerce", "Healthcare", "Finance", "Local Services", "Education"];
const conversionTypes = ["Leads", "Purchases", "Appointments", "Signups", "Demos"];

export default function Onboarding() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [industry, setIndustry] = useState("");
  const [conversionType, setConversionType] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user?.id) {
        setUserId(data.user.id);
      } else {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    if (!teamName || !industry || !conversionType) {
      toast.error("Please complete all fields");
      return;
    }

    setLoading(true);

    // 1. Create team
    const { data: teamData, error: teamError } = await supabase
      .from("teams")
      .insert({
        name: teamName,
        industry,
        conversion_type: conversionType,
        plan: "free",
      })
      .select()
      .single();

    if (teamError || !teamData) {
      toast.error("Failed to create team");
      setLoading(false);
      return;
    }

    // 2. Add user to team
    await supabase.from("team_members").insert({
      team_id: teamData.id,
      user_id: userId,
      role: "admin",
    });

    // 3. Set onboarding complete
    await supabase
      .from("user_preferences")
      .upsert({ user_id: userId, onboarding_completed: true }, { onConflict: "user_id" });

    setLoading(false);
    toast.success("You're all set!");
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-lg">
        <CardContent className="py-6 space-y-6">
          <CardTitle className="text-center text-2xl">Welcome to Benchmarketing</CardTitle>

          <div className="space-y-2">
            <Label>Team Name</Label>
            <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Industry</Label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
            >
              <option value="">Select industry</option>
              {industries.map((ind, i) => (
                <option key={i} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Conversion Type</Label>
            <select
              value={conversionType}
              onChange={(e) => setConversionType(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
            >
              <option value="">Select conversion type</option>
              {conversionTypes.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <Button className="w-full mt-4" onClick={handleSubmit} disabled={loading}>
            {loading ? "Finishing Setup..." : "Complete Onboarding"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
