import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Camera,
  Sparkles,
  ArrowRight,
  Clock,
  Shield,
  Eye,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VerifyAddress = () => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [aiFlags, setAiFlags] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setDocuments([...documents, ...files]);
  };

  const removeDocument = (index: number) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    setDocuments(newDocuments);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    setProgress(0);
    setAiFlags([]);

    // Simulate processing with setTimeout and dynamic progress updates
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsProcessing(false);

          // Simulate AI flags and verification result
          setAiFlags([
            "Document quality is low",
            "Address format is non-standard",
          ]);
          setVerificationResult({
            confidenceScore: 98,
            processingTime: 2.3,
          });

          setStep(3);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bold-red via-vibrant-orange to-bright-yellow p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Address Verification</h2>
          <p className="text-white/90 text-lg">Submit your address and documents for AI-powered verification</p>
          <div className="flex items-center gap-2 mt-4">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">Powered by Advanced AI Technology</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
              step >= stepNumber 
                ? 'bg-gradient-to-br from-bold-red to-vibrant-orange text-white shadow-lg' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
            </div>
            {stepNumber < 3 && (
              <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                step > stepNumber ? 'bg-gradient-to-r from-bold-red to-vibrant-orange' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bold-red to-vibrant-orange"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
              <div className="p-2 bg-gradient-to-br from-bold-red to-vibrant-orange rounded-xl">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              Enter Your Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Address
              </label>
              <Textarea
                placeholder="Enter your complete address including street, city, state, and postal code..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="min-h-[120px] text-base border-2 focus:border-bold-red"
              />
            </div>
            <Button 
              onClick={() => setStep(2)} 
              disabled={!address.trim()}
              className="w-full bg-gradient-to-r from-bold-red to-vibrant-orange text-white hover:shadow-lg transition-all duration-300 h-12 text-base font-semibold"
            >
              Continue to Document Upload
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vibrant-orange to-bright-yellow"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
              <div className="p-2 bg-gradient-to-br from-vibrant-orange to-bright-yellow rounded-xl">
                <FileText className="h-5 w-5 text-white" />
              </div>
              Upload Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-bold-red hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50 transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700">
                Upload Supporting Documents
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Utility bills, bank statements, or government-issued documents
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            
            {documents.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Uploaded Documents</h4>
                {documents.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(index)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="flex-1 border-gray-300 hover:bg-gray-50"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={documents.length === 0}
                className="flex-1 bg-gradient-to-r from-vibrant-orange to-bright-yellow text-white hover:shadow-lg transition-all duration-300 font-semibold"
              >
                Start Verification
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <div className="space-y-6">
          {/* Processing Card */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bright-yellow to-green-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                <div className="p-2 bg-gradient-to-br from-bright-yellow to-green-500 rounded-xl">
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-white" />
                  )}
                </div>
                {isProcessing ? 'AI Processing Your Verification' : 'Verification Complete'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} className="w-full h-3" />
              <p className="text-sm text-gray-600">
                {isProcessing 
                  ? 'Our AI is analyzing your documents and cross-referencing address data...' 
                  : 'Your address verification has been completed successfully!'
                }
              </p>
            </CardContent>
          </Card>

          {/* Results */}
          {verificationResult && (
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Success Banner */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-900">Verification Successful</h3>
                        <p className="text-sm text-green-700">Your address has been verified with 98% confidence</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Flags */}
                  {aiFlags.length > 0 && (
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-500 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-900 mb-2">AI Detected Minor Discrepancies</h3>
                          <div className="space-y-1">
                            {aiFlags.map((flag, index) => (
                              <p key={index} className="text-sm text-amber-700">• {flag}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Verification Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-900">Confidence Score</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">98%</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-900">Processing Time</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">2.3s</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-900">Documents</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{documents.length}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => {
                        setStep(1);
                        setVerificationResult(null);
                        setAiFlags([]);
                        setDocuments([]);
                        setAddress('');
                        setProgress(0);
                      }}
                      className="flex-1 bg-gradient-to-r from-bold-red to-vibrant-orange text-white hover:shadow-lg transition-all duration-300 font-semibold"
                    >
                      Start New Verification
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Full Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyAddress;
