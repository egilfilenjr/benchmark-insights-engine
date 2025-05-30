
import MainLayout from "@/components/layout/MainLayout";

export default function Terms() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <p className="text-muted-foreground mb-6">
                Last updated: January 15, 2024
              </p>
              
              <p>
                Welcome to Benchmarketing. These Terms of Service ("Terms") govern your use of our website, 
                applications, and services (collectively, the "Service") operated by Benchmarketing, Inc. ("we," "us," or "our").
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using our Service, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p>
                We grant you a personal, non-transferable, non-exclusive license to use our Service for your 
                business purposes, subject to these Terms. This license includes the right to:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Access and use the Benchmarketing platform</li>
                <li>Connect your marketing accounts and data sources</li>
                <li>View benchmark data and analytics</li>
                <li>Export reports and data as permitted by your plan</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
              <p>
                To use certain features of our Service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Provide accurate, complete, and current information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
              <p>
                For paid plans, you agree to pay all fees and charges incurred in connection with your account. 
                Payment terms include:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Subscription fees are billed in advance</li>
                <li>All fees are non-refundable unless otherwise stated</li>
                <li>We may change our pricing with 30 days notice</li>
                <li>Failure to pay may result in service suspension</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data and Privacy</h2>
              <p>
                Your privacy is important to us. Our collection and use of personal information is governed by 
                our Privacy Policy. By using our Service, you consent to:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>Our collection and use of your data as described in our Privacy Policy</li>
                <li>The aggregation and anonymization of your data for benchmark purposes</li>
                <li>Our security measures to protect your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
              <p>
                You may not use our Service:
              </p>
              <ul className="list-disc ml-6 mt-3 space-y-1">
                <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations or laws</li>
                <li>To transmit or procure the sending of any advertising or promotional material</li>
                <li>To impersonate or attempt to impersonate another user or entity</li>
                <li>To interfere with or circumvent the security features of the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the 
                exclusive property of Benchmarketing, Inc. and its licensors. The Service is protected by 
                copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without 
                prior notice or liability, under our sole discretion, for any reason whatsoever including 
                breach of the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p>
                In no event shall Benchmarketing, Inc., nor its directors, employees, partners, agents, 
                suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, 
                or punitive damages arising out of your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-3">
                <p>Email: legal@benchmarketing.com</p>
                <p>Address: 123 Marketing Ave, San Francisco, CA 94105</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
