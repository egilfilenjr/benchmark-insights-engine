
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileCheck, Server, Globe, CheckCircle, Download } from 'lucide-react';

export default function TrustCenter() {
  const certifications = [
    {
      icon: Shield,
      title: "SOC 2 Type II",
      description: "Annual security audits ensuring data protection and system reliability",
      status: "Certified"
    },
    {
      icon: Lock,
      title: "GDPR Compliant",
      description: "Full compliance with European data protection regulations",
      status: "Verified"
    },
    {
      icon: FileCheck,
      title: "ISO 27001",
      description: "International standard for information security management",
      status: "In Progress"
    },
    {
      icon: Server,
      title: "CCPA Compliant",
      description: "California Consumer Privacy Act compliance for data rights",
      status: "Certified"
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using AES-256 encryption"
    },
    {
      icon: Eye,
      title: "Zero-Knowledge Architecture",
      description: "We cannot access your raw marketing data - only aggregated benchmarks"
    },
    {
      icon: Server,
      title: "Enterprise Infrastructure",
      description: "Hosted on AWS with 99.9% uptime SLA and automatic failover"
    },
    {
      icon: Globe,
      title: "Global Data Centers",
      description: "Data processed in your region with cross-border protection"
    }
  ];

  const documents = [
    { name: "Security Whitepaper", size: "2.1 MB", type: "PDF" },
    { name: "Data Processing Agreement", size: "156 KB", type: "PDF" },
    { name: "Privacy Policy", size: "98 KB", type: "PDF" },
    { name: "SOC 2 Report Summary", size: "445 KB", type: "PDF" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Trust & Security</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Your Data is <span className="gradient-text">Safe</span> With Us
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Enterprise-grade security, industry-leading privacy practices, and full compliance 
              with global data protection regulations.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Contact Security Team</Link>
            </Button>
          </div>

          {/* Security Overview */}
          <div className="bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Security at a Glance</h2>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-lilac mb-2">256-bit</div>
                <div className="text-navy-900 font-semibold">AES Encryption</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-aqua mb-2">99.9%</div>
                <div className="text-navy-900 font-semibold">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success mb-2">24/7</div>
                <div className="text-navy-900 font-semibold">Security Monitoring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-navy-900 mb-2">Zero</div>
                <div className="text-navy-900 font-semibold">Data Breaches</div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Compliance & Certifications</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="feature-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <cert.icon className="h-8 w-8 text-lilac" />
                        <CardTitle className="text-xl">{cert.title}</CardTitle>
                      </div>
                      <Badge 
                        variant={cert.status === 'Certified' ? 'default' : cert.status === 'Verified' ? 'secondary' : 'outline'}
                        className={cert.status === 'Certified' ? 'bg-success text-white' : ''}
                      >
                        {cert.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{cert.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Security Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Security Features</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <Card key={index} className="feature-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <feature.icon className="h-8 w-8 text-aqua" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Data Privacy */}
          <div className="bg-navy-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Data Privacy Principles</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-lilac rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Transparency</h3>
                <p className="text-navy-600">Clear communication about what data we collect and how it's used</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-aqua rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Control</h3>
                <p className="text-navy-600">You maintain full control over your data with easy export and deletion</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Purpose</h3>
                <p className="text-navy-600">Data is only used for benchmarking and improving your marketing performance</p>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Security Documentation</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {documents.map((doc, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileCheck className="h-8 w-8 text-lilac" />
                        <div>
                          <h3 className="font-semibold text-navy-900">{doc.name}</h3>
                          <p className="text-navy-600 text-sm">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <Download className="h-5 w-5 text-navy-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Questions About Security?</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Our security team is available to answer any questions about our data protection 
              practices, compliance status, or security architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Contact Security Team</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/demo">Schedule Security Review</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
