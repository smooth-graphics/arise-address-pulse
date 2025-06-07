
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Shield, CheckCircle, Users, Building } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-xl flex items-center justify-center">
              <div className="flex">
                <MapPin className="w-7 h-7 text-white" />
                <Shield className="w-7 h-7 text-white -ml-2" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Arise</h1>
          <p className="text-gray-600">
            Verify addresses and identities across Nigeria with confidence
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">Instant address verification</span>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700">Individual & business accounts</span>
          </div>
          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-purple-500" />
            <span className="text-gray-700">API access for developers</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to="/auth/signup">
            <Button className="w-full h-12 bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white font-semibold">
              Get Started
            </Button>
          </Link>
          
          <Link to="/auth/login">
            <Button variant="outline" className="w-full h-12 border-2 border-gray-200 hover:border-bold-red hover:text-bold-red">
              I already have an account
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link to="/" className="text-gray-500 hover:text-bold-red text-sm">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
