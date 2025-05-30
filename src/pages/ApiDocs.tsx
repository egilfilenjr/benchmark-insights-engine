
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Code, Database, Key, Zap } from 'lucide-react';

export default function ApiDocs() {
  const endpoints = [
    {
      method: "GET",
      endpoint: "/api/benchmarks",
      description: "Retrieve industry benchmarks by platform and metric"
    },
    {
      method: "POST",
      endpoint: "/api/cecr-score",
      description: "Calculate CECR Score™ for your campaign data"
    },
    {
      method: "GET",
      endpoint: "/api/industries",
      description: "List all available industries and their metrics"
    },
    {
      method: "POST",
      endpoint: "/api/compare",
      description: "Compare your metrics against industry benchmarks"
    }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Developer Resources</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Benchmarketing <span className="gradient-text">API</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Integrate industry benchmarks and CECR Score™ calculations directly into your applications.
            </p>
            <Button size="lg">Get API Key</Button>
          </div>

          {/* API Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <Code className="h-12 w-12 text-lilac mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-navy-900 mb-2">RESTful API</h3>
                <p className="text-navy-600 text-sm">Simple HTTP requests with JSON responses</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Database className="h-12 w-12 text-aqua mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-navy-900 mb-2">50K+ Data Points</h3>
                <p className="text-navy-600 text-sm">Access our comprehensive benchmark database</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Key className="h-12 w-12 text-lilac mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Secure Access</h3>
                <p className="text-navy-600 text-sm">API key authentication with rate limiting</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-aqua mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Real-time</h3>
                <p className="text-navy-600 text-sm">Live benchmark data updated continuously</p>
              </CardContent>
            </Card>
          </div>

          {/* Endpoints */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">API Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-navy-900 font-mono">{endpoint.endpoint}</code>
                      </div>
                      <p className="text-navy-600">{endpoint.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Getting Started */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Ready to Get Started?</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Access our API documentation and start integrating benchmark data into your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Get API Key</Button>
              <Button size="lg" variant="outline">View Documentation</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
