
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Code, Database, Key, Zap, ExternalLink, Copy } from 'lucide-react';

export default function ApiDocs() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/benchmarks",
      description: "Retrieve benchmark data filtered by industry, platform, and metrics",
      params: ["industry", "platform", "metric", "date_range"]
    },
    {
      method: "GET", 
      path: "/api/v1/compscore",
      description: "Calculate CompScore for your campaign data",
      params: ["campaign_data", "industry", "platform"]
    },
    {
      method: "POST",
      path: "/api/v1/campaigns",
      description: "Submit campaign data for benchmarking",
      params: ["campaign_metrics", "metadata"]
    },
    {
      method: "GET",
      path: "/api/v1/industries",
      description: "List all available industry categories",
      params: []
    }
  ];

  const codeExample = `// Initialize the Benchmarketing API client
const client = new BenchmarketingAPI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.benchmarketing.io'
});

// Get benchmark data
const benchmarks = await client.benchmarks.get({
  industry: 'ecommerce',
  platform: 'meta',
  metric: 'roas',
  dateRange: '30d'
});

// Calculate CompScore
const compScore = await client.compScore.calculate({
  campaignData: {
    roas: 3.2,
    ctr: 1.8,
    cpa: 25.50,
    cvr: 2.1
  },
  industry: 'ecommerce',
  platform: 'meta'
});`;

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Developer Resources</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              API <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Integrate Benchmarketing's industry benchmarks and CompScore directly 
              into your applications with our powerful REST API.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Get API Key
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Developer Support</Link>
              </Button>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-navy-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Quick Start</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Key className="h-8 w-8 text-lilac mb-2" />
                  <CardTitle className="text-xl">1. Get API Key</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600">Sign up for a developer account and generate your API key from the dashboard.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Code className="h-8 w-8 text-aqua mb-2" />
                  <CardTitle className="text-xl">2. Make Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600">Use our RESTful endpoints to access benchmark data and calculate CompScores.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-success mb-2" />
                  <CardTitle className="text-xl">3. Build Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600">Integrate benchmarking into your marketing tools and analytics platforms.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Code Example */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-navy-900">Code Example</h2>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* API Endpoints */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8">API Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-navy-900 font-mono">{endpoint.path}</code>
                    </div>
                    <CardDescription>{endpoint.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <span className="font-semibold text-navy-700">Parameters: </span>
                      {endpoint.params.length > 0 ? (
                        <span className="text-navy-600">{endpoint.params.join(', ')}</span>
                      ) : (
                        <span className="text-navy-500">None</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Authentication */}
          <div className="bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Authentication</h2>
            <p className="text-navy-600 mb-4">
              All API requests require authentication using your API key in the Authorization header:
            </p>
            <Card>
              <CardContent className="p-0">
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg">
                  <code>Authorization: Bearer your-api-key-here</code>
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* SDKs and Libraries */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8">SDKs & Libraries</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-6 w-6 text-blue-600" />
                    JavaScript/TypeScript
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600 mb-4">Official SDK for Node.js and browser environments.</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="#" className="flex items-center gap-2">
                      npm install @benchmarketing/sdk
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-6 w-6 text-blue-800" />
                    Python
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600 mb-4">Python SDK for data science and backend integration.</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="#" className="flex items-center gap-2">
                      pip install benchmarketing
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-6 w-6 text-red-600" />
                    Ruby
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600 mb-4">Ruby gem for Rails and backend applications.</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="#" className="flex items-center gap-2">
                      gem install benchmarketing
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="bg-navy-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Rate Limits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-lilac mb-2">1,000</div>
                <div className="text-navy-700 font-semibold">Free Plan</div>
                <div className="text-navy-600 text-sm">requests/month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-aqua mb-2">10,000</div>
                <div className="text-navy-700 font-semibold">Pro Plan</div>
                <div className="text-navy-600 text-sm">requests/month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-2">Custom</div>
                <div className="text-navy-700 font-semibold">Enterprise</div>
                <div className="text-navy-600 text-sm">Contact us</div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Need Help?</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Our developer support team is here to help you integrate and get the most 
              out of the Benchmarketing API.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/demo">Schedule API Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
