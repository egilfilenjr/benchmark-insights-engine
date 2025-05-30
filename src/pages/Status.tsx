
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function Status() {
  const services = [
    {
      name: "Core Platform",
      status: "operational",
      uptime: "99.98%",
      description: "Main application and dashboard"
    },
    {
      name: "Data Processing",
      status: "operational", 
      uptime: "99.95%",
      description: "Benchmark calculations and CECR Score™"
    },
    {
      name: "API Services",
      status: "operational",
      uptime: "99.97%",
      description: "REST API and integrations"
    },
    {
      name: "Authentication",
      status: "operational",
      uptime: "99.99%",
      description: "User login and security"
    }
  ];

  const incidents = [
    {
      date: "2024-03-10",
      title: "Brief API Latency",
      status: "resolved",
      description: "Temporary increased response times resolved within 15 minutes"
    },
    {
      date: "2024-02-28", 
      title: "Scheduled Maintenance",
      status: "completed",
      description: "Database optimization completed successfully"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-500">Operational</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-500">Maintenance</Badge>;
      default:
        return <Badge className="bg-red-500">Issues</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-500">All Systems Operational</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              System <span className="gradient-text">Status</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Real-time status of all Benchmarketing services and infrastructure.
            </p>
          </div>

          {/* Overall Status */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 mb-16 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-navy-900 mb-2">All Systems Operational</h2>
            <p className="text-navy-600">All services are running normally with no known issues.</p>
          </div>

          {/* Service Status */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Service Status</h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(service.status)}
                        <div>
                          <h3 className="text-lg font-semibold text-navy-900">{service.name}</h3>
                          <p className="text-navy-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(service.status)}
                        <div className="text-navy-600 text-sm mt-1">{service.uptime} uptime</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Recent Incidents</h2>
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{incident.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{incident.status}</Badge>
                        <span className="text-navy-600 text-sm">{incident.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{incident.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Subscribe to Updates */}
          <div className="text-center bg-navy-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Stay Informed</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Subscribe to status updates and get notified about any service disruptions or maintenance windows.
            </p>
            <Badge variant="outline" className="cursor-pointer hover:bg-navy-100">
              Subscribe to Status Updates
            </Badge>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
