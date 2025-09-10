
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, X, ArrowRight, MapPin, Shield, Zap } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$5",
      period: "/month",
      description: "Perfect for small businesses just getting started with address verification",
      features: [
        "50 address verifications/month",
        "25 identity verifications/month", 
        "Nigerian postal code validation",
        "Basic API access",
        "Standard response time"
      ],
      notIncluded: [
        "Bulk processing",
        "Premium support",
        "Custom integrations"
      ],
      color: "border-gray-200",
      buttonStyle: "border-2 border-bold-red text-bold-red hover:bg-bold-red hover:text-white",
      popular: false
    },
    {
      name: "Professional",
      price: "$15",
      period: "/month",
      description: "Ideal for growing businesses with moderate verification needs",
      features: [
        "500 address verifications/month",
        "125 identity verifications/month",
        "Global address validation (240+ countries)",
        "Document verification",
        "Bulk CSV processing",
        "Priority API access",
        "Phone & email support",
        "Webhooks & real-time notifications",
        "99.9% SLA guarantee"
      ],
      notIncluded: [
        "Custom integrations",
        "Dedicated account manager"
      ],
      color: "border-bold-red ring-2 ring-bold-red",
      buttonStyle: "bg-gradient-to-r from-bold-red to-vibrant-orange text-white",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$25",
      period: "",
      description: "For large organizations with high-volume verification requirements",
      features: [
        "1500 address verifications/month",
        "500 identity verifications/month",
        "Custom verification rules",
        "Advanced fraud detection",
        "White-label solutions",
        "Custom API endpoints",
        "Dedicated account manager",
        "24/7 premium support",
        "Custom SLA agreements",
        "On-premise deployment options",
        "Advanced analytics & reporting"
      ],
      notIncluded: [],
      color: "border-gray-200",
      buttonStyle: "border-2 border-bold-red text-bold-red hover:bg-bold-red hover:text-white",
      popular: false
    }
  ];

  const addons = [
    {
      icon: MapPin,
      title: "Enhanced Address Matching",
      price: "$2,000/month",
      description: "Advanced fuzzy matching for incomplete or misspelled addresses"
    },
    {
      icon: Shield,
      title: "Advanced Identity Checks",
      price: "$5,000/month", 
      description: "Biometric verification and enhanced document authentication"
    },
    {
      icon: Zap,
      title: "Real-time Webhooks",
      price: "$1,500/month",
      description: "Instant notifications for verification results and status updates"
    }
  ];

  const faqs = [
    {
      question: "What counts as a verification?",
      answer: "Each address or identity document submitted for verification counts as one verification, regardless of the result."
    },
    {
      question: "Do you support Nigerian addresses specifically?",
      answer: "Yes! We have specialized support for Nigerian postal codes, states, and local government areas with direct integration to Nigerian postal services."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers, debit cards, and mobile money payments including payments in Nigerian Naira."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial with 100 free verifications to test our service."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time. Changes take effect at the next billing cycle."
    }
  ];

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 lg:px-12">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-bold-red/10 to-vibrant-orange/10 rounded-full border border-bold-red/20 mb-6">
            <span className="text-bold-red font-semibold text-sm">✨ Transparent, affordable pricing</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Simple Pricing for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-bold-red via-vibrant-orange to-bright-yellow">
              Address & Identity Verification
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Choose the perfect plan for your verification needs. All plans include Nigerian postal code validation and global coverage.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.color} shadow-lg hover:shadow-xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-bold-red to-vibrant-orange text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>

                  <Button className={`w-full mb-6 py-3 rounded-xl font-semibold transition-all duration-300 ${plan.buttonStyle}`}>
                    {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-start opacity-50">
                        <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-500 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Optional Add-ons
            </h2>
            <p className="text-lg text-gray-600">
              Enhance your verification capabilities with these premium features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {addons.map((addon, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-lg flex items-center justify-center">
                    <addon.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{addon.title}</h3>
                  <div className="text-2xl font-bold text-bold-red mb-2">{addon.price}</div>
                  <p className="text-gray-600 text-sm">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-bold-red via-vibrant-orange to-bright-yellow">
        <div className="container mx-auto text-center max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start your free trial today and see how easy address and identity verification can be
          </p>
          
          <Button className="bg-white text-bold-red hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg">
            Start 14-Day Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
