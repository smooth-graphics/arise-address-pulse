
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MapPin, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const { verifyOTP, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOTP(otp);
      toast({
        title: "Account verified!",
        description: "Welcome to Arise. Your account has been verified successfully.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Please check your OTP and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/auth/signup" className="inline-flex items-center text-gray-600 hover:text-bold-red mb-6 transition-colors duration-200">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-xl flex items-center justify-center">
                <div className="flex">
                  <MapPin className="w-5 h-5 text-white" />
                  <Shield className="w-5 h-5 text-white -ml-1" />
                </div>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
            <p className="text-gray-600">Enter the verification code sent to your email</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-12 text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading || otp.length !== 6}
                className="w-full h-12 bg-gradient-to-r from-bold-red to-vibrant-orange hover:from-vibrant-orange hover:to-bright-yellow text-white font-semibold"
              >
                {isLoading ? 'Verifying...' : 'Verify Account'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Didn't receive the code?{' '}
                <button className="text-bold-red hover:text-vibrant-orange font-semibold">
                  Resend Code
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOTP;
