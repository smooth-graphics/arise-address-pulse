
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MapPin, Upload, FileText, CheckCircle, AlertTriangle, Camera, Sparkles, Brain, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddressFormData {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  landmark?: string;
}

interface AIValidation {
  status: 'analyzing' | 'validated' | 'flagged' | 'failed';
  confidence: number;
  issues: string[];
  suggestions: string[];
}

const VerifyAddress = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [aiValidation, setAiValidation] = useState<AIValidation | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<AddressFormData>();

  const onSubmit = async (data: AddressFormData) => {
    setIsValidating(true);
    
    // Simulate AI validation
    setTimeout(() => {
      const mockValidation: AIValidation = {
        status: Math.random() > 0.3 ? 'validated' : 'flagged',
        confidence: Math.floor(Math.random() * 30) + 70,
        issues: Math.random() > 0.5 ? [] : ['Street number format unusual', 'City name variation detected'],
        suggestions: ['Consider uploading utility bill for verification', 'Add nearby landmark for better accuracy']
      };
      
      setAiValidation(mockValidation);
      setIsValidating(false);
      
      if (mockValidation.status === 'validated') {
        setStep(2);
      }
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles([...files, ...newFiles]);
      
      // Simulate AI document analysis
      toast({
        title: "Document uploaded",
        description: "AI is analyzing your document for verification...",
      });
      
      setTimeout(() => {
        toast({
          title: "Document analyzed",
          description: "AI has validated your document. Proceeding with verification.",
        });
      }, 1500);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const submitDocuments = async () => {
    setIsValidating(true);
    
    setTimeout(() => {
      toast({
        title: "Verification submitted successfully!",
        description: "AI has processed your documents. You'll receive updates via email.",
      });
      setStep(3);
      setIsValidating(false);
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-blue-50">
          <CardContent className="text-center pt-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Verification Submitted!</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Your address verification has been processed by our AI system and submitted for final review.
            </p>
            
            <div className="bg-white/70 backdrop-blur rounded-xl p-6 mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Reference ID:</span>
                <Badge className="bg-purple-100 text-purple-800 font-mono">VER-2024-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">AI Confidence:</span>
                <span className="text-green-600 font-bold">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Expected completion:</span>
                <span className="text-blue-600 font-medium">2-3 business days</span>
              </div>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button onClick={() => window.location.href = '/dashboard/history'} className="bg-gradient-to-r from-purple-500 to-blue-500">
                View Verification History
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Address Verification</h1>
        <p className="text-gray-600 text-lg">AI-powered verification with document analysis and geolocation validation</p>
      </div>

      {/* Enhanced Progress indicator */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-200'} transition-all duration-300`}>
              {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
            </div>
            <div className="ml-3">
              <div className="font-medium">Address Details</div>
              <div className="text-xs text-gray-500">AI validation enabled</div>
            </div>
          </div>
          
          <div className={`w-20 h-1 rounded-full ${step >= 2 ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-200'} transition-all duration-300`} />
          
          <div className={`flex items-center ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-200'} transition-all duration-300`}>
              {step > 2 ? <CheckCircle className="h-5 w-5" /> : '2'}
            </div>
            <div className="ml-3">
              <div className="font-medium">Upload Documents</div>
              <div className="text-xs text-gray-500">Smart analysis</div>
            </div>
          </div>
          
          <div className={`w-20 h-1 rounded-full ${step >= 3 ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-200'} transition-all duration-300`} />
          
          <div className={`flex items-center ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-200'} transition-all duration-300`}>
              {step >= 3 ? <CheckCircle className="h-5 w-5" /> : '3'}
            </div>
            <div className="ml-3">
              <div className="font-medium">AI Review</div>
              <div className="text-xs text-gray-500">Final validation</div>
            </div>
          </div>
        </div>
      </div>

      {step === 1 && (
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              Address Information
              <Sparkles className="h-5 w-5 text-purple-500" />
            </CardTitle>
            <p className="text-gray-600">Enter your address details for AI-powered validation</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="street" className="text-sm font-semibold text-gray-700">Street Address</Label>
                  <Input
                    id="street"
                    placeholder="Enter street address"
                    {...register('street', { required: 'Street address is required' })}
                    className="h-12 border-2 focus:border-purple-300 transition-colors"
                  />
                  {errors.street && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.street.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-semibold text-gray-700">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    {...register('city', { required: 'City is required' })}
                    className="h-12 border-2 focus:border-purple-300 transition-colors"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-semibold text-gray-700">State</Label>
                  <Input
                    id="state"
                    placeholder="Enter state"
                    {...register('state', { required: 'State is required' })}
                    className="h-12 border-2 focus:border-purple-300 transition-colors"
                  />
                  {errors.state && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-sm font-semibold text-gray-700">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="Enter postal code"
                    {...register('postalCode')}
                    className="h-12 border-2 focus:border-purple-300 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="landmark" className="text-sm font-semibold text-gray-700">Landmark (Optional)</Label>
                <Textarea
                  id="landmark"
                  placeholder="Any nearby landmarks or additional details"
                  {...register('landmark')}
                  className="border-2 focus:border-purple-300 transition-colors"
                />
              </div>

              {/* AI Validation Status */}
              {isValidating && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-600 border-t-transparent"></div>
                    <span className="font-medium text-purple-900">AI is validating your address...</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              )}

              {aiValidation && (
                <div className={`p-6 rounded-xl border-2 ${aiValidation.status === 'validated' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    {aiValidation.status === 'validated' ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {aiValidation.status === 'validated' ? 'Address Validated' : 'Issues Detected'}
                      </h4>
                      <p className="text-sm text-gray-600">Confidence: {aiValidation.confidence}%</p>
                    </div>
                  </div>
                  
                  {aiValidation.issues.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-800 mb-2">Issues found:</h5>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {aiValidation.issues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">AI Suggestions:</h5>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {aiValidation.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                disabled={isValidating}
              >
                {isValidating ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    AI Validating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Validate with AI
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Upload className="h-6 w-6 text-white" />
              </div>
              Smart Document Upload
              <Brain className="h-5 w-5 text-purple-500" />
            </CardTitle>
            <p className="text-gray-600">Upload documents for AI-powered analysis and validation</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="border-3 border-dashed border-purple-300 rounded-2xl p-8 bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                    <FileText className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Supporting Documents</h3>
                  <p className="text-gray-600">
                    AI will automatically analyze and validate your documents
                  </p>
                </div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3">
                    <Camera className="mr-2 h-5 w-5" />
                    Choose Files
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Uploaded Files:
                </h4>
                <div className="grid gap-3">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white border-2 border-gray-200 p-4 rounded-xl hover:border-purple-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-purple-600" />
                        <div>
                          <span className="font-medium">{file.name}</span>
                          <div className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          AI Verified
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI Document Analysis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Automatic text extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Address matching validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Document authenticity check</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Fraud detection analysis</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Required Documents:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Government-issued ID (National ID, Driver's License, Passport)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Proof of address (Utility Bill, Bank Statement, Lease Agreement)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Additional supporting documents (if applicable)
                </li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back to Address
              </Button>
              <Button 
                onClick={submitDocuments}
                disabled={files.length === 0 || isValidating}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {isValidating ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Submit for AI Review
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VerifyAddress;
