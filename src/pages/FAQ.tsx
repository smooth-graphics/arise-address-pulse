import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import LiveChatPopup from '@/components/chat/LiveChatPopup';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    id: '1',
    question: 'What is the Address Validation Platform?',
    answer: 'Our platform is a comprehensive address verification service that helps individuals, businesses, and organizations validate Nigerian addresses using advanced fuzzy search algorithms and real-time data verification. We provide accurate, secure, and fast address validation with role-based dashboards for different user needs.',
    category: 'Getting Started',
    tags: ['platform', 'overview', 'address validation']
  },
  {
    id: '2',
    question: 'How do I get started with the platform?',
    answer: 'Simply sign up for an account, choose your user type (Individual, Business, Government, or Organization), verify your email through OTP, and start with our free trial. You\'ll get access to 50 free verifications to test our service before committing to a paid plan.',
    category: 'Getting Started',
    tags: ['signup', 'onboarding', 'free trial']
  },
  {
    id: '3',
    question: 'What types of users can use this platform?',
    answer: 'We serve four main user types: Individual users for personal address verification, Business users for commercial verification needs, Government agencies for official verification purposes, and Organizations for institutional verification requirements. Each user type has a customized dashboard and feature set.',
    category: 'Getting Started',
    tags: ['user types', 'individual', 'business', 'government', 'organization']
  },

  // Verification Features
  {
    id: '4',
    question: 'What types of verification does the platform support?',
    answer: 'We support three main types of verification: Address Verification (postal codes, states, local government areas), Security Verification (identity documents, registration certificates), and Utility Verification (utility bill numbers, meter numbers). Each verification type uses specialized algorithms for maximum accuracy.',
    category: 'Verification Features',
    tags: ['address', 'security', 'utility', 'verification types']
  },
  {
    id: '5',
    question: 'How accurate is the address verification?',
    answer: 'Our verification system achieves up to 98% accuracy using advanced fuzzy search algorithms, real-time data integration with Nigerian postal services, and continuous data updates. Each verification result includes a confidence score to help you assess the reliability of the match.',
    category: 'Verification Features',
    tags: ['accuracy', 'confidence score', 'fuzzy search']
  },
  {
    id: '6',
    question: 'Can I verify multiple addresses at once?',
    answer: 'Yes! Business, Government, and Organization users can use our Bulk Upload feature to verify hundreds or thousands of addresses simultaneously. Simply upload a CSV file with your addresses, and our system will process them all and provide detailed results with confidence scores.',
    category: 'Verification Features',
    tags: ['bulk upload', 'csv', 'multiple addresses']
  },
  {
    id: '7',
    question: 'What happens if an address cannot be verified?',
    answer: 'If an address cannot be verified, the result will be marked as "Not Found" with suggestions for similar addresses if available. You can also escalate unclear results to our verification team for manual review through the Escalation Center.',
    category: 'Verification Features',
    tags: ['not found', 'escalation', 'manual review']
  },

  // Dashboard Features
  {
    id: '8',
    question: 'What features are available in the dashboard?',
    answer: 'The dashboard includes: Real-time verification interface, comprehensive history and search, document management, notifications center, API access management, team collaboration tools, billing management, analytics and reporting, verification queue management, and system health monitoring.',
    category: 'Dashboard Features',
    tags: ['dashboard', 'features', 'interface']
  },
  {
    id: '9',
    question: 'How do I access my verification history?',
    answer: 'Navigate to the History section in your dashboard to view all past verifications. You can filter by status (Complete, Partial, Not Found), search by name or reference ID, export results, and view detailed information including confidence scores and verification dates.',
    category: 'Dashboard Features',
    tags: ['history', 'search', 'export', 'filtering']
  },
  {
    id: '10',
    question: 'Can I manage team members and permissions?',
    answer: 'Yes! Organization and Business users can access the Team Management section to invite team members, assign roles and permissions, monitor team activity, and manage user access levels. Different roles have different dashboard features and verification limits.',
    category: 'Dashboard Features',
    tags: ['team management', 'permissions', 'roles', 'collaboration']
  },
  {
    id: '11',
    question: 'What is the Escalation Center?',
    answer: 'The Escalation Center is where you can submit verification requests that need manual review by our expert team. This is useful for complex addresses, disputed results, or cases requiring additional verification steps. Government and Organization users have access to priority escalation.',
    category: 'Dashboard Features',
    tags: ['escalation center', 'manual review', 'expert team']
  },

  // API and Integration
  {
    id: '12',
    question: 'Do you provide API access?',
    answer: 'Yes! Business, Government, and Organization users get API access to integrate address verification directly into their applications. We provide RESTful APIs with comprehensive documentation, code examples, and SDKs for popular programming languages.',
    category: 'API and Integration',
    tags: ['API', 'integration', 'RESTful', 'SDKs']
  },
  {
    id: '13',
    question: 'How do I monitor my API usage?',
    answer: 'The API Monitor section in your dashboard provides real-time analytics including request volume, response times, error rates, usage patterns, and rate limit status. You can also set up alerts for unusual activity or approaching limits.',
    category: 'API and Integration',
    tags: ['API monitor', 'analytics', 'usage', 'alerts']
  },
  {
    id: '14',
    question: 'Are there API rate limits?',
    answer: 'Yes, API rate limits vary by plan: Individual (100 requests/hour), Business (1,000 requests/hour), Professional (5,000 requests/hour), Enterprise (unlimited). You can monitor your current usage in the API Monitor dashboard.',
    category: 'API and Integration',
    tags: ['rate limits', 'API limits', 'monitoring']
  },

  // Pricing and Billing
  {
    id: '15',
    question: 'What are your pricing plans?',
    answer: 'We offer flexible pricing for all user types: Individual plans start at ₦2,500/month, Business plans from ₦15,000/month, and Enterprise plans from ₦50,000/month. All plans include core verification features with varying limits and advanced features. Annual billing offers 15% savings.',
    category: 'Pricing and Billing',
    tags: ['pricing', 'plans', 'monthly', 'annual', 'billing']
  },
  {
    id: '16',
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, debit cards, and mobile money payments including payments in Nigerian Naira. All transactions are secured with bank-level encryption, and you can update your payment method anytime in the billing section.',
    category: 'Pricing and Billing',
    tags: ['payment methods', 'naira', 'bank transfer', 'cards', 'mobile money']
  },
  {
    id: '17',
    question: 'Is there a free trial?',
    answer: 'Yes! All new users get a 7-day free trial with 50 free verifications to test our service. No credit card required for the trial, and you can upgrade to a paid plan anytime. Trial users have access to all basic features.',
    category: 'Pricing and Billing',
    tags: ['free trial', '50 verifications', 'no credit card']
  },
  {
    id: '18',
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately with prorated billing, while downgrades take effect at the next billing cycle. You can manage your subscription in the Billing section of your dashboard.',
    category: 'Pricing and Billing',
    tags: ['upgrade', 'downgrade', 'plan changes', 'billing cycle']
  },
  {
    id: '19',
    question: 'What happens if I exceed my verification limit?',
    answer: 'If you approach your monthly verification limit, you\'ll receive notifications. If you exceed the limit, you can either upgrade your plan or purchase additional verification credits. Your service won\'t be interrupted during the billing cycle.',
    category: 'Pricing and Billing',
    tags: ['verification limits', 'exceed limits', 'additional credits']
  },

  // Security and Privacy
  {
    id: '20',
    question: 'How secure is my data?',
    answer: 'We implement bank-level security with end-to-end encryption, secure data centers, regular security audits, and compliance with data protection regulations. All sensitive information is encrypted both in transit and at rest, and we never share your data with third parties.',
    category: 'Security and Privacy',
    tags: ['security', 'encryption', 'data protection', 'privacy']
  },
  {
    id: '21',
    question: 'Do you comply with data protection regulations?',
    answer: 'Yes, we comply with Nigerian Data Protection Regulation (NDPR) and international standards including GDPR. We provide data processing agreements, allow data export/deletion, and maintain detailed audit logs for compliance purposes.',
    category: 'Security and Privacy',
    tags: ['NDPR', 'GDPR', 'compliance', 'audit logs']
  },
  {
    id: '22',
    question: 'Can I delete my account and data?',
    answer: 'Yes, you can request account deletion anytime through your profile settings or by contacting support. We will permanently delete all your data within 30 days, except for legally required records. You can also export your data before deletion.',
    category: 'Security and Privacy',
    tags: ['account deletion', 'data export', 'GDPR rights']
  },

  // Technical Support
  {
    id: '23',
    question: 'What support options are available?',
    answer: 'We offer multiple support channels: Email support for all users, live chat for Business+ plans, phone support for Enterprise users, comprehensive documentation, video tutorials, and a community forum. Response times vary by plan level.',
    category: 'Technical Support',
    tags: ['support channels', 'email', 'chat', 'phone', 'documentation']
  },
  {
    id: '24',
    question: 'How do I report a bug or request a feature?',
    answer: 'You can report bugs or request features through the Help & Support section in your dashboard, by emailing support@addressvalidation.com, or through our community forum. We prioritize issues based on user impact and plan level.',
    category: 'Technical Support',
    tags: ['bug report', 'feature request', 'support tickets']
  },
  {
    id: '25',
    question: 'Do you provide training or onboarding?',
    answer: 'Yes! We offer comprehensive onboarding for all users including video tutorials, documentation, and webinar training sessions. Enterprise customers receive dedicated onboarding support and custom training sessions for their teams.',
    category: 'Technical Support',
    tags: ['training', 'onboarding', 'tutorials', 'webinars']
  },

  // Platform Specific
  {
    id: '26',
    question: 'What is the difference between user dashboards?',
    answer: 'Each user type has a customized dashboard: Individual (basic verification and history), Business (team management, API access, bulk upload), Government (priority processing, compliance tools, advanced reporting), Organization (full feature access, escalation center, system integration).',
    category: 'Platform Specific',
    tags: ['dashboards', 'user types', 'features', 'customization']
  },
  {
    id: '27',
    question: 'How does the verification queue work?',
    answer: 'The verification queue manages high-volume requests and manual reviews. Automated verifications are processed instantly, while complex cases enter a queue for expert review. Government and Organization users get priority queue processing with faster turnaround times.',
    category: 'Platform Specific',
    tags: ['verification queue', 'manual review', 'priority processing']
  },
  {
    id: '28',
    question: 'Can I integrate with other systems?',
    answer: 'Yes! We provide REST APIs, webhooks, and integration guides for popular platforms. Our system can integrate with CRM systems, e-commerce platforms, government databases, and custom applications. Enterprise customers get dedicated integration support.',
    category: 'Platform Specific',
    tags: ['integrations', 'APIs', 'webhooks', 'CRM', 'e-commerce']
  },
  {
    id: '29',
    question: 'What Nigerian-specific features do you offer?',
    answer: 'We have specialized support for Nigerian addresses including: All 36 states and FCT, 774 local government areas, postal code validation, Nigerian address formats, integration with Nigerian postal services, and local language support for address components.',
    category: 'Platform Specific',
    tags: ['Nigeria', 'states', 'LGA', 'postal codes', 'local support']
  },
  {
    id: '30',
    question: 'How do notifications work?',
    answer: 'The notification system alerts you about: Completed verifications, team activity, API events, billing updates, system maintenance, and security alerts. You can customize notification preferences in your settings and receive alerts via email, SMS, or in-app notifications.',
    category: 'Platform Specific',
    tags: ['notifications', 'alerts', 'email', 'SMS', 'preferences']
  }
];

const categories = Array.from(new Set(faqData.map(faq => faq.category)));

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const allCategories = ['All', ...categories];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background to-muted py-16">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
              Frequently Asked Questions (FAQs)
            </h1>
            <p className="text-lg text-text-secondary mb-8">
              Find answers to common questions about our address validation platform, features, pricing, and more.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base border-neutral-300 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-neutral-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {searchTerm && (
            <div className="text-center mt-4">
              <p className="text-text-secondary">
                Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">No results found</h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your search terms or selecting a different category.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems}>
                {filteredFAQs.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id} 
                    className="border border-neutral-300 rounded-lg mb-4 overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-muted text-left">
                      <div className="flex flex-col items-start gap-2 w-full">
                        <h3 className="text-base font-semibold text-text-primary">
                          {faq.question}
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="text-xs px-4 py-1 bg-gradient-to-r from-bold-red/10 to-vibrant-orange/10 rounded-full border border-bold-red/20 text-white font-semibold">
                            {faq.category}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="prose prose-sm max-w-none">
                        <p className="text-text-secondary leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {faq.tags.map((tag) => (
                            <Badge key={tag} className="text-xs px-4 py-1 bg-gradient-to-r from-bold-red/10 to-vibrant-orange/10 rounded-full border border-bold-red/20 text-bold-red font-semibold">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              Still have questions?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Our support team is here to help you with any questions not covered in our FAQ.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Live Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm mb-4">
                    Get instant help from our support team
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => setIsChatOpen(true)}
                  >
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Email Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm mb-4">
                    Send us your questions anytime
                  </p>
                  <Button variant="outline" className="w-full">
                    Send Email
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Phone Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm mb-4">
                    Speak directly with our experts
                  </p>
                  <Button variant="outline" className="w-full">
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-lg border border-neutral-300">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Additional Resources
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="ghost" className="flex items-center gap-2">
                  Documentation
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  Video Tutorials
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  Community Forum
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  API Documentation
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Popup */}
      <LiveChatPopup 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default FAQ;