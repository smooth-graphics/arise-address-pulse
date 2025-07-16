
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Download, 
  CheckCircle, 
  AlertCircle,
  X,
  ArrowRight,
  BarChart3
} from 'lucide-react';

interface CSVField {
  name: string;
  type: 'name' | 'address' | 'phone' | 'id' | 'ignore';
  required: boolean;
}

interface BulkResult {
  id: string;
  originalData: Record<string, string>;
  verificationResult: {
    status: 'verified' | 'partial' | 'failed';
    confidenceScore: number;
    verifiedAddress?: string;
    matchDetails: {
      streetMatch: number;
      cityMatch: number;
      postalMatch: number;
    };
  };
}

const BulkUploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [csvFields, setCsvFields] = useState<CSVField[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<BulkResult[]>([]);
  const [currentStep, setCurrentStep] = useState<'upload' | 'mapping' | 'processing' | 'results'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === 'text/csv') {
      setFile(uploadedFile);
      // Parse CSV headers (mock implementation)
      const mockHeaders = ['Name', 'Street Address', 'City', 'Phone Number', 'Email'];
      setCsvFields(mockHeaders.map(header => ({
        name: header,
        type: header.toLowerCase().includes('address') ? 'address' : 
              header.toLowerCase().includes('name') ? 'name' :
              header.toLowerCase().includes('phone') ? 'phone' : 'ignore',
        required: header.toLowerCase().includes('address') || header.toLowerCase().includes('name')
      })));
      setCurrentStep('mapping');
    }
  };

  const handleFieldMapping = (index: number, type: CSVField['type']) => {
    const updatedFields = [...csvFields];
    updatedFields[index].type = type;
    setCsvFields(updatedFields);
  };

  const startProcessing = async () => {
    setCurrentStep('processing');
    setIsProcessing(true);
    setProgress(0);

    // Simulate bulk processing
    const totalRecords = 100; // Mock total
    const mockResults: BulkResult[] = [];

    for (let i = 0; i < totalRecords; i++) {
      await new Promise(resolve => setTimeout(resolve, 50)); // Simulate processing time
      
      const mockResult: BulkResult = {
        id: `bulk_${i}`,
        originalData: {
          name: `Person ${i + 1}`,
          address: `${Math.floor(Math.random() * 999) + 1} Sample Street, Lagos`,
          phone: `+234${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        },
        verificationResult: {
          status: Math.random() > 0.8 ? 'failed' : Math.random() > 0.3 ? 'verified' : 'partial',
          confidenceScore: Math.floor(Math.random() * 40) + 60,
          verifiedAddress: `${Math.floor(Math.random() * 999) + 1} Verified Street, Lagos State, Nigeria`,
          matchDetails: {
            streetMatch: Math.floor(Math.random() * 30) + 70,
            cityMatch: Math.floor(Math.random() * 20) + 80,
            postalMatch: Math.floor(Math.random() * 40) + 60
          }
        }
      };

      mockResults.push(mockResult);
      setProgress(((i + 1) / totalRecords) * 100);
    }

    setResults(mockResults);
    setIsProcessing(false);
    setCurrentStep('results');
  };

  const exportResults = (format: 'csv' | 'pdf') => {
    // Mock export functionality
    console.log(`Exporting ${results.length} results as ${format.toUpperCase()}`);
    // In real implementation, this would generate and download the file
  };

  const resetUpload = () => {
    setFile(null);
    setCsvFields([]);
    setResults([]);
    setProgress(0);
    setCurrentStep('upload');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusStats = () => {
    const verified = results.filter(r => r.verificationResult.status === 'verified').length;
    const partial = results.filter(r => r.verificationResult.status === 'partial').length;
    const failed = results.filter(r => r.verificationResult.status === 'failed').length;
    return { verified, partial, failed, total: results.length };
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bulk Address Verification</h2>
        <p className="text-gray-600">Upload CSV files and verify multiple addresses at once</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[
          { step: 'upload', label: 'Upload CSV', icon: Upload },
          { step: 'mapping', label: 'Map Fields', icon: ArrowRight },
          { step: 'processing', label: 'Processing', icon: BarChart3 },
          { step: 'results', label: 'Results', icon: CheckCircle }
        ].map(({ step, label, icon: Icon }, index) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep === step ? 'bg-blue-600 text-white' :
              ['mapping', 'processing', 'results'].indexOf(currentStep) > ['upload', 'mapping', 'processing', 'results'].indexOf(step) - 1
                ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <Icon className="h-4 w-4" />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>
            {index < 3 && <ArrowRight className="h-4 w-4 text-gray-400 mx-4" />}
          </div>
        ))}
      </div>

      {/* Upload Step */}
      {currentStep === 'upload' && (
        <Card>
          <CardHeader>
            <CardTitle>Upload CSV File</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  Choose a CSV file to upload
                </p>
                <p className="text-gray-600">
                  File should contain address data in CSV format (max 10MB)
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="mt-4"
              >
                <Upload className="h-4 w-4 mr-2" />
                Select CSV File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Field Mapping Step */}
      {currentStep === 'mapping' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Map CSV Fields
              <Button variant="outline" onClick={resetUpload} size="sm">
                <X className="h-4 w-4 mr-2" />
                Change File
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <FileText className="h-4 w-4 inline mr-2" />
                File: {file?.name} ({((file?.size || 0) / 1024).toFixed(1)} KB)
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Map your CSV columns to data types:</h4>
              {csvFields.map((field, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{field.name}</span>
                    {field.required && (
                      <Badge variant="outline" className="text-xs">Required</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {['name', 'address', 'phone', 'id', 'ignore'].map((type) => (
                      <Button
                        key={type}
                        variant={field.type === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFieldMapping(index, type as CSVField['type'])}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={startProcessing}
              className="w-full"
              disabled={!csvFields.some(f => f.type === 'address')}
            >
              Start Processing ({csvFields.filter(f => f.type !== 'ignore').length} mapped fields)
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Processing Step */}
      {currentStep === 'processing' && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Bulk Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
              <Progress value={progress} className="h-3" />
              <p className="text-gray-600">
                {isProcessing ? 'Verifying addresses...' : 'Processing complete!'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Step */}
      {currentStep === 'results' && (
        <div className="space-y-6">
          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-sm text-gray-600">Total Processed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
                <p className="text-sm text-gray-600">Verified</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-yellow-600">{stats.partial}</div>
                <p className="text-sm text-gray-600">Partial Match</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                <p className="text-sm text-gray-600">Failed</p>
              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Export Results
                <Button onClick={resetUpload} variant="outline">
                  Process New File
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button onClick={() => exportResults('csv')} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export as CSV
                </Button>
                <Button onClick={() => exportResults('pdf')} variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export as PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Results Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {results.slice(0, 10).map((result, index) => (
                  <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{result.originalData.address}</p>
                      <p className="text-sm text-gray-600">{result.verificationResult.verifiedAddress}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={
                        result.verificationResult.status === 'verified' ? 'bg-green-100 text-green-800' :
                        result.verificationResult.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {result.verificationResult.confidenceScore}%
                      </Badge>
                      {result.verificationResult.status === 'verified' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                  </div>
                ))}
                {results.length > 10 && (
                  <p className="text-center text-gray-500 py-4">
                    ... and {results.length - 10} more results
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BulkUploadPage;
