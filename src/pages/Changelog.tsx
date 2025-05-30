
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Zap, Bug, ArrowUp } from 'lucide-react';

export default function Changelog() {
  const releases = [
    {
      version: "2.4.0",
      date: "2024-03-15",
      type: "major",
      changes: [
        { type: "feature", text: "Introduced CECR Score™ algorithm for comprehensive performance measurement" },
        { type: "feature", text: "Added real-time benchmark comparisons across 15+ industries" },
        { type: "improvement", text: "Enhanced dashboard performance by 40%" },
        { type: "fix", text: "Resolved data sync issues with Google Analytics 4" }
      ]
    },
    {
      version: "2.3.1",
      date: "2024-03-01",
      type: "minor",
      changes: [
        { type: "feature", text: "Added TikTok Ads integration and benchmarks" },
        { type: "improvement", text: "Improved mobile responsiveness across all pages" },
        { type: "fix", text: "Fixed CTR calculation for video campaigns" }
      ]
    },
    {
      version: "2.3.0",
      date: "2024-02-15",
      type: "major",
      changes: [
        { type: "feature", text: "Launched advanced attribution modeling" },
        { type: "feature", text: "Added custom benchmark creation tools" },
        { type: "improvement", text: "Redesigned reports interface for better usability" },
        { type: "fix", text: "Resolved timezone handling in date filters" }
      ]
    }
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Plus className="h-4 w-4 text-green-500" />;
      case 'improvement':
        return <ArrowUp className="h-4 w-4 text-blue-500" />;
      case 'fix':
        return <Bug className="h-4 w-4 text-orange-500" />;
      default:
        return <Zap className="h-4 w-4 text-purple-500" />;
    }
  };

  const getChangeBadge = (type: string) => {
    switch (type) {
      case 'feature':
        return <Badge className="bg-green-500">New</Badge>;
      case 'improvement':
        return <Badge className="bg-blue-500">Improved</Badge>;
      case 'fix':
        return <Badge className="bg-orange-500">Fixed</Badge>;
      default:
        return <Badge className="bg-purple-500">Changed</Badge>;
    }
  };

  const getVersionBadge = (type: string) => {
    switch (type) {
      case 'major':
        return <Badge className="bg-lilac">Major Release</Badge>;
      case 'minor':
        return <Badge variant="outline">Minor Update</Badge>;
      default:
        return <Badge variant="secondary">Patch</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Product Updates</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              <span className="gradient-text">Changelog</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Stay up to date with all the latest features, improvements, and fixes to Benchmarketing.
            </p>
          </div>

          {/* Release Timeline */}
          <div className="space-y-8">
            {releases.map((release, index) => (
              <Card key={index} className="feature-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CardTitle className="text-2xl">v{release.version}</CardTitle>
                      {getVersionBadge(release.type)}
                    </div>
                    <span className="text-navy-600">{release.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {release.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="flex items-start gap-3">
                        {getChangeIcon(change.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getChangeBadge(change.type)}
                          </div>
                          <p className="text-navy-700">{change.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subscribe Section */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8 mt-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Never Miss an Update</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Get notified about new features, improvements, and important announcements.
            </p>
            <Badge variant="outline" className="cursor-pointer hover:bg-navy-100">
              Subscribe to Updates
            </Badge>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
