
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Shield, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <div className="flex">
                <MapPin className="w-4 h-4 text-white" />
                <Shield className="w-4 h-4 text-white -ml-1" />
              </div>
            </div>
            <span className="text-xl font-bold text-gray-900">Arise</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/features" 
              className="text-gray-600 hover:text-bold-red font-medium transition-colors duration-200"
              onClick={() => window.scrollTo(0, 0)}
            >
              Features
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-gray-600 hover:text-bold-red font-medium transition-colors duration-200"
              onClick={() => window.scrollTo(0, 0)}
            >
              How It Works
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-600 hover:text-bold-red font-medium transition-colors duration-200"
              onClick={() => window.scrollTo(0, 0)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-bold-red font-medium transition-colors duration-200"
              onClick={() => window.scrollTo(0, 0)}
            >
              About
            </Link>
            
            <Link 
              to="/faq" 
              className="text-gray-600 hover:text-bold-red font-medium transition-colors duration-200"
              onClick={() => window.scrollTo(0, 0)}
            >
              FAQ
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-bold-red hover:bg-bold-red/5 transition-all duration-200"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white font-semibold transition-all duration-300 transform hover:scale-105">
                Start Free Trial
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
                className="text-gray-600 hover:text-bold-red font-medium transition-colors duration-200"
                onClick={() => {setIsOpen(false); window.scrollTo(0, 0);}}
              >
                Features
              </Link>
              <Link 
                to="/how-it-works" 
                className="text-gray-600 hover:text-bold-red font-medium transition-colors duration-200"
                onClick={() => {setIsOpen(false); window.scrollTo(0, 0);}}
              >
                How It Works
              </Link>
              <Link 
                to="/pricing" 
                className="text-gray-600 hover:text-bold-red font-medium transition-colors duration-200"
                onClick={() => {setIsOpen(false); window.scrollTo(0, 0);}}
              >
                Pricing
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-bold-red font-medium transition-colors duration-200"
                onClick={() => {setIsOpen(false); window.scrollTo(0, 0);}}
              >
                About
              </Link>
              <Link 
                to="/docs" 
                className="text-gray-600 hover:text-bold-red font-medium transition-colors duration-200"
                onClick={() => {setIsOpen(false); window.scrollTo(0, 0);}}
              >
                Docs
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-600 hover:text-bold-red font-medium transition-colors duration-200"
                onClick={() => {setIsOpen(false); window.scrollTo(0, 0);}}
              >
                FAQ
              </Link>
              
              <div className="pt-4 space-y-2">
                <Link to="/auth" onClick={() => {setIsOpen(false); window.scrollTo(0, 0);}}>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border-gray-200 text-gray-600 hover:bg-bold-red hover:text-white hover:border-bold-red transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => {setIsOpen(false); window.scrollTo(0, 0);}}>
                  <Button className="w-full bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white font-semibold">
                    Start Free Trial
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
