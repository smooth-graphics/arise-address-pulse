
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Play, ArrowRight, MapPin, Shield, Upload, Zap, Globe, BarChart3, Star, Users, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [demoInput, setDemoInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  const handleVerifyDemo = async () => {
    if (!demoInput.trim()) return;
    
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsVerifying(false);
    setIsVerified(true);
    
    setTimeout(() => {
      setIsVerified(false);
      setDemoInput('');
    }, 3000);
  };

  const features = [
    {
      icon: Zap,
      title: 'Real-Time API Lookup',
      description: 'Instantly verify addresses as users type with sub-second response times.',
      color: 'text-bold-red'
    },
    {
      icon: Upload,
      title: 'Bulk CSV Validation',
      description: 'Upload hundreds of thousands of addresses in one go and get detailed reports.',
      color: 'text-vibrant-orange'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Support for 240+ countries and territories with local postal standards.',
      color: 'text-bright-yellow'
    },
    {
      icon: MapPin,
      title: 'Autocomplete',
      description: 'Smart dropdown suggestions speed up form-fills and reduce errors.',
      color: 'text-bold-red'
    },
    {
      icon: Shield,
      title: 'Fuzzy Matching',
      description: 'Catch typos, misspellings, and abbreviations with intelligent algorithms.',
      color: 'text-vibrant-orange'
    },
    {
      icon: BarChart3,
      title: 'Dashboard & Analytics',
      description: 'Track verification stats, accuracy rates, and usage patterns in real-time.',
      color: 'text-bright-yellow'
    }
  ];

  const integrations = [
    'Shopify', 'Salesforce', 'Magento', 'WooCommerce', 'Zapier'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO, ShipFast',
      avatar: '/placeholder.svg',
      quote: 'Arise reduced our delivery failures by 85%. The API integration was seamless and the accuracy is incredible.'
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director, GlobalMart',
      avatar: '/placeholder.svg',
      quote: 'We process millions of addresses monthly. Arise handles our volume effortlessly while maintaining 99.9% accuracy.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, LocalDelivery',
      avatar: '/placeholder.svg',
      quote: 'The autocomplete feature improved our checkout conversion by 40%. Our customers love the smooth experience.'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: isAnnual ? 182 : 19,
      period: isAnnual ? 'year' : 'month',
      verifications: '10,000',
      features: ['Email support', 'Basic Dashboard', 'REST API'],
      buttonText: 'Get Started',
      buttonStyle: 'btn-primary'
    },
    {
      name: 'Business',
      price: isAnnual ? 470 : 49,
      period: isAnnual ? 'year' : 'month',
      verifications: '50,000',
      features: ['Priority email support', 'Advanced Analytics', 'Webhooks', 'CSV Export'],
      buttonText: 'Start Free Trial',
      buttonStyle: 'btn-primary bg-vibrant-orange hover:bg-bold-red',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      verifications: 'Unlimited',
      features: ['Dedicated support', 'SLA', 'On-boarding', 'Custom integrations'],
      buttonText: 'Contact Sales',
      buttonStyle: 'btn-secondary'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-dark-charcoal text-white relative overflow-hidden">
        {/* Animated Background Network */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 600">
            <defs>
              <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="#444444" className="network-animation" />
                <line x1="50" y1="50" x2="100" y2="50" stroke="#444444" strokeWidth="1" opacity="0.6" />
                <line x1="50" y1="50" x2="50" y2="100" stroke="#444444" strokeWidth="1" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="h1-desktop lg:h1-mobile font-bold text-white leading-tight">
                <span className="inline-block overflow-hidden">
                  <span className="block animate-typewriter">
                    Arise: Instant Address Verification & Validation
                  </span>
                </span>
              </h1>
              
              <h2 className="text-xl lg:text-base text-gray-300 leading-relaxed">
                Clean, accurate address data at lightning speed. Say goodbye to bad mail and delivery errors.
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-primary text-lg px-8 py-4">
                  Get Started Free
                </Button>
                <Button className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 relative">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <MapPin className="w-16 h-16 text-bright-yellow mx-auto animate-pin-drop" />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-8">
                      <svg className="w-full h-full" viewBox="0 0 100 20">
                        <path 
                          d="M10,10 Q30,5 50,10 T90,10" 
                          stroke="#ffd200" 
                          strokeWidth="2" 
                          fill="none"
                          strokeDasharray="5,5"
                          className="animate-pulse"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">Lightning Fast Verification</h3>
                  <p className="text-gray-300">Watch addresses transform in real-time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Demo Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h3 className="section-title">See How It Works in 10 Seconds</h3>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex gap-4">
                <Input
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  placeholder="Enter an address to verify..."
                  className="flex-1 text-base p-3 border-gray-300 rounded-lg"
                  disabled={isVerifying}
                />
                <Button 
                  onClick={handleVerifyDemo}
                  disabled={isVerifying || !demoInput.trim()}
                  className="btn-primary px-8"
                >
                  {isVerifying ? (
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    'Verify'
                  )}
                </Button>
              </div>

              {isVerified && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in-up">
                  <div className="flex items-center gap-2 text-green-700">
                    <Check className="w-5 h-5 text-bright-yellow" />
                    <span className="font-semibold">Valid Address: 123 Main St, Lagos, Nigeria</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-bold-red mt-1 flex-shrink-0" />
                <span className="text-sm">Auto-correct typos</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-bold-red mt-1 flex-shrink-0" />
                <span className="text-sm">Standardize formatting</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-bold-red mt-1 flex-shrink-0" />
                <span className="text-sm">Integrate anywhere (CRM, e-commerce, ERP)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Overview */}
      <section className="py-16 bg-gradient-to-r from-white via-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="h2-desktop lg:h2-mobile text-dark-charcoal mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Three simple steps to perfect address data</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Capture',
                icon: Upload,
                description: 'Simply enter or paste address information into your form—Arise grabs it instantly.',
                color: 'text-bold-red'
              },
              {
                step: '2',
                title: 'Validate & Standardize',
                icon: Shield,
                description: 'Our engine cross-checks against global postal databases, auto-corrects misspellings, and standardizes to official format.',
                color: 'text-vibrant-orange'
              },
              {
                step: '3',
                title: 'Deliver Results',
                icon: ArrowRight,
                description: 'Receive clean, formatted addresses via API response or CSV export—ready for shipment or CRM.',
                color: 'text-bright-yellow'
              }
            ].map((step, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <div className="w-8 h-8 mx-auto bg-dark-charcoal text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-dark-charcoal">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="h2-desktop lg:h2-mobile text-dark-charcoal mb-4">
              Powerful Features to Keep Your Data Clean
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg group">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 ${feature.color} icon-glow group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-charcoal">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold text-dark-charcoal mb-8">Seamless Integrations</h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="bg-white px-6 py-3 rounded-lg shadow-sm grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              >
                <span className="font-medium text-dark-charcoal">{integration}</span>
              </div>
            ))}
          </div>

          <p className="text-dark-charcoal">
            Don't see your platform? Our RESTful API works with any system.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-dark-charcoal text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 border-0 backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bright-yellow rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-dark-charcoal" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bright-yellow">{testimonial.name}</h4>
                      <p className="text-sm text-gray-300">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-white italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex text-bright-yellow">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Snapshot */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: 'radial-gradient(circle, #eeeeee 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="h2-desktop lg:h2-mobile text-dark-charcoal mb-4">
              Simple, Transparent Pricing
            </h2>

            {/* Monthly/Annual Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
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
              <span className={`font-medium ${isAnnual ? 'text-bold-red' : 'text-gray-500'}`}>Annual</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative border-2 ${tier.popular ? 'border-vibrant-orange shadow-xl scale-105' : 'border-gray-200'}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-bright-yellow text-dark-charcoal px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8 text-center space-y-6">
                  <h3 className="text-xl font-bold text-dark-charcoal">{tier.name}</h3>
                  <div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-dark-charcoal">
                        {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                      </span>
                      {tier.period && <span className="text-gray-500">/{tier.period}</span>}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{tier.verifications} verifications</p>
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-bold-red flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={tier.buttonStyle + ' w-full'}>
                    {tier.buttonText}
                  </Button>
                  <p className="text-xs text-gray-500">No hidden fees. Upgrade or downgrade anytime.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-bold-red to-bright-yellow" />
        <div className="absolute inset-0 bg-gradient-to-l from-bright-yellow via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center space-y-8">
            <h2 className="h2-desktop lg:h2-mobile text-white font-bold">
              Ready to Clean Your Address Data?
            </h2>
            <p className="text-xl text-white opacity-90">
              Sign up now and get the first 5,000 verifications free!
            </p>
            <Button className="bg-dark-charcoal text-white font-semibold px-8 py-4 text-lg animate-pulse-button hover:bg-gray-700">
              Sign Up Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
