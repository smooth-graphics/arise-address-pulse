
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, Shield, Zap, Globe, BarChart3, CreditCard, 
  Smartphone, Bot, Lock, TrendingUp, Users, Clock,
  CheckCircle, ArrowRight
} from 'lucide-react';

const Features = () => {
  const heroFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms provide personalized financial insights and automated decision making.",
      image: "gradient-to-br from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Bank-level encryption, biometric authentication, and real-time fraud detection keep your assets safe.",
      image: "gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Lightning Speed",
      description: "Process transactions in milliseconds with our optimized blockchain infrastructure and edge computing.",
      image: "gradient-to-br from-yellow-500 to-orange-500"
    }
  ];

  const allFeatures = [
    {
      category: "Trading & Investments",
      features: [
        { icon: TrendingUp, title: "Smart Portfolio Management", description: "AI-driven portfolio optimization with real-time rebalancing" },
        { icon: BarChart3, title: "Advanced Analytics", description: "Deep market insights with predictive modeling" },
        { icon: Bot, title: "Automated Trading", description: "Set custom trading rules and let AI execute them" },
        { icon: Globe, title: "Global Markets", description: "Access to 50+ international exchanges" }
      ]
    },
    {
      category: "Payments & Banking",
      features: [
        { icon: CreditCard, title: "Smart Payments", description: "Contactless payments with dynamic security tokens" },
        { icon: Smartphone, title: "Mobile Banking", description: "Full-featured banking in your pocket" },
        { icon: Users, title: "Multi-Account Management", description: "Manage personal and business accounts seamlessly" },
        { icon: Clock, title: "Instant Transfers", description: "24/7 real-time money transfers globally" }
      ]
    },
    {
      category: "Security & Compliance",
      features: [
        { icon: Lock, title: "Biometric Authentication", description: "Face ID, fingerprint, and voice recognition" },
        { icon: Shield, title: "Fraud Protection", description: "Real-time transaction monitoring and alerts" },
        { icon: CheckCircle, title: "Regulatory Compliance", description: "Full compliance with financial regulations" },
        { icon: Brain, title: "Risk Assessment", description: "AI-powered risk analysis for all transactions" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-dark-charcoal to-gray-800 text-white pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-bold-red/20 to-vibrant-orange/20 rounded-full border border-bold-red/30 mb-6">
            <span className="text-bright-yellow font-medium">🚀 Advanced Features</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-bright-yellow to-vibrant-orange bg-clip-text text-transparent">
            Built for the Future
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16">
            Experience next-generation financial technology with features designed for speed, security, and intelligence.
          </p>

          {/* Hero Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {heroFeatures.map((feature, index) => (
              <Card key={index} className="group bg-white/5 backdrop-blur-xl border border-white/20 hover:border-vibrant-orange/50 transition-all duration-500 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 rounded-3xl bg-${feature.image} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-vibrant-orange to-bright-yellow rounded-full opacity-20 animate-pulse"></div>
      </section>

      {/* Feature Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          {allFeatures.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-bright-yellow to-vibrant-orange bg-clip-text text-transparent">
                  {category.category}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.features.map((feature, index) => (
                  <Card key={index} className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 hover:border-bright-yellow/50 transition-all duration-500 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-bold-red to-vibrant-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-dark-charcoal/50 to-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              See It In Action
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience our features with interactive demos and real-time simulations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* AI Trading Demo */}
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4 text-white">AI Trading Assistant</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                  <span className="text-green-400">BUY AAPL</span>
                  <span className="text-white font-bold">+2.3%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                  <span className="text-blue-400">HOLD TSLA</span>
                  <span className="text-white font-bold">+0.8%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-500/20 rounded-xl border border-red-500/30">
                  <span className="text-red-400">SELL MSFT</span>
                  <span className="text-white font-bold">-1.2%</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow">
                Try AI Trading
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>

            {/* Security Demo */}
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4 text-white">Security Dashboard</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-white">2FA Enabled</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-white">Biometric Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-white">Fraud Protection</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow">
                Test Security
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-bright-yellow via-vibrant-orange to-bold-red bg-clip-text text-transparent">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already using our advanced financial platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-bright-yellow/25 transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-2 border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-dark-charcoal px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
