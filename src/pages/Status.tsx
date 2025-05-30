
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';

export default function Status() {
  const currentStatus = {
    overall: "operational",
    lastUpdated: "2 minutes ago"
  };

  const services = [
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.98%",
      responseTime: "245ms"
    },
    {
      name: "Benchmark Database",
      status: "operational", 
      uptime: "99.99%",
      responseTime: "12ms"
    },
    {
      name: "CompScore Calculator",
      status: "operational",
      uptime: "99.97%",
      responseTime: "89ms"
    },
    {
      name: "OAuth Integration",
      status: "degraded",
      uptime: "99.85%",
      responseTime: "1.2s"
    },
    {
      name: "Data Sync Services",
      status: "operational",
      uptime: "99.96%",
      responseTime: "156ms"
    },
    {
      name: "Web Application",
      status: "operational",
      uptime: "99.99%",
      responseTime: "178ms"
    }
  ];

  const incidents = [
    {
      title: "OAuth Service Degraded Performance",
      status: "investigating",
      time: "15 minutes ago",
      description: "We're investigating slower than usual response times for OAuth authentication."
    },
    {
      title: "Scheduled Maintenance Complete",
      status: "resolved",
      time: "2 hours ago", 
      description: "Database optimization maintenance has been completed successfully."
    },
    {
      title: "API Rate Limiting Issue",
      status: "resolved",
      time: "1 day ago",
      description: "Resolved an issue where some users experienced unexpected rate limiting."
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'investigating':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-100 text-green-800">Operational</Badge>;
      case 'degraded':
        return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>;
      case 'outage':
        return <Badge className="bg-red-100 text-red-800">Outage</Badge>;
      case 'investigating':
        return <Badge className="bg-blue-100 text-blue-800">Investigating</Badge>;
      case 'resolved':
        return <Badge className="bg-gray-100 text-gray-800">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">System Status</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              System <span className="gradient-text">Status</span>
            </h1>
            <p className="text-xl text-navy-600 mb-8">
              Real-time status and performance metrics for all Benchmarketing services.
            </p>
          </div>

          {/* Overall Status */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(currentStatus.overall)}
                  <CardTitle className="text-2xl">All Systems Operational</CardTitle>
                </div>
                {getStatusBadge(currentStatus.overall)}
              </div>
              <CardDescription>
                Last updated {currentStatus.lastUpdated}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Services Status */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Service Status</h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(service.status)}
                        <div>
                          <h3 className="font-semibold text-navy-900">{service.name}</h3>
                          <div className="flex gap-4 text-sm text-navy-600">
                            <span>Uptime: {service.uptime}</span>
                            <span>Response: {service.responseTime}</span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Incidents */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Recent Incidents</h2>
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{incident.title}</CardTitle>
                      {getStatusBadge(incident.status)}
                    </div>
                    <CardDescription>{incident.time}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-navy-600">{incident.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Uptime Stats */}
          <div className="bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">30-Day Uptime</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-success mb-2">99.98%</div>
                <div className="text-navy-700 font-semibold">Overall Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-lilac mb-2">245ms</div>
                <div className="text-navy-700 font-semibold">Avg Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-aqua mb-2">2</div>
                <div className="text-navy-700 font-semibold">Incidents</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
