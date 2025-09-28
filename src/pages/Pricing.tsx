import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Star, Shield, Zap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { pricingPlans, formatPrice, calculateYearlyDiscount } from '@/data/pricingPlans';
import type { BillingPeriod, UserType } from '@/types/billing';

const Pricing = () => {
  const [userType, setUserType] = useState<UserType>('individual');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  const currentPlans = pricingPlans[userType];

  const addons = [
    {
      icon: Shield,
      title: 'Enhanced Security',
      price: '$5/month',
      description: 'Advanced encryption and security features for sensitive data',
    },
    {
      icon: Zap,
      title: 'Priority Processing',
      price: '$8/month',
      description: 'Faster processing times with dedicated server resources',
    },
    {
      icon: Star,
      title: 'Custom Integration',
      price: '$5/month',
      description: 'Tailored API endpoints and custom workflow integrations',
    },
  ];

  const getPrice = (plan: any) => {
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    return formatPrice(price);
  };

  const getPriceLabel = () => {
    return billingPeriod === 'monthly' ? '/month' : '/year';
  };

  const faqs = [
    {
      question: 'What counts as a verification?',
      answer: 'Each address or identity document submitted for verification counts as one verification, regardless of the result.'
    },
    {
      question: 'Do you support Nigerian addresses specifically?',
      answer: 'Yes! We have specialized support for Nigerian postal codes, states, and local government areas with direct integration to Nigerian postal services.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers, debit cards, and mobile money payments including payments in Nigerian Naira.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer individuals a 7-day free trial with 50 free verifications to test our service.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time. Changes take effect at the next billing cycle.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-bold-red/10 to-vibrant-orange/10 rounded-full border border-bold-red/20 mb-6">
            <span className="text-bold-red font-semibold text-sm">Simple, Transparent Pricing</span>
          </div>
         
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your address verification needs. All plans include our core verification features with no hidden fees.
          </p>
          
          {/* User Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <Button
                variant={userType === 'individual' ? 'default' : 'ghost'}
                onClick={() => setUserType('individual')}
                className="px-6 py-2"
              >
                Individual
              </Button>
              <Button
                variant={userType === 'business' ? 'default' : 'ghost'}
                onClick={() => setUserType('business')}
                className="px-6 py-2"
              >
                Business
              </Button>
            </div>
          </div>

          {/* Billing Period Toggle */}
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-lg p-1 flex items-center">
              <Button
                variant={billingPeriod === 'monthly' ? 'default' : 'ghost'}
                onClick={() => setBillingPeriod('monthly')}
                className="px-4 py-2"
              >
                Monthly
              </Button>
              <Button
                variant={billingPeriod === 'yearly' ? 'default' : 'ghost'}
                onClick={() => setBillingPeriod('yearly')}
                className="px-4 py-2 relative"
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  15% off
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {currentPlans.map((plan, index) => (
              <Card 
                key={plan.id} 
                className={`relative hover-lift ${
                  plan.popular ? 'border-2 border-bold-red shadow-xl' : 'border shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-bold-red text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-dark-charcoal mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="text-4xl font-bold text-bold-red mb-2">
                    {getPrice(plan)}
                    <span className="text-lg text-gray-500 font-normal">{getPriceLabel()}</span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <div className="text-sm text-green-600 font-medium">
                      Save {calculateYearlyDiscount(plan.monthlyPrice, plan.yearlyPrice)}% annually
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      {plan.notIncluded.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-500">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="pt-6">
                    <Button 
                      className={`w-full font-semibold ${
                        plan.buttonVariant === 'outline' 
                          ? 'border-bold-red text-bold-red hover:bg-bold-red hover:text-white' 
                          : 'bg-bold-red text-white hover:bg-vibrant-orange'
                      }`}
                      variant={plan.buttonVariant}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="h2-desktop lg:h2-mobile text-dark-charcoal mb-4">
              Optional Add-ons
            </h2>
            <p className="text-lg text-gray-600">
              Enhance your verification capabilities with these premium features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {addons.map((addon, index) => (
              <Card key={index} className="hover-lift text-center p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-bold-red/10 rounded-lg flex items-center justify-center">
                  <addon.icon className="w-6 h-6 text-bold-red" />
                </div>
                <h3 className="text-lg font-semibold text-dark-charcoal mb-2">{addon.title}</h3>
                <div className="text-2xl font-bold text-bold-red mb-2">{addon.price}</div>
                <p className="text-gray-600 text-sm">{addon.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
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
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of businesses that trust Arise for their address verification needs.
          </p>
          <Button className="bg-bold-red text-white font-semibold px-8 py-4 text-lg hover:bg-vibrant-orange">
            Start 7-Days Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
