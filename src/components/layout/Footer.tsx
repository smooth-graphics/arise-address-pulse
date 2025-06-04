
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Docs', href: '/docs' },
  ];

  const resources = [
    { label: 'API Reference', href: '/docs' },
    { label: 'Support Center', href: '/contact' },
    { label: 'Status', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Arise */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-bold-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">Arise</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Clean, accurate address data at lightning speed. We're revolutionizing 
              address verification for businesses worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-bright-yellow hover:text-vibrant-orange transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-vibrant-orange" />
                <a 
                  href="mailto:support@arise.io" 
                  className="text-gray-300 hover:text-bright-yellow transition-colors"
                >
                  support@arise.io
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-vibrant-orange" />
                <span className="text-gray-300">+1-800-ADDRESS</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-vibrant-orange mt-1" />
                <div className="text-gray-300">
                  <div>Nigeria HQ:</div>
                  <div>123 Data Way, Abuja, Nigeria</div>
                  <div className="mt-2">USA Office:</div>
                  <div>456 Silicon Avenue, San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Arise Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 opacity-50 grayscale">
              {/* Payment Icons - placeholder */}
              <div className="text-xs text-gray-500">Visa</div>
              <div className="text-xs text-gray-500">Mastercard</div>
              <div className="text-xs text-gray-500">Amex</div>
              <div className="text-xs text-gray-500">PayPal</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
