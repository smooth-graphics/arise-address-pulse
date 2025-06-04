
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Zap, Upload, Globe, BarChart3, Code, Shield } from 'lucide-react';

const Features = () => {
  const spotlightFeatures = [
    {
      title: 'Autocomplete & Suggestions',
      description: 'Accelerate form completion with predictive suggestions as users type. Our intelligent autocomplete reduces cart abandonment and improves user experience.',
      image: '/placeholder.svg',
      imageAlt: 'Autocomplete dropdown showing address suggestions',
      side: 'left'
    },
    {
      title: 'Bulk Verification Portal',
      description: 'Validate thousands of addresses at once with our user-friendly bulk upload interface. Get detailed reports in minutes with confidence scores and error analysis.',
      image: '/placeholder.svg',
      imageAlt: 'CSV upload interface with progress bar',
      side: 'right'
    },
    {
      title: 'International Coverage',
      description: 'We cover 240+ countries & territories with local postal formats, multi-language support, and region-specific validation rules.',
      image: '/placeholder.svg',
      imageAlt: 'World map with location pins',
      side: 'left'
    },
    {
      title: 'Analytics & Insights',
      description: 'Visualize verification accuracy, error types, and usage trends with comprehensive dashboards and real-time reporting.',
      image: '/placeholder.svg',
      imageAlt: 'Analytics dashboard with charts',
      side: 'right'
    }
  ];

  const apiFeatures = [
    {
      title: 'RESTful API',
      description: 'Simple HTTP requests with JSON responses',
      icon: Code
    },
    {
      title: 'Real-time Webhooks',
      description: 'Get notified instantly when verification completes',
      icon: Zap
    },
    {
      title: 'Batch Processing',
      description: 'Process thousands of addresses in one request',
      icon: Upload
    },
    {
      title: 'Global Coverage',
      description: '240+ countries and territories supported',
      icon: Globe
    }
  ];

  const comparisonData = [
    { feature: 'Real-Time API', arise: true, competitorA: true, competitorB: false },
    { feature: 'Bulk CSV Upload', arise: true, competitorA: false, competitorB: true },
    { feature: 'Global Coverage (240+ countries)', arise: true, competitorA: false, competitorB: false },
    { feature: 'Autocomplete Widget', arise: true, competitorA: true, competitorB: false },
    { feature: 'Analytics Dashboard', arise: true, competitorA: false, competitorB: false },
    { feature: '99.9% SLA', arise: true, competitorA: false, competitorB: true },
    { feature: 'Sub-second Response Times', arise: true, competitorA: false, competitorB: false },
    { feature: 'Confidence Scoring', arise: true, competitorA: true, competitorB: false }
  ];

  const customerLogos = [
    'ShipFast', 'GlobalMart', 'DeliveryPro', 'LogiTech', 'SendQuick', 'MailMaster'
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="h1-desktop lg:h1-mobile text-dark-charcoal mb-6">
            Built for Accuracy. Designed for Speed.
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to keep your address data squeaky clean, with features 
            that scale from startup to enterprise.
          </p>
        </div>
      </section>

      {/* Feature Spotlight Modules */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {spotlightFeatures.map((feature, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                feature.side === 'right' ? 'lg:grid-cols-2' : ''
              }`}>
                <div className={`space-y-6 ${feature.side === 'right' ? 'lg:order-2' : ''}`}>
                  <h2 className="text-3xl font-bold text-dark-charcoal">{feature.title}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                  <Button className="btn-primary">
                    Learn More
                  </Button>
                </div>

                <div className={`${feature.side === 'right' ? 'lg:order-1' : ''}`}>
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-bold-red/10 rounded-full flex items-center justify-center">
                          {index === 0 && <Zap className="w-8 h-8 text-bold-red" />}
                          {index === 1 && <Upload className="w-8 h-8 text-vibrant-orange" />}
                          {index === 2 && <Globe className="w-8 h-8 text-bright-yellow" />}
                          {index === 3 && <BarChart3 className="w-8 h-8 text-bold-red" />}
                        </div>
                        <p className="text-gray-600 font-medium">{feature.imageAlt}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Under the Hood Diagram */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="h2-desktop lg:h2-mobile text-dark-charcoal mb-6">
              Under the Hood
            </h2>
            <p className="text-lg text-gray-600">
              See how our address verification engine processes your data
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
              {[
                { label: 'Input', icon: Upload, color: 'bg-bold-red' },
                { label: 'Geocoding Engine', icon: Globe, color: 'bg-vibrant-orange' },
                { label: 'Validation Rules', icon: Shield, color: 'bg-bright-yellow' },
                { label: 'Output', icon: Check, color: 'bg-bold-red' }
              ].map((step, index) => (
                <React.Fragment key={index}>
                  <div className="text-center group cursor-pointer">
                    <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-dark-charcoal">{step.label}</h3>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block flex-1">
                      <div className="h-1 bg-vibrant-orange rounded-full"></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developer Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="h2-desktop lg:h2-mobile text-dark-charcoal">
                Developer-Friendly Tools
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Integrate address verification into your application with our comprehensive 
                developer tools and SDKs.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {apiFeatures.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center space-y-2">
                      <feature.icon className="w-8 h-8 text-bold-red mx-auto" />
                      <h4 className="font-semibold text-sm text-dark-charcoal">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button className="btn-primary">
                View API Documentation →
              </Button>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-dark-charcoal">API Example</h3>
              <div className="bg-gray-900 rounded-lg p-6 text-gray-100 font-mono text-sm overflow-x-auto">
                <pre>{`curl -X POST https://api.arise.io/validate \\
  -H "Authorization: Bearer <API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "address": "1600 Pennsylvania Ave NW",
    "city": "Washington",
    "state": "DC",
    "country": "US"
  }'`}</pre>
              </div>

              <div className="flex flex-wrap gap-4">
                {['JavaScript', 'Python', 'PHP', 'Ruby'].map((sdk) => (
                  <Button key={sdk} variant="outline" className="hover:bg-bright-yellow hover:border-bright-yellow">
                    {sdk} SDK
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="h2-desktop lg:h2-mobile text-dark-charcoal mb-6">
              How We Stack Up
            </h2>
            <p className="text-lg text-gray-600">
              See why developers choose Arise over the competition
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-vibrant-orange text-white">
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-center font-semibold">Arise</th>
                    <th className="p-4 text-center font-semibold">Competitor A</th>
                    <th className="p-4 text-center font-semibold">Competitor B</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 font-medium text-dark-charcoal">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.arise ? (
                          <Check className="w-5 h-5 text-bold-red mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.competitorA ? (
                          <Check className="w-5 h-5 text-bold-red mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.competitorB ? (
                          <Check className="w-5 h-5 text-bold-red mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Accordions */}
            <div className="md:hidden space-y-4">
              {comparisonData.map((row, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-dark-charcoal mb-3">{row.feature}</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Arise</div>
                        {row.arise ? (
                          <Check className="w-4 h-4 text-bold-red mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400 mx-auto" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Competitor A</div>
                        {row.competitorA ? (
                          <Check className="w-4 h-4 text-bold-red mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400 mx-auto" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Competitor B</div>
                        {row.competitorB ? (
                          <Check className="w-4 h-4 text-bold-red mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400 mx-auto" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Logos & Success Stories */}
      <section className="py-16 bg-dark-charcoal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="h2-desktop lg:h2-mobile mb-12">
            Trusted by Leading Companies
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {customerLogos.map((logo, index) => (
              <div 
                key={index}
                className="bg-white/10 p-4 rounded-lg grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer hover:bg-white/20"
              >
                <div className="font-semibold text-white">{logo}</div>
              </div>
            ))}
          </div>

          <Button className="btn-secondary border-bright-yellow text-bright-yellow hover:bg-bright-yellow hover:text-dark-charcoal">
            Read our case studies →
          </Button>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="h2-desktop lg:h2-mobile text-dark-charcoal">
            See All Features in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your free trial and experience the power of accurate address data.
          </p>
          <Button className="btn-primary text-lg px-8 py-4">
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Features;
