
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function YoyRoasTrendsBenchmarks() {
  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Metrics Benchmarks</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              YoY ROAS Trends <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Year-over-year ROAS trend analysis and seasonal benchmarks.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Year-over-Year ROAS Trends</CardTitle>
              <CardDescription>Detailed benchmarks coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This page will contain comprehensive YoY ROAS trend benchmarks.</p>
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
