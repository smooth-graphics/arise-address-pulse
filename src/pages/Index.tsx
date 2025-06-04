
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Shield, Zap, Globe, ChevronDown, Play, Star, Check } from 'lucide-react';

const Index = () => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setAnimatedValue(prev => (prev + 1000) % 100000);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms analyze market trends and provide real-time insights for smarter financial decisions.",
      gradient: "from-bold-red to-vibrant-orange"
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Enterprise-level encryption and multi-factor authentication keep your financial data safe and secure.",
      gradient: "from-vibrant-orange to-bright-yellow"
    },
    {
      icon: Zap,
      title: "Lightning Fast Transactions",
      description: "Process payments and transfers in milliseconds with our optimized blockchain infrastructure.",
      gradient: "from-bright-yellow to-bold-red"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with financial markets worldwide and manage multi-currency portfolios seamlessly.",
      gradient: "from-dark-charcoal to-vibrant-orange"
    }
  ];

  const stats = [
    { label: "Active Users", value: "2.5M+", suffix: "" },
    { label: "Transactions", value: "$847B", suffix: "" },
    { label: "Countries", value: "180+", suffix: "" },
    { label: "Uptime", value: "99.9", suffix: "%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-dark-charcoal to-gray-800 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-bold-red/20 via-vibrant-orange/20 to-bright-yellow/20 animate-pulse"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-bright-yellow rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-bold-red/20 to-vibrant-orange/20 rounded-full border border-bold-red/30 mb-6">
              <span className="text-bright-yellow font-medium">🚀 Next-Gen Financial Platform</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-bright-yellow to-vibrant-orange bg-clip-text text-transparent leading-tight">
              Arise
              <span className="block text-4xl md:text-6xl mt-2">FinTech</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Revolutionizing financial services with AI-powered insights, lightning-fast transactions, 
              and enterprise-grade security. The future of finance is here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="group bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="group border-2 border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-dark-charcoal px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-bright-yellow mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-vibrant-orange to-bright-yellow rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-bright-yellow rounded-full opacity-20 animate-ping"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-bright-yellow to-vibrant-orange bg-clip-text text-transparent">
              Cutting-Edge Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powered by advanced technology and designed for the modern financial ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-vibrant-orange/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Dashboard Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Intelligent Dashboard
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real-time analytics and insights at your fingertips
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Portfolio Value */}
                <Card className="bg-gradient-to-br from-bold-red/20 to-vibrant-orange/20 border border-bold-red/30 p-6 rounded-2xl">
                  <h4 className="text-gray-300 mb-2">Portfolio Value</h4>
                  <div className="text-3xl font-bold text-white mb-2">
                    ${animatedValue.toLocaleString()}
                  </div>
                  <div className="flex items-center text-green-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12.5%
                  </div>
                </Card>

                {/* Market Chart */}
                <Card className="bg-gradient-to-br from-vibrant-orange/20 to-bright-yellow/20 border border-vibrant-orange/30 p-6 rounded-2xl md:col-span-2">
                  <h4 className="text-gray-300 mb-4">Market Overview</h4>
                  <div className="h-24 flex items-end justify-between space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-bright-yellow to-vibrant-orange rounded-t opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                        style={{
                          height: `${Math.random() * 100}%`,
                          width: '4%'
                        }}
                      />
                    ))}
                  </div>
                </Card>

                {/* Recent Transactions */}
                <Card className="bg-gradient-to-br from-bright-yellow/20 to-bold-red/20 border border-bright-yellow/30 p-6 rounded-2xl lg:col-span-3">
                  <h4 className="text-gray-300 mb-4">Recent Transactions</h4>
                  <div className="space-y-3">
                    {[
                      { type: 'Received', amount: '+$2,500', from: 'Tech Corp' },
                      { type: 'Sent', amount: '-$890', to: 'Supplier XYZ' },
                      { type: 'Investment', amount: '+$15,000', from: 'Stock Portfolio' }
                    ].map((transaction, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                        <div>
                          <div className="text-white font-medium">{transaction.type}</div>
                          <div className="text-gray-400 text-sm">
                            {transaction.from || transaction.to}
                          </div>
                        </div>
                        <div className={`font-bold ${transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {transaction.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-bright-yellow via-vibrant-orange to-bold-red bg-clip-text text-transparent">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of users who trust Arise FinTech for their financial needs. 
              Start your journey today with our free tier.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-bright-yellow/25 transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-2 border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-dark-charcoal px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300">
                Contact Sales
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-400 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-400 mr-2" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-400 mr-2" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-r from-bold-red/10 to-vibrant-orange/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-gradient-to-r from-vibrant-orange/10 to-bright-yellow/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};

export default Index;
