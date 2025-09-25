
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Shield, Zap, Globe, FileCheck, Users, Building, CreditCard, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: MapPin,
      title: "Global Address Verification",
      description: "Verify and standardize addresses in 195+ countries including comprehensive Nigerian postal code validation",
      benefits: ["Real-time verification", "Auto-correction", "Geo tagged validation parameters", "Comprehensive results in standardized formats"],
      color: "from-bold-red to-vibrant-orange"
    },
    {
      icon: Shield,
      title: "Identity Document Validation",
      description: "Secure verification of government IDs, passports, driver's licenses, and Nigerian identification documents",
      benefits: ["Government ID verification", "Passport validation", "Driver's license check", "Nigerian NIN verification"],
      color: "from-vibrant-orange to-bright-yellow"
    },
    {
      icon: FileCheck,
      title: "Document Authentication",
      description: "Advanced document verification using AI to detect fraud and ensure authenticity",
      benefits: ["Fraud detection", "Document authenticity", "Biometric matching", "Digital signatures"],
      color: "from-bright-yellow to-bold-red"
    },
    {
      icon: Zap,
      title: "Instant API Processing",
      description: "Lightning-fast verification with sub-200ms response times for real-time applications",
      benefits: ["Sub-200ms response", "99.9% uptime", "Bulk processing", "Real-time webhooks"],
      color: "from-bold-red to-vibrant-orange"
    }
  ];

  const additionalFeatures = [
    {
      icon: Globe,
      title: "Nigerian Postal Integration",
      description: "Direct integration with Nigerian Postal Service for accurate local address validation"
    },
    {
      icon: Building,
      title: "Business Verification",
      description: "Verify business addresses and corporate identities with CAC integration"
    },
    {
      icon: Users,
      title: "Bulk Processing",
      description: "Process thousands of addresses and identities simultaneously"
    },
    {
      icon: CreditCard,
      title: "Compliance Ready",
      description: "Meet KYC, AML, and Nigerian regulatory requirements automatically"
    },
    {
      icon: Clock,
      title: "Real-time Monitoring",
      description: "Monitor verification status and get instant notifications"
    },
    {
      icon: CheckCircle,
      title: "Data Standardization",
      description: "Clean and standardize data according to international formats"
    }
  ];

  const useCases = [
    {
      title: "E-commerce & Delivery",
      description: "Reduce failed deliveries and shipping costs with accurate address verification",
      icon: "🚚"
    },
    {
      title: "Financial Services",
      description: "Meet KYC requirements and prevent fraud with identity verification",
      icon: "🏦"
    },
    {
      title: "Digital Banking",
      description: "Onboard customers securely with automated identity validation",
      icon: "💳"
    },
    {
      title: "Insurance",
      description: "Verify customer information and prevent fraudulent claims",
      icon: "🛡️"
    },
    {
      title: "Telecommunications",
      description: "Verify customer identities for SIM registration and service activation",
      icon: "📱"
    },
    {
      title: "Real Estate",
      description: "Validate property addresses and verify buyer/seller identities",
      icon: "🏠"
    }
  ];

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 lg:px-12">
      {/* Hero Section */}
      <section className="pt-16 pb-8 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-bold-red/10 to-vibrant-orange/10 rounded-full border border-bold-red/20 mb-6">
            <span className="text-bold-red font-semibold text-sm">✨ First indigenous ratings based verification and validation application.</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Innovate &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-bold-red via-vibrant-orange to-bright-yellow">
              data-driven
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Everything you need to verify addresses and identities across Nigeria and globally. 
            From corporate validation to government ID verification.
          </p>
          
          <Button className="group bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Verification Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful tools for address and identity verification with Nigerian market expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Capabilities
            </h2>
            <p className="text-lg text-gray-600">
              Extended features for comprehensive verification workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry Use Cases
            </h2>
            <p className="text-lg text-gray-600">
              See how different industries use our verification services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-bold-red via-vibrant-orange to-bright-yellow">
        <div className="container mx-auto text-center max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Verifying?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get started with our comprehensive verification platform today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-bold-red hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-bold-red px-8 py-4 text-lg font-semibold rounded-xl">
              View Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
