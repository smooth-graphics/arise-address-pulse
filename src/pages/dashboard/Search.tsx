import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';

const Search = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;
    
    setIsVerifying(true);
    
    // Simulate verification delay
    setTimeout(() => {
      setIsVerifying(false);
      // Handle verification results here
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Main Form */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Identity Verification
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            GenIEtal cross-checks names and addresses across verified database to confirm identities. Enter full details to begin.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          {/* Name Input */}
          <div>
            <Input
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 text-base"
              required
            />
          </div>

          {/* Address Input */}
          <div>
            <Input
              type="text"
              placeholder="Enter full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-12 text-base"
              required
            />
          </div>

          {/* Helper Text */}
          <p className="text-xs text-muted-foreground text-center mt-2">
            Both full name and complete address are required for verification.
          </p>

          {/* Verify Button */}
          <Button
            type="submit"
            disabled={isVerifying || !name || !address}
            className="w-full h-12 mt-6 bg-genital-orange hover:bg-genital-orange-dark text-white font-medium text-base"
          >
            {isVerifying ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              "Verify Identity"
            )}
          </Button>
        </form>

        {/* Security Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center text-xs text-muted-foreground mb-3">
            <Lock className="h-3 w-3 mr-1" />
            Your data is secure and encrypted
          </div>
          
          {/* Terms and Privacy Links */}
          <div className="flex items-center justify-center gap-4 text-xs">
            <a 
              href="/terms" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <span className="text-muted-foreground">•</span>
            <a 
              href="/privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;