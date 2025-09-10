
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, MapPin, CheckCircle, FileText, Code, Shield, BarChart3 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HowItWorks = () => {
  const steps = [
    {
      id: 'data-ingestion',
      icon: Database,
      title: 'Data Ingestion',
      description: 'Multiple ways to submit address data',
      content: {
        description: 'Arise accepts address data through multiple channels, making integration seamless regardless of your tech stack.',
        features: [
          'RESTful API endpoints',
          'JavaScript SDK for web apps',
          'Python SDK for backend services',
          'PHP SDK for WordPress/Laravel',
          'CSV bulk upload portal',
          'Real-time webhooks'
        ],
        codeExample: `// JavaScript SDK Example
import { AriseAPI } from '@arise/js-sdk';

const arise = new AriseAPI({
  apiKey: 'your-api-key-here'
});

const result = await arise.validate({
  address: '123 Main Street',
  city: 'Lagos',
  country: 'Nigeria'
});`
      }
    },
    
    {
      id: 'standardization',
      icon: CheckCircle,
      title: 'Standardization & Formatting',
      description: 'Transform addresses to official formats',
      content: {
        description: 'Convert messy address data into clean, standardized formats.',
        features: [
          'Proper case conversion',
          'Abbreviation standardization',
          'Diacritic character handling',
          'Address component ordering',
          'Postal format compliance',
          'Country-specific formatting'
        ],
        example: {
          before: '123 main st lagos',
          after: '123 Main St, Lagos 100001, Nigeria'
        }
      }
    },
    {
      id: 'delivery',
      icon: FileText,
      title: 'Delivery & Reporting',
      description: 'Get results in your preferred format',
      content: {
        description: 'Receive clean address data through various delivery methods with comprehensive reporting.',
        features: [
          'JSON API responses',
          'CSV export functionality',
          'Real-time webhooks',
          'Batch processing results',
          'Analytics dashboard',
          'Error reporting & insights'
        ]
      }
    }
  ];

  const faqs = [
    {
      question: 'What is the maximum payload per request?',
      answer: 'Our API supports up to 1,000 addresses per request for batch processing. For larger volumes, use our bulk upload portal which can handle millions of records.'
    },
    {
      question: 'Which countries do you support?',
      answer: 'Arise supports address validation for 240+ countries and territories. We maintain partnerships with postal authorities worldwide to ensure data accuracy.'
    },
    {
      question: 'How do I handle failed verifications?',
      answer: 'Failed verifications return detailed error codes and suggested corrections. Our API provides confidence scores and fallback options for ambiguous addresses.'
    },
    {
      question: 'What\'s your average response time?',
      answer: 'Our global infrastructure delivers sub-second response times, with 95% of requests processed in under 200ms.'
    },
    {
      question: 'Do you store the addresses I verify?',
      answer: 'No, we don\'t store your address data. All verification requests are processed in real-time and immediately discarded for privacy and security.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="h1-desktop lg:h1-mobile text-dark-charcoal mb-6">
            How Arise Verifies & Validates Addresses
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Step-by-Step Process for Pixel-Perfect Accuracy
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <Card key={step.id} className="hover-lift border-0 shadow-lg">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-bold-red/10 rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-bold-red" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-charcoal">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Step Breakdown */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bold-red rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <h2 className="text-2xl font-bold text-dark-charcoal">{step.title}</h2>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">{step.content.description}</p>
                  
                  <ul className="space-y-2">
                    {step.content.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-bold-red flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {step.content.example && (
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-sm font-medium text-gray-500 mb-2">Before:</div>
                      <div className="text-gray-800 mb-3 font-mono">{step.content.example.before}</div>
                      <div className="text-sm font-medium text-gray-500 mb-2">After:</div>
                      <div className="text-dark-charcoal font-mono font-semibold">{step.content.example.after}</div>
                    </div>
                  )}
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {step.content.codeExample ? (
                    <div className="bg-gray-900 rounded-lg p-6 text-gray-100 font-mono text-sm overflow-x-auto">
                      <pre>{step.content.codeExample}</pre>
                    </div>
                  ) : (
                    <Card className="bg-white border-0 shadow-lg">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
                          <step.icon className="w-16 h-16 text-gray-400" />
                        </div>
                        {step.content.details && (
                          <p className="mt-4 text-sm text-gray-600 text-center">
                            {step.content.details}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="h2-desktop lg:h2-mobile text-dark-charcoal text-center mb-12">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-dark-charcoal hover:text-bold-red">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-dark-charcoal text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="h2-desktop lg:h2-mobile font-bold">
            Start Verifying Addresses Today
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of businesses that trust Arise for their address verification needs.
          </p>
          <Button className="bg-bold-red text-white font-semibold px-8 py-4 text-lg hover:bg-vibrant-orange">
            Sign Up Free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
