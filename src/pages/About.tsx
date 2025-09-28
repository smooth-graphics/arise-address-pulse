
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Shield, Users, Award, ArrowRight, Globe, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Addresses Verified", value: "50M+", icon: MapPin },
    { label: "Countries Supported", value: "195+", icon: Globe },
    { label: "Nigerian Businesses", value: "500+", icon: Users },
    { label: "Accuracy Rate", value: "99.9%", icon: Award }
  ];

  const team = [
    {
      name: "Adebayo Johnson",
      role: "CEO & Co-founder",
      description: "Former engineering lead at Flutterwave with 10+ years in fintech",
      image: "👨🏿‍💼"
    },
    {
      name: "Fatima Ibrahim", 
      role: "CTO & Co-founder",
      description: "Ex-Google engineer specializing in verification systems and AI",
      image: "👩🏿‍💻"
    },
    {
      name: "Chidi Okafor",
      role: "Head of Product",
      description: "Product expert with experience building verification solutions",
      image: "👨🏿‍💻"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize the security and privacy of your data with bank-grade encryption and compliance standards."
    },
    {
      icon: Zap,
      title: "Speed & Reliability",
      description: "Our platform delivers sub-200ms response times with 99.9% uptime for mission-critical applications."
    },
    {
      icon: Users,
      title: "Nigerian Focus",
      description: "Built with deep understanding of Nigerian addressing systems and regulatory requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 lg:px-12">
      {/* Hero Section */}
      <section className="pt-16 pb-16 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-bold-red/10 to-vibrant-orange/10 rounded-full border border-bold-red/20 mb-6">
            <span className="text-bold-red font-semibold text-sm">✨ About Arise Verification</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Building Trust Through
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-bold-red via-vibrant-orange to-bright-yellow">
              Accurate Verification
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make address and identity verification seamless for businesses across Nigeria and beyond. 
            Founded in 2020, we've become the trusted verification partner for hundreds of companies.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in Lagos in 2020, Arise Verification was born from a simple observation: 
                  Nigerian businesses were losing millions of naira annually due to failed deliveries 
                  and fraudulent transactions caused by inaccurate address and identity data.
                </p>
                <p>
                  Our founders, having experienced these challenges firsthand while building fintech 
                  solutions, decided to create a comprehensive verification platform specifically 
                  designed for the Nigerian market while maintaining global capabilities.
                </p>
                <p>
                  Today, we've processed over 50 million address verifications and helped hundreds 
                  of businesses reduce delivery failures, prevent fraud, and ensure regulatory compliance.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-bold-red/10 to-vibrant-orange/10 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To make address and identity verification so accurate and seamless that businesses 
                can focus on what they do best - serving their customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The people behind Nigeria's most trusted verification platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <CardContent className="p-8">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <div className="text-bold-red font-medium mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
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
            Ready to Join Our Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start using Arise Verification today and see why hundreds of Nigerian businesses trust us
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-bold-red hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-bold-red px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
