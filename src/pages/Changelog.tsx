
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Zap, Bug, ArrowUp } from 'lucide-react';

export default function Changelog() {
  const releases = [
    {
      version: "2.4.0",
      date: "December 15, 2024",
      type: "feature",
      changes: [
        {
          type: "new",
          title: "TikTok Ads Integration",
          description: "Connect your TikTok Ads account to benchmark performance against industry standards."
        },
        {
          type: "improvement", 
          title: "Enhanced CompScore Algorithm",
          description: "Updated algorithm provides more accurate scoring with new industry data."
        },
        {
          type: "new",
          title: "Industry-Specific Benchmarks",
          description: "Added 15 new industry categories with detailed sub-vertical breakdowns."
        }
      ]
    },
    {
      version: "2.3.2", 
      date: "December 8, 2024",
      type: "bugfix",
      changes: [
        {
          type: "fix",
          title: "OAuth Integration Issues",
          description: "Resolved authentication timeouts for Google Ads and Meta connections."
        },
        {
          type: "fix",
          title: "Data Sync Accuracy",
          description: "Fixed occasional data mismatches in campaign import process."
        }
      ]
    },
    {
      version: "2.3.0",
      date: "November 28, 2024", 
      type: "feature",
      changes: [
        {
          type: "new",
          title: "Advanced Filtering",
          description: "Filter benchmarks by date range, campaign objective, and audience type."
        },
        {
          type: "new",
          title: "Export Functionality",
          description: "Export benchmark data and reports in CSV, PDF, and Excel formats."
        },
        {
          type: "improvement",
          title: "Performance Optimizations",
          description: "Faster loading times and improved responsiveness across the platform."
        }
      ]
    },
    {
      version: "2.2.1",
      date: "November 15, 2024",
      type: "bugfix", 
      changes: [
        {
          type: "fix",
          title: "Dashboard Loading Issues",
          description: "Resolved slow loading times for users with large datasets."
        },
        {
          type: "improvement",
          title: "Mobile Responsiveness",
          description: "Enhanced mobile experience with better touch interactions."
        }
      ]
    },
    {
      version: "2.2.0",
      date: "November 1, 2024",
      type: "feature",
      changes: [
        {
          type: "new",
          title: "Team Collaboration",
          description: "Share benchmarks and insights with team members and set permissions."
        },
        {
          type: "new",
          title: "Custom Alerts",
          description: "Set up alerts when your metrics fall below or exceed industry benchmarks."
        },
        {
          type: "new",
          title: "API Access",
          description: "Public API launch with endpoints for benchmarks and CompScore calculation."
        }
      ]
    }
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'new':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'improvement':
        return <ArrowUp className="h-4 w-4 text-blue-600" />;
      case 'fix':
        return <Bug className="h-4 w-4 text-orange-600" />;
      default:
        return <Zap className="h-4 w-4 text-purple-600" />;
    }
  };

  const getVersionBadge = (type: string) => {
    switch (type) {
      case 'feature':
        return <Badge className="bg-green-100 text-green-800">Feature Release</Badge>;
      case 'bugfix':
        return <Badge className="bg-orange-100 text-orange-800">Bug Fix</Badge>;
      case 'security':
        return <Badge className="bg-red-100 text-red-800">Security Update</Badge>;
      default:
        return <Badge variant="outline">Update</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Product Updates</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              <span className="gradient-text">Changelog</span>
            </h1>
            <p className="text-xl text-navy-600 mb-8">
              Stay up to date with the latest features, improvements, and bug fixes 
              in Benchmarketing.
            </p>
          </div>

          {/* Releases */}
          <div className="space-y-8">
            {releases.map((release, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-lilac-50 to-aqua-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-navy-900">
                        Version {release.version}
                      </CardTitle>
                      <CardDescription className="text-navy-600 mt-1">
                        Released on {release.date}
                      </CardDescription>
                    </div>
                    {getVersionBadge(release.type)}
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {release.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getChangeIcon(change.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-navy-900 mb-1">
                            {change.title}
                          </h4>
                          <p className="text-navy-600">{change.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8 mt-16 text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-navy-600 mb-6">
              Get notified about new features and updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac"
              />
              <button className="px-6 py-2 bg-lilac text-white rounded-lg hover:bg-lilac/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
