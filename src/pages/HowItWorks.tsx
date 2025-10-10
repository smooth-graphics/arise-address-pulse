import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Search, Upload, BarChart3, Settings, History, ArrowRight, CheckCircle, Eye, Download, User, CreditCard, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import signupImage from '@/assets/how-it-works-signup.png';
import dashboardImage from '@/assets/how-it-works-dashboard.png';
import verifyImage from '@/assets/how-it-works-verify.png';
import resultsImage from '@/assets/how-it-works-results.png';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HowItWorks = () => {
  const steps = [
    {
      id: 'signup',
      icon: UserPlus,
      title: 'Sign Up & Get Started',
      description: 'Create your account in under 2 minutes',
      image: signupImage,
      content: {
        description: 'Getting started with Arise is quick and easy. Create your account and start verifying addresses immediately.',
        features: [
          'Free account creation with email',
          'Instant access to dashboard',
          'Free trial credits included',
          'No credit card required to start',
          'Email verification for security',
          'Choose your account type (Individual/Business)'
        ],
        steps: [
          'Click "Start Free Trial" in the top navigation',
          'Fill out the simple registration form',
          'Verify your email address',
          'Complete your profile setup',
          'Start using the platform immediately'
        ]
      }
    },
    {
      id: 'dashboard',
      icon: BarChart3,
      title: 'Navigate Your Dashboard',
      description: 'Master your control center in minutes',
      image: dashboardImage,
      content: {
        description: 'Your dashboard is your command center. Everything you need is organized and easily accessible.',
        features: [
          'Real-time usage statistics',
          'Wallet balance and billing info',
          'Recent verification activity',
          'Quick access to all features',
          'Notification center',
          'Account settings shortcut'
        ],
        navigation: [
          'Dashboard Home - Overview of your account',
          'Search - Single address verification',
          'Bulk Upload - Process multiple addresses',
          'History - View past verifications',
          'Billing - Manage payments and plans',
          'Settings - Account and preferences'
        ]
      }
    },
    {
      id: 'verification',
      icon: Search,
      title: 'Verify Addresses',
      description: 'Multiple ways to verify with ease',
      image: verifyImage,
      content: {
        description: 'Whether you need to verify one address or thousands, Arise makes it simple and intuitive.',
        features: [
          'Single address lookup',
          'Bulk CSV upload processing',
          'Real-time validation results',
          'Detailed verification reports',
          'Export results in multiple formats',
          'Save frequently used addresses'
        ],
        methods: [
          'Single Search: Type or paste address in search bar',
          'Bulk Upload: Upload CSV file with multiple addresses',
          'Copy & Paste: Quick verification from clipboard',
          'Address Builder: Build address step by step',
          'Recent Searches: Re-run previous verifications'
        ]
      }
    },
    {
      id: 'results',
      icon: Eye,
      title: 'View & Export Results',
      description: 'Get your data in the format you need',
      image: resultsImage,
      content: {
        description: 'Access your verification results anytime, export in multiple formats, and track your verification history.',
        features: [
          'Detailed verification status',
          'Confidence scores and ratings',
          'Suggested corrections',
          'Export to CSV, JSON, or PDF',
          'Search and filter results',
          'Bulk actions on results'
        ],
        actions: [
          'View Results: Click on any verification to see details',
          'Export Data: Download results in your preferred format',
          'Filter Results: Find specific verifications quickly',
          'Re-verify: Run verification again on any address',
          'Save Results: Bookmark important verifications'
        ]
      }
    }
  ];

  const faqs = [
    {
      question: 'How do I access my dashboard after signing up?',
      answer: 'After creating your account and verifying your email, simply click "Sign In" and enter your credentials. You\'ll be taken directly to your personalized dashboard.'
    },
    {
      question: 'Where do I find my verification history?',
      answer: 'Click on "History" in the left sidebar of your dashboard. Here you can view all past verifications, search through them, and export results.'
    },
    {
      question: 'How do I upload multiple addresses at once?',
      answer: 'Go to "Bulk Upload" in your dashboard, then either drag and drop your CSV file or click "Choose File". Make sure your CSV has the proper column headers for best results.'
    },
    {
      question: 'Can I try the service before purchasing credits?',
      answer: 'Yes! Every new account comes with free trial credits. You can test all features and see how the platform works before making any payment.'
    },
    {
      question: 'How do I update my account settings?',
      answer: 'Click on "Settings" in the dashboard sidebar. Here you can update your profile, notification preferences, billing information, and security settings.'
    },
    {
      question: 'Where can I see my remaining credits?',
      answer: 'Your current balance is always visible in the top-right corner of your dashboard. Click on it to see detailed usage statistics and purchase more credits.'
    }
  ];

  const quickTips = [
    {
      icon: Search,
      title: 'Quick Search',
      tip: 'Use Ctrl+K (or Cmd+K on Mac) to quickly access the search function from anywhere in the dashboard.'
    },
    {
      icon: Upload,
      title: 'Bulk Processing',
      tip: 'For best results with bulk uploads, ensure your CSV has clear column headers like "Address", "City", "State", "Country".'
    },
    {
      icon: Download,
      title: 'Export Results',
      tip: 'You can export results in multiple formats. CSV is great for spreadsheets, JSON for developers, and PDF for reports.'
    },
    {
      icon: Bell,
      title: 'Stay Updated',
      tip: 'Enable notifications in Settings to get alerts about verification completions, credit low warnings, and important updates.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            How to Use
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-bold-red via-vibrant-orange to-bright-yellow">
              Arise Platform
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Master your address verification workflow with our step-by-step guide to navigating and using the Arise platform effectively.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup">
              <Button className="bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white font-semibold px-8 py-3 text-lg">
                Start 7-days Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:border-bold-red hover:text-bold-red px-8 py-3 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Pro Tips for Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickTips.map((tip, index) => (
              <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-full flex items-center justify-center">
                    <tip.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Step-by-Step Guide</h2>
          
          {/* Step Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {steps.map((step, index) => (
              <div key={step.id} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-bold-red to-vibrant-orange rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Detailed Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">{step.content.description}</p>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Key Features:</h4>
                    <ul className="space-y-2">
                      {step.content.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {step.content.steps && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">How to Get Started:</h4>
                      <ol className="space-y-2">
                        {step.content.steps.map((stepItem, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-bold-red text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {stepIndex + 1}
                            </div>
                            <span className="text-gray-600">{stepItem}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {step.content.navigation && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Dashboard Navigation:</h4>
                      <ul className="space-y-2">
                        {step.content.navigation.map((navItem, navIndex) => (
                          <li key={navIndex} className="flex items-start gap-3">
                            <ArrowRight className="w-4 h-4 text-bold-red flex-shrink-0 mt-1" />
                            <span className="text-gray-600">{navItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.content.methods && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Verification Methods:</h4>
                      <ul className="space-y-2">
                        {step.content.methods.map((method, methodIndex) => (
                          <li key={methodIndex} className="flex items-start gap-3">
                            <ArrowRight className="w-4 h-4 text-bold-red flex-shrink-0 mt-1" />
                            <span className="text-gray-600">{method}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.content.actions && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Available Actions:</h4>
                      <ul className="space-y-2">
                        {step.content.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start gap-3">
                            <ArrowRight className="w-4 h-4 text-bold-red flex-shrink-0 mt-1" />
                            <span className="text-gray-600">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Frequently Asked Questions (FAQs)
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-200 rounded-xl px-6 shadow-sm">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-bold-red py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of users who trust Arise for their address verification needs. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/signup">
              <Button className="bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white font-semibold px-8 py-4 text-lg">
                Start 7-days Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="bg-transparent border-gray-400 text-gray-200 hover:bg-white hover:text-gray-900 px-8 py-4 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;