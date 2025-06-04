
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Building, ArrowRight, Star } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      description: "Perfect for individuals getting started",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        "Basic portfolio tracking",
        "3 bank account connections",
        "Mobile app access",
        "Email support",
        "Basic security features",
        "Monthly reports"
      ],
      buttonText: "Get Started Free",
      buttonStyle: "outline"
    },
    {
      name: "Professional",
      icon: Crown,
      description: "Advanced features for serious traders",
      monthlyPrice: 29,
      annualPrice: 290,
      popular: true,
      features: [
        "Advanced AI trading signals",
        "Unlimited account connections",
        "Real-time market data",
        "Priority support",
        "Advanced security & 2FA",
        "Custom alerts & notifications",
        "Tax optimization tools",
        "API access"
      ],
      buttonText: "Start 14-Day Trial",
      buttonStyle: "primary"
    },
    {
      name: "Enterprise",
      icon: Building,
      description: "Comprehensive solution for institutions",
      monthlyPrice: 99,
      annualPrice: 990,
      popular: false,
      features: [
        "Everything in Professional",
        "White-label solutions",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "Advanced compliance tools",
        "Multi-user management",
        "Custom reporting"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "outline"
    }
  ];

  const addOns = [
    {
      name: "Premium Data Feeds",
      price: 49,
      description: "Real-time Level 2 market data from all major exchanges"
    },
    {
      name: "Advanced Analytics",
      price: 29,
      description: "Detailed portfolio analysis and performance attribution"
    },
    {
      name: "Tax Pro",
      price: 19,
      description: "Automated tax harvesting and professional tax reports"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-dark-charcoal to-gray-800 text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-bold-red/20 to-vibrant-orange/20 rounded-full border border-bold-red/30 mb-6">
            <span className="text-bright-yellow font-medium">💰 Simple Pricing</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-bright-yellow to-vibrant-orange bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Transparent pricing that scales with your financial journey. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-16">
            <span className={`mr-3 font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 bg-gray-600 rounded-full transition-colors duration-300 focus:outline-none"
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-full transition-transform duration-300 ${isAnnual ? 'translate-x-8' : ''}`}></div>
            </button>
            <span className={`ml-3 font-medium ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="ml-3 px-3 py-1 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-full text-xs font-bold">
                Save 17%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border transition-all duration-500 hover:scale-105 ${
                plan.popular ? 'border-vibrant-orange/50 shadow-2xl shadow-vibrant-orange/20' : 'border-white/20 hover:border-bright-yellow/50'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-bold-red to-vibrant-orange px-6 py-2 rounded-full text-white font-bold text-sm flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.popular ? 'from-bold-red to-vibrant-orange' : 'from-vibrant-orange to-bright-yellow'} flex items-center justify-center mb-4 mx-auto`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-300 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-5xl font-bold mb-1">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        <span className="text-lg font-normal text-gray-400">
                          {plan.monthlyPrice === 0 ? '' : isAnnual ? '/year' : '/month'}
                        </span>
                      </div>
                      {isAnnual && plan.monthlyPrice > 0 && (
                        <div className="text-gray-400 text-sm">
                          ${Math.round(plan.annualPrice / 12)}/month billed annually
                        </div>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className={`w-full py-4 font-bold rounded-xl transition-all duration-300 ${
                    plan.buttonStyle === 'primary' 
                      ? 'bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white shadow-lg hover:shadow-2xl transform hover:scale-105' 
                      : 'border-2 border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-dark-charcoal'
                  }`}>
                    {plan.buttonText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-dark-charcoal/50 to-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Premium Add-ons
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enhance your experience with professional-grade tools and data
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-xl border border-white/20 hover:border-vibrant-orange/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{addon.name}</h3>
                  <div className="text-2xl font-bold text-vibrant-orange mb-3">
                    ${addon.price}/month
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{addon.description}</p>
                  <Button variant="outline" className="w-full border border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-dark-charcoal transition-all duration-300">
                    Add to Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and you'll be prorated accordingly."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! Professional and Enterprise plans come with a 14-day free trial. No credit card required to start."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers."
              },
              {
                question: "Is my financial data secure?",
                answer: "Absolutely. We use bank-level 256-bit encryption and never store your banking credentials. We're SOC 2 Type II certified."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-xl border border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-bright-yellow via-vibrant-orange to-bold-red bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Arise FinTech for their financial future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-bright-yellow/25 transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-2 border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-dark-charcoal px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
