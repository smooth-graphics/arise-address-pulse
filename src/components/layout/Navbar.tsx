
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { MapPin, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { DemoModeIndicator } from '@/components/common/DemoModeIndicator';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Arise
              </span>
              <div className="text-sm font-medium text-vibrant-orange -mt-1">Verification</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/features" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/features') 
                  ? 'text-bold-red border-b-2 border-bold-red pb-1' 
                  : 'text-gray-600 hover:text-bold-red'
              }`}
            >
              {t('nav.features')}
            </Link>
            <Link 
              to="/how-it-works" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/how-it-works') 
                  ? 'text-bold-red border-b-2 border-bold-red pb-1' 
                  : 'text-gray-600 hover:text-bold-red'
              }`}
            >
              {t('nav.howItWorks')}
            </Link>
            <Link 
              to="/pricing" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/pricing') 
                  ? 'text-bold-red border-b-2 border-bold-red pb-1' 
                  : 'text-gray-600 hover:text-bold-red'
              }`}
            >
              {t('nav.pricing')}
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/about') 
                  ? 'text-bold-red border-b-2 border-bold-red pb-1' 
                  : 'text-gray-600 hover:text-bold-red'
              }`}
            >
              {t('nav.about')}
            </Link>
            
            <Link 
              to="/faq" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/faq') 
                  ? 'text-bold-red border-b-2 border-bold-red pb-1' 
                  : 'text-gray-600 hover:text-bold-red'
              }`}
            >
              {t('nav.faq')}
            </Link>
          </div>

          {/* Auth Buttons & Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <DemoModeIndicator />
            <LanguageSwitcher />
            <Link to="/auth">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-bold-red hover:bg-bold-red/5 transition-all duration-200"
              >
                {t('nav.signIn')}
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button className="bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white font-semibold transition-all duration-300 transform hover:scale-105">
                {t('nav.startFreeTrial')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-bold-red transition-colors duration-200"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/features" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/features') 
                    ? 'text-bold-red font-semibold' 
                    : 'text-gray-600 hover:text-bold-red'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.features')}
              </Link>
              <Link 
                to="/how-it-works" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/how-it-works') 
                    ? 'text-bold-red font-semibold' 
                    : 'text-gray-600 hover:text-bold-red'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.howItWorks')}
              </Link>
              <Link 
                to="/pricing" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/pricing') 
                    ? 'text-bold-red font-semibold' 
                    : 'text-gray-600 hover:text-bold-red'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.pricing')}
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/about') 
                    ? 'text-bold-red font-semibold' 
                    : 'text-gray-600 hover:text-bold-red'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link 
                to="/faq" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/faq') 
                    ? 'text-bold-red font-semibold' 
                    : 'text-gray-600 hover:text-bold-red'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.faq')}
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                <LanguageSwitcher />
              </div>
              
              <div className="pt-2 space-y-2">
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-200 text-gray-600 hover:border-bold-red hover:text-bold-red"
                  >
                    {t('nav.signIn')}
                  </Button>
                </Link>
                <Link to="/auth/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white font-semibold">
                    {t('nav.startFreeTrial')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
