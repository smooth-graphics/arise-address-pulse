
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Star } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [monthlyShipments, setMonthlyShipments] = useState('10000');
  const [errorRate, setErrorRate] = useState('5');
  const [monthlySavings, setMonthlySavings] = useState(2500);

  React.useEffect(() => {
    const shipments = parseInt(monthlyShipments) || 0;
    const rate = parseFloat(errorRate) || 0;
    const savings = shipments * (rate / 100) * 5;
    setMonthlySavings(Math.round(savings));
  }, [monthlyShipments, errorRate]);

  const pricingTiers = [
    {
      name: 'Starter',
      price: isAnnual ? 182 : 19,
      period: isAnnual ? 'year' : 'month',
      originalPrice: isAnnual ? 228 : null,
      verifications: '10,000',
      features: [
        'Email support',
        'Basic Dashboard',
        'REST API access',
        'Standard geocoding',
        'CSV export',
        '99% uptime SLA'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'btn-primary',
      popular: false
    },
    {
      name: 'Business',
      price: isAnnual ? 470 : 49,
      period: isAnnual ? 'year' : 'month',
      originalPrice: isAnnual ? 588 : null,
      verifications: '50,000',
      features: [
        'Priority email support',
        'Advanced Analytics',
        'Webhooks',
        'CSV Export',
        'Bulk upload portal',
        'Address autocomplete',
        'Confidence scoring',
        '99.9% uptime SLA'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'btn-primary bg-vibrant-orange hover:bg-bold-red',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      verifications: 'Unlimited',
      features: [
        'Dedicated support',
        'Custom SLA',
        'On-boarding assistance',
        'Custom integrations',
        'White-label options',
        'Advanced security',
        'Priority feature requests',
        'Custom reporting'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'btn-secondary',
      popular: false
    }
  ];

  const addOns = [
    {
      title: 'Enterprise Support Package',
      price: '$500/mo',
      description: 'Need extra security or SLA? Add our Enterprise Support Package for dedicated account management and 24/7 phone support.',
      borderColor: 'border-vibrant-orange'
    },
    {
      title: 'Custom Volume Bundles',
      price: 'Contact Sales',
      description: 'Need more units? Contact Sales for custom bundles with volume discounts and flexible payment terms.',
      borderColor: 'border-bright-yellow'
    }
  ];

  const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'PayPal'];

  const billingFaqs = [
    {
      question: 'What are your billing cycles?',
      answer: 'We offer both monthly and annual billing. Annual plans include a 20% discount and are billed upfront.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. Enterprise customers have custom refund terms.'
    },
    {
      question: 'Can I change my plan anytime?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.'
    },
    {
      question: 'Do you provide invoices?',
      answer: 'Yes, we provide detailed invoices for all transactions. Enterprise customers can set up purchase orders and custom billing.'
    },
    {
      question: 'What happens if I exceed my limit?',
      answer: 'We\'ll notify you before you reach 80% of your limit. You can upgrade your plan or purchase additional verifications as needed.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="h1-desktop lg:h1-mobile text-dark-charcoal mb-6">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simple, transparent pricing that scales as you grow. Start free and upgrade when you're ready.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Monthly/Annual Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`font-medium ${!isAnnual ? 'text-bold-red' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? 'bg-bold-red' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                isAnnual ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-bold-red' : 'text-gray-500'}`}>
              Annual <span className="text-sm text-bright-yellow">(20% off)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative border-2 ${
                tier.popular 
                  ? 'border-vibrant-orange shadow-xl scale-105 md:scale-110' 
                  : 'border-gray-200'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-bright-yellow text-dark-charcoal px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8 space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-dark-charcoal mb-2">{tier.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-dark-charcoal">
                          {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                        </span>
                        {tier.period && <span className="text-gray-500">/{tier.period}</span>}
                      </div>
                      {tier.originalPrice && (
                        <div className="text-sm text-gray-500">
                          <span className="line-through">${tier.originalPrice}</span>
                          <span className="ml-2 text-bright-yellow font-semibold">Save 20%</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-600">{tier.verifications} verifications</p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-bold-red flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className={`${tier.buttonStyle} w-full`}>
                    {tier.buttonText}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    No hidden fees. Upgrade or downgrade anytime.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons & Customization */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="h2-desktop lg:h2-mobile text-dark-charcoal mb-6">
              Additional Options
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <Card key={index} className={`border-2 ${addon.borderColor} bg-white shadow-lg`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-dark-charcoal">{addon.title}</h3>
                    <span className="text-bold-red font-bold">{addon.price}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{addon.description}</p>
                  <Button className="btn-secondary w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-dark-charcoal mb-2">
                    ROI Calculator
                  </h2>
                  <p className="text-gray-600">
                    See how much you could save with accurate address data
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="shipments">Monthly Shipments</Label>
                    <Input
                      id="shipments"
                      type="number"
                      value={monthlyShipments}
                      onChange={(e) => setMonthlyShipments(e.target.value)}
                      placeholder="10000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="errorRate">Current Error Rate (%)</Label>
                    <Input
                      id="errorRate"
                      type="number"
                      value={errorRate}
                      onChange={(e) => setErrorRate(e.target.value)}
                      placeholder="5"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="text-center p-6 bg-bold-red rounded-lg text-white">
                  <div className="text-sm opacity-90 mb-2">Estimated Monthly Savings</div>
                  <div className="text-4xl font-bold animate-pulse">
                    ${monthlySavings.toLocaleString()}
                  </div>
                  <div className="text-sm opacity-90 mt-2">
                    Based on $5 average cost per return shipment
                  </div>
                </div>

                <div className="text-center">
                  <Button className="btn-primary">
                    Start Saving Today
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Methods & Billing FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Payment Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-dark-charcoal">Payment Methods</h3>
              
              <div className="flex flex-wrap gap-4">
                {paymentMethods.map((method, index) => (
                  <div 
                    key={index}
                    className="bg-gray-100 px-4 py-2 rounded-lg font-medium text-dark-charcoal grayscale hover:grayscale-0 hover:bg-bold-red hover:text-white transition-all cursor-pointer"
                  >
                    {method}
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-dark-charcoal mb-2">Enterprise Billing</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Enterprise customers can set up purchase orders, custom billing cycles, 
                  and multi-year contracts with additional discounts.
                </p>
              </div>
            </div>

            {/* Billing FAQs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-dark-charcoal">Billing FAQs</h3>
              
              <Accordion type="single" collapsible className="space-y-4">
                {billingFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-4">
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
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-dark-charcoal text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="h2-desktop lg:h2-mobile font-bold">
            Still Unsure? Talk to Sales
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our team can help you choose the right plan and answer any questions about enterprise features.
          </p>
          <Button className="btn-secondary border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-dark-charcoal text-lg px-8 py-4">
            Contact Sales Team
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
