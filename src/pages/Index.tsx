
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MapPin, Shield, Zap, CheckCircle, Globe, TrendingUp, Users, Clock, Star } from 'lucide-react';

const Index = () => {
  const [animatedCount, setAnimatedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setAnimatedCount(prev => (prev + 1) % 1000000);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Real-Time Verification",
      description: "Instantly verify addresses as users type with our lightning-fast API",
      color: "from-bold-red to-vibrant-orange"
    },
    {
      icon: Shield,
      title: "Identity Validation",
      description: "Secure identity verification with bank-grade security protocols",
      color: "from-vibrant-orange to-bright-yellow"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Process thousands of addresses in seconds with bulk validation",
      color: "from-bright-yellow to-bold-red"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Support for 240+ countries with local format standards",
      color: "from-bold-red to-vibrant-orange"
    }
  ];

  const stats = [
    { label: "Addresses Verified", value: "50M+", icon: MapPin },
    { label: "Countries Supported", value: "240+", icon: Globe },
    { label: "API Response Time", value: "<200ms", icon: Zap },
    { label: "Accuracy Rate", value: "99.9%", icon: CheckCircle }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, ShipFast",
      content: "Arise reduced our delivery failures by 85%. The API integration was seamless!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Operations Manager, EcomGlobal",
      content: "The bulk verification feature saved us weeks of manual work. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-bold-red/10 via-vibrant-orange/10 to-bright-yellow/10"></div>
        </div>

        <div className="container mx-auto text-center relative">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-bold-red/10 to-vibrant-orange/10 rounded-full border border-bold-red/20 mb-6">
              <span className="text-bold-red font-semibold text-sm">✨ Trusted by 10,000+ businesses worldwide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Verify Addresses & Identities
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-bold-red via-vibrant-orange to-bright-yellow">
                In Real-Time
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Clean, accurate address data and secure identity verification for your business. 
              Reduce delivery costs, prevent fraud, and improve customer experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="group bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-2 border-bold-red text-bold-red hover:bg-bold-red hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                View Demo
              </Button>
            </div>

            {/* Quick Demo */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Try It Now</h3>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="Enter any address..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bold-red focus:border-transparent"
                />
                <Button className="bg-bold-red hover:bg-vibrant-orange text-white px-6 py-3 rounded-lg">
                  Verify
                </Button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                ✓ Instant validation ✓ Auto-correction ✓ Global coverage
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Address & Identity Verification
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to ensure accurate data and secure verification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Simple, fast, and reliable verification in 3 steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Data</h3>
              <p className="text-gray-600">Send address or identity data via our API or upload CSV files</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-vibrant-orange to-bright-yellow rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify & Validate</h3>
              <p className="text-gray-600">Our system checks against global databases and corrects errors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-bright-yellow to-bold-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Results</h3>
              <p className="text-gray-600">Receive clean, standardized data ready for your business use</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-bright-yellow fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-bold-red via-vibrant-orange to-bright-yellow">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Clean Your Data?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Arise for accurate address and identity verification
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-bold-red hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-bold-red px-8 py-4 text-lg font-semibold rounded-xl">
              Contact Sales
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-8 text-white/80 text-sm">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
