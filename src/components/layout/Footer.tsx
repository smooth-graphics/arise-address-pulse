
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/how-it-works' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'API Docs', href: '/docs' },
  ];

  const products = [
    { label: 'Personal Banking', href: '#' },
    { label: 'Business Solutions', href: '#' },
    { label: 'Investment Platform', href: '#' },
    { label: 'API Integration', href: '#' },
    { label: 'Mobile App', href: '#' },
  ];

  const company = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-dark-charcoal to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-bold-red/20 via-vibrant-orange/20 to-bright-yellow/20"></div>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-bright-yellow rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-bright-yellow rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-bright-yellow bg-clip-text text-transparent">
                  Arise
                </span>
                <div className="text-sm font-medium text-vibrant-orange -mt-1">FinTech</div>
              </div>
            </Link>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              Revolutionizing financial services with AI-powered insights, lightning-fast transactions, 
              and enterprise-grade security. Building the future of finance, today.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-bright-yellow hover:bg-gradient-to-r hover:from-bold-red hover:to-vibrant-orange hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-bright-yellow">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-vibrant-orange group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-bright-yellow">Products</h4>
            <ul className="space-y-3">
              {products.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-vibrant-orange group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Contact */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-bright-yellow">Company</h4>
              <ul className="space-y-3">
                {company.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-vibrant-orange group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-bright-yellow">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-vibrant-orange" />
                  <a href="mailto:hello@arise.fintech" className="hover:text-bright-yellow transition-colors">
                    hello@arise.fintech
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-vibrant-orange" />
                  <span>+1-800-FINTECH</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-vibrant-orange mt-1" />
                  <div>
                    <div>San Francisco, CA</div>
                    <div>New York, NY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Arise FinTech Inc. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-xs text-gray-500">Secured by</div>
              <div className="flex space-x-4 opacity-50">
                <div className="text-xs text-gray-500">256-bit SSL</div>
                <div className="text-xs text-gray-500">FDIC Insured</div>
                <div className="text-xs text-gray-500">ISO 27001</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
