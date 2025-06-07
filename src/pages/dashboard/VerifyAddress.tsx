
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Upload, FileText, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddressFormData {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  landmark?: string;
}

const VerifyAddress = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormData>();

  const onSubmit = async (data: AddressFormData) => {
    // TODO: API call to submit address verification
    console.log('Address verification submitted:', data);
    setStep(2);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const submitDocuments = async () => {
    // TODO: API call to upload documents
    console.log('Documents uploaded:', files);
    toast({
      title: "Documents uploaded successfully",
      description: "Your verification request has been submitted for review.",
    });
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="text-center pt-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your address verification request has been submitted successfully. 
              You'll receive updates via email and in your dashboard.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                <strong>Reference ID:</strong> VER-2024-001234
              </p>
              <p className="text-sm text-gray-600">
                <strong>Expected completion:</strong> 2-3 business days
              </p>
            </div>
            <Button onClick={() => window.location.href = '/dashboard/history'}>
              View Verification History
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Address Verification</h1>
        <p className="text-gray-600">Verify your address with supporting documents</p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className={`flex items-center ${step >= 1 ? 'text-bold-red' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-bold-red text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <span className="ml-2 text-sm font-medium">Address Details</span>
        </div>
        <div className={`w-16 h-1 ${step >= 2 ? 'bg-bold-red' : 'bg-gray-200'}`} />
        <div className={`flex items-center ${step >= 2 ? 'text-bold-red' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-bold-red text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <span className="ml-2 text-sm font-medium">Upload Documents</span>
        </div>
        <div className={`w-16 h-1 ${step >= 3 ? 'bg-bold-red' : 'bg-gray-200'}`} />
        <div className={`flex items-center ${step >= 3 ? 'text-bold-red' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-bold-red text-white' : 'bg-gray-200'}`}>
            3
          </div>
          <span className="ml-2 text-sm font-medium">Review</span>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    placeholder="Enter street address"
                    {...register('street', { required: 'Street address is required' })}
                  />
                  {errors.street && (
                    <p className="text-sm text-red-500">{errors.street.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    {...register('city', { required: 'City is required' })}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="Enter state"
                    {...register('state', { required: 'State is required' })}
                  />
                  {errors.state && (
                    <p className="text-sm text-red-500">{errors.state.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="Enter postal code"
                    {...register('postalCode')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="landmark">Landmark (Optional)</Label>
                <Textarea
                  id="landmark"
                  placeholder="Any nearby landmarks or additional details"
                  {...register('landmark')}
                />
              </div>

              <Button type="submit" className="w-full">
                Continue to Document Upload
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Upload Supporting Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload documents
                    </span>
                    <span className="mt-1 block text-sm text-gray-500">
                      ID Card, Utility Bill, or other proof of address
                    </span>
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
                <Button variant="outline" className="mt-4">
                  Choose Files
                </Button>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Uploaded Files:</h4>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-medium">Required Documents:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Government-issued ID (National ID, Driver's License, Passport)</li>
                <li>• Proof of address (Utility Bill, Bank Statement, Lease Agreement)</li>
                <li>• Additional supporting documents (if applicable)</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={submitDocuments}
                disabled={files.length === 0}
                className="flex-1"
              >
                Submit Verification Request
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VerifyAddress;
