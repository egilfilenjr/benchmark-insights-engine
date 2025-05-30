
import MainLayout from "@/components/layout/MainLayout";

export default function Privacy() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <p className="text-muted-foreground mb-6">
                Last updated: January 15, 2024
              </p>
              
              <p>
                At Benchmarketing, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our service.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
              <p>
                We collect information you provide directly to us, such as:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Name, email address, and contact information</li>
                <li>Company information and job title</li>
                <li>Account credentials and preferences</li>
                <li>Payment and billing information</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2 mt-6">Marketing Data</h3>
              <p>
                When you connect your marketing accounts, we collect:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Campaign performance metrics</li>
                <li>Ad spend and conversion data</li>
                <li>Audience and targeting information</li>
                <li>Creative performance data</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2 mt-6">Automatically Collected Information</h3>
              <p>
                We automatically collect certain information when you use our service:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information</li>
                <li>Usage patterns and preferences</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Generate industry benchmarks and insights</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Detect, investigate, and prevent fraudulent activities</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Share Your Information</h2>
              
              <h3 className="text-lg font-semibold mb-2">Benchmark Data</h3>
              <p>
                We aggregate and anonymize your marketing data to create industry benchmarks. This anonymized 
                data cannot be traced back to your specific account or company.
              </p>

              <h3 className="text-lg font-semibold mb-2 mt-6">Service Providers</h3>
              <p>
                We may share your information with third-party service providers who assist us in:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Data processing and analytics</li>
                <li>Payment processing</li>
                <li>Customer support</li>
                <li>Security and fraud prevention</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2 mt-6">Legal Requirements</h3>
              <p>
                We may disclose your information if required by law or in response to valid legal requests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Encryption in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and authentication</li>
                <li>SOC 2 Type II compliance</li>
                <li>Employee security training</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide our services and comply with 
                legal obligations. Specifically:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Account information: Until you delete your account</li>
                <li>Marketing data: Up to 3 years for benchmark accuracy</li>
                <li>Anonymized data: Indefinitely for research purposes</li>
                <li>Payment records: As required by law (typically 7 years)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
              <p>
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Access and download your data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of marketing communications</li>
                <li>Manage cookie preferences</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of 
                residence. We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13. We do not knowingly collect personal 
                information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="mt-3">
                <p>Email: privacy@benchmarketing.com</p>
                <p>Address: 123 Marketing Ave, San Francisco, CA 94105</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
