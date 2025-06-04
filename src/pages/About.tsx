
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Mission: Accurate Addresses for a Connected World
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Founded in 2022, we're on a journey to eliminate bad address data forever.
          </p>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-dark-charcoal">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                { year: "2022", text: "Company founded in Lagos by a team of data-enthusiasts." },
                { year: "2023", text: "Launched first global API; reached 1M verifications." },
                { year: "2024", text: "Expanded to 240+ country coverage." },
                { year: "2025", text: "Secured Series A funding; scaling to enterprise market." }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="flex-shrink-0 w-4 h-4 bg-vibrant-orange rounded-full"></div>
                  <div className="flex-1">
                    <span className="font-semibold text-vibrant-orange">{item.year}:</span>
                    <span className="ml-2 text-gray-600">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-dark-charcoal">Culture & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Innovation", description: "We never stop iterating." },
              { title: "Accuracy", description: "Data is only as good as its source." },
              { title: "Customer-First", description: "Your success is our success." }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-bright-yellow rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-dark-charcoal">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-bold-red text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <button className="bg-dark-charcoal text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            View Openings
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
