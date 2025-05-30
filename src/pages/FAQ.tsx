
import MainLayout from "@/components/layout/MainLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqCategories = {
  "Getting Started": [
    {
      question: "How do I get started with Benchmarketing?",
      answer: "Simply sign up for a free account, connect your first integration (Google Ads, Meta, etc.), and start comparing your performance to industry benchmarks. Our onboarding flow will guide you through the setup process in under 5 minutes."
    },
    {
      question: "What integrations are supported?",
      answer: "We support 15+ major platforms including Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, Pinterest, YouTube, Google Analytics, Shopify, Klaviyo, HubSpot, Salesforce, and more. New integrations are added monthly based on customer feedback."
    },
    {
      question: "How long does it take to see data?",
      answer: "Once you connect an integration, historical data is typically available within 15 minutes. Real-time data syncing begins immediately, with updates every 4-6 hours depending on the platform."
    }
  ],
  "Benchmarks & Data": [
    {
      question: "How are benchmarks calculated?",
      answer: "Our benchmarks are calculated from aggregated, anonymized data across thousands of campaigns. We segment by industry, company size, platform, and other relevant factors to ensure accurate peer comparisons."
    },
    {
      question: "How often are benchmarks updated?",
      answer: "Benchmarks are updated daily with new campaign data. Historical trends are recalculated weekly to account for seasonal patterns and market changes."
    },
    {
      question: "What is the AECR Score?",
      answer: "The AECR Score (Audience, Efficiency, Creative, Reach) is our proprietary algorithm that rates campaign performance on a 0-100 scale across four key dimensions. It helps identify optimization opportunities and benchmark against top performers."
    }
  ],
  "Pricing & Plans": [
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes access to benchmark explorer, basic performance comparisons, and one integration. Perfect for getting started and understanding how your performance compares to industry standards."
    },
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated accordingly."
    },
    {
      question: "Do you offer enterprise pricing?",
      answer: "Yes, we offer custom enterprise plans for large teams and agencies. Enterprise plans include white-labeling, custom integrations, dedicated support, and volume discounts. Contact our sales team for pricing."
    }
  ],
  "Security & Privacy": [
    {
      question: "How is my data protected?",
      answer: "We use enterprise-grade security including SOC 2 Type II compliance, end-to-end encryption, and regular security audits. Your campaign data is never shared or sold to third parties."
    },
    {
      question: "Is Benchmarketing GDPR compliant?",
      answer: "Yes, we are fully GDPR compliant and follow strict data protection standards. We only collect necessary data for benchmarking purposes and provide full data transparency and control."
    },
    {
      question: "Can I delete my data?",
      answer: "Absolutely. You can delete your account and all associated data at any time from your settings page. Data deletion is permanent and typically completed within 30 days."
    }
  ],
  "Technical": [
    {
      question: "What if my integration stops working?",
      answer: "Our system monitors all integrations 24/7 and will alert you if any issues are detected. Most integration issues are resolved automatically, but our support team is available to help with any persistent problems."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, all plans include data export capabilities. You can export benchmark reports, performance data, and custom analyses in CSV, PDF, or API format."
    },
    {
      question: "Do you have an API?",
      answer: "Yes, we offer a comprehensive REST API for Pro+ plans. The API allows you to pull benchmark data, performance metrics, and create custom integrations with your existing tools."
    }
  ]
};

export default function FAQ() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Benchmarketing, from getting started to advanced features
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {Object.entries(faqCategories).map(([category, faqs]) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`${category}-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-2">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you get the most out of Benchmarketing
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/demo">Book a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
