
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Twitter, Linkedin, Github, Mail, Phone, MapIcon } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'API Docs', href: '/docs' },
  ];

  const products = [
    { label: 'Address Verification', href: '#' },
    { label: 'Identity Validation', href: '#' },
    { label: 'Bulk Processing', href: '#' },
    { label: 'API Integration', href: '#' },
    { label: 'Dashboard', href: '#' },
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
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">
                  Arise
                </span>
                <div className="text-sm font-medium text-vibrant-orange -mt-1">Verification</div>
              </div>
            </Link>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-bold-red hover:to-vibrant-orange hover:text-white transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('footer.products')}</h4>
            <ul className="space-y-3">
              {products.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Contact */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">{t('footer.company')}</h4>
              <ul className="space-y-3">
                {company.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">{t('footer.contact')}</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-vibrant-orange" />
                  <a href="mailto:hello@arise.dev" className="hover:text-white transition-colors">
                    onu.omar-ikaige@sahara-group.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-vibrant-orange" />
                  <span>+1-800-GenIEtalVerify or +2349139330519</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-300">
                  <MapIcon className="w-4 h-4 text-vibrant-orange mt-1" />
                  <div>
                    <div>Lagos, Nigeria</div>
                    <div>San Francisco, USA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} {t('footer.copyright')}
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-xs text-gray-500">{t('footer.securedBy')}</div>
              <div className="flex space-x-4 opacity-50">
                <div className="text-xs text-gray-500">256-bit SSL</div>
                <div className="text-xs text-gray-500">SOC 2 Compliant</div>
                <div className="text-xs text-gray-500">GDPR Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
