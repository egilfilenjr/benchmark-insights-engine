
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ScienceIndustryInfrastructureBenchmarks() {
  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Industry Benchmarks</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Science, Industry & Infrastructure <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Marketing performance benchmarks for scientific organizations, industrial companies, 
              and infrastructure providers.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Science, Industry & Infrastructure Benchmarks</CardTitle>
              <CardDescription>Detailed benchmarks coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This page will contain comprehensive benchmarks for the science, industry and infrastructure sector.</p>
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
