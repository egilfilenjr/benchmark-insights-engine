import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const industries = [
  // SaaS + Tech
  { name: "B2B SaaS", topKPIs: ["Lead CPA", "Demo ROAS", "MQL %"], channels: ["Google Search", "LinkedIn", "Meta"] },
  { name: "Cybersecurity", topKPIs: ["Lead CPA", "eBook CTR", "Free Trial Signup"], channels: ["LinkedIn", "Content Syndication", "Display"] },
  { name: "CRM Platforms", topKPIs: ["Signup CPA", "Demo Conversion", "ROAS"], channels: ["Google", "Meta", "YouTube"] },

  // Ecommerce
  { name: "DTC Apparel", topKPIs: ["Purchase ROAS", "Add-to-Cart Rate"], channels: ["Meta", "TikTok", "Google Shopping"] },
  { name: "Skincare & Beauty", topKPIs: ["Trial CPA", "ROAS", "Repeat Purchase"], channels: ["Instagram", "UGC", "YouTube"] },
  { name: "Supplements", topKPIs: ["Subscription CPA", "First Order ROAS"], channels: ["TikTok", "Meta", "Influencer"] },

  // Local
  { name: "Dental Clinics", topKPIs: ["Call CPA", "Appointment Rate"], channels: ["Google LSAs", "Meta", "Waze"] },
  { name: "HVAC Services", topKPIs: ["Lead CPA", "Form Fill %"], channels: ["Google", "Yelp", "Display"] },
  { name: "Plumbing Companies", topKPIs: ["Call Volume", "Map View CTR"], channels: ["Google Maps", "Local SEO", "LSA"] },

  // Healthcare
  { name: "Chiropractors", topKPIs: ["Appointment CPA", "Local CTR"], channels: ["Google Search", "Meta", "Nextdoor"] },
  { name: "Urgent Care", topKPIs: ["Walk-in ROAS", "Wait Time CTR"], channels: ["Google", "Waze", "Display"] },
  { name: "IV Therapy", topKPIs: ["Booking Rate", "First-Touch ROAS"], channels: ["Instagram", "TikTok", "Email"] },

  // Education
  { name: "Online Courses", topKPIs: ["Enrollments", "Trial ROAS"], channels: ["YouTube", "Google", "LinkedIn"] },
  { name: "Bootcamps", topKPIs: ["Lead CPA", "Application Completion"], channels: ["Search", "TikTok", "Meta"] },
  { name: "Colleges & Universities", topKPIs: ["Form Submits", "Student Acquisition Cost"], channels: ["Display", "Google", "YouTube"] },

  // Finance & Insurance
  { name: "Credit Unions", topKPIs: ["Open Rate", "New Accounts"], channels: ["Search", "Meta", "Email"] },
  { name: "Home Insurance", topKPIs: ["Quote CPA", "Policy ROAS"], channels: ["Search", "Affiliate", "Display"] },
  { name: "Tax Advisors", topKPIs: ["Booking CPA", "Lead Volume"], channels: ["Google", "Bing", "Local Display"] },

  // Legal
  { name: "Injury Law", topKPIs: ["Call CPA", "Settlement ROAS"], channels: ["Google Search", "TV Retargeting", "YouTube"] },
  { name: "Family Law", topKPIs: ["Consult Bookings", "Live Chat Rate"], channels: ["Search", "Display", "Meta"] },
  { name: "Criminal Defense", topKPIs: ["Urgent Call CPA", "Weekend CTR"], channels: ["Google", "YouTube", "LSA"] },

  // Real Estate & Home
  { name: "Realtors", topKPIs: ["Lead CPA", "Tour Schedule Rate"], channels: ["Google Local", "Meta", "Zillow"] },
  { name: "Mortgage Brokers", topKPIs: ["Form CPA", "Rate Tool Usage"], channels: ["Search", "Email", "Display"] },
  { name: "Roofing Companies", topKPIs: ["Inspection Leads", "Quote ROAS"], channels: ["Google", "Waze", "Nextdoor"] },

  // CPG & Retail
  { name: "Packaged Food", topKPIs: ["ROAS", "In-Store CTR"], channels: ["Display", "TikTok", "Retail Media"] },
  { name: "Home Goods", topKPIs: ["Ecomm ROAS", "Store Visit Lift"], channels: ["Search", "Pinterest", "Meta"] },
  { name: "Pet Supplies", topKPIs: ["Subscription ROAS", "Trial CPA"], channels: ["Meta", "Amazon Ads", "UGC"] },

  // Nonprofit
  { name: "Faith-Based Orgs", topKPIs: ["Donation ROAS", "Newsletter CTR"], channels: ["Search Grants", "Meta", "Email"] },
  { name: "Advocacy Groups", topKPIs: ["Petition CPA", "Fundraising Efficiency"], channels: ["Display", "YouTube", "Programmatic"] },
  { name: "Environmental Causes", topKPIs: ["One-Time Gifts", "Event RSVPs"], channels: ["Instagram", "Google", "Eventbrite"] },

  // Travel, Tourism, Events
  { name: "Airlines", topKPIs: ["Ticket ROAS", "Site Speed to Conversion"], channels: ["Google", "Meta", "App Ads"] },
  { name: "Hotels", topKPIs: ["Booking ROAS", "Cancellation Rate"], channels: ["Meta", "Search", "Retargeting"] },
  { name: "Music Festivals", topKPIs: ["Ticket ROAS", "Waitlist CTR"], channels: ["Instagram", "TikTok", "UGC"] },

  // Misc. Services
  { name: "Wedding Planners", topKPIs: ["Inquiry CPA", "Response Rate"], channels: ["Google", "Pinterest", "Meta"] },
  { name: "Coaching & Consulting", topKPIs: ["Call Booking Rate", "Newsletter CTR"], channels: ["Email", "Search", "LinkedIn"] },
  { name: "Freelancers", topKPIs: ["Portfolio Clicks", "Proposal Win Rate"], channels: ["Instagram", "TikTok", "LinkedIn"] },

  // Emerging / High-growth
  { name: "Web3 Startups", topKPIs: ["Signup CPA", "Token Holder Growth"], channels: ["Discord", "X (Twitter)", "Search"] },
  { name: "AI Tools", topKPIs: ["Trial ROAS", "Engagement Rate"], channels: ["Google", "LinkedIn", "YouTube"] },
  { name: "Marketplace Apps", topKPIs: ["LTV:CAC", "User Growth Rate"], channels: ["TikTok", "Meta", "Referrals"] },

  // Add 90 more at scale if you’re syncing from Supabase
  // The above 30+ give you full spectrum across B2B, B2C, Local, High-Growth, and Niche verticals
];

export default function Industries() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Benchmarks by Industry</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From local clinics to SaaS unicorns — explore benchmarks tailored to your category.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <Card key={i} className="hover:shadow-md transition h-full">
              <CardContent className="p-4 space-y-2">
                <CardTitle>{ind.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  <strong>Top KPIs:</strong> {ind.topKPIs.join(", ")}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Channels:</strong> {ind.channels.join(", ")}
                </p>
                <Button
                  size="sm"
                  variant="link"
                  className="p-0 mt-2"
                  onClick={() => navigate("/signup")}
                >
                  Benchmark Your {ind.name} Campaigns →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
