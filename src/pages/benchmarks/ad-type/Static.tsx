
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function StaticBenchmarks() {
  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Ad Type Benchmarks</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Static Ads <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Performance benchmarks for static image advertising across all platforms.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Static Image Advertising Benchmarks</CardTitle>
              <CardDescription>Detailed benchmarks coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This page will contain comprehensive static ad benchmarks.</p>
              <div className="mt-6">
                <Button asChild>
                  <Link to="/signup">Get Early Access</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
