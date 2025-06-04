
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-dark-charcoal">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Questions? Feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark-charcoal">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-charcoal mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bold-red focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-charcoal mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bold-red focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-charcoal mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bold-red focus:border-transparent"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-charcoal mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bold-red focus:border-transparent"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-bold-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-vibrant-orange transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark-charcoal">Contact Information</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-dark-charcoal">Support</h3>
                <p className="text-gray-600 mb-2">📧 support@arise.io</p>
                <p className="text-gray-600">📞 +1-800-ADDRESS</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-dark-charcoal">Sales</h3>
                <p className="text-gray-600 mb-2">📧 sales@arise.io</p>
                <p className="text-gray-600">📞 +1-800-ASK-ARISE</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-dark-charcoal">Office Locations</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-dark-charcoal">Nigeria HQ</p>
                    <p className="text-gray-600">123 Data Way, Abuja, Nigeria</p>
                  </div>
                  <div>
                    <p className="font-medium text-dark-charcoal">USA Office</p>
                    <p className="text-gray-600">456 Silicon Avenue, San Francisco, CA, USA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
