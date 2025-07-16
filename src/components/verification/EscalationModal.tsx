
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Send, 
  CheckCircle,
  Clock,
  User,
  MapPin
} from 'lucide-react';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lookupData?: {
    id: string;
    originalQuery: string;
    verifiedAddress: string;
    confidenceScore: number;
    status: string;
  };
}

const EscalationModal: React.FC<EscalationModalProps> = ({ 
  isOpen, 
  onClose, 
  lookupData 
}) => {
  const [reason, setReason] = useState('');
  const [category, setCategory] = useState<string>('accuracy');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { id: 'accuracy', label: 'Accuracy Issue', icon: AlertTriangle, color: 'bg-red-100 text-red-800' },
    { id: 'incomplete', label: 'Incomplete Data', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'duplicate', label: 'Duplicate Result', icon: User, color: 'bg-blue-100 text-blue-800' },
    { id: 'location', label: 'Location Mismatch', icon: MapPin, color: 'bg-purple-100 text-purple-800' },
    { id: 'other', label: 'Other Issue', icon: AlertTriangle, color: 'bg-gray-100 text-gray-800' }
  ];

  const handleSubmit = async () => {
    if (!reason.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Auto-close after success message
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setReason('');
        setCategory('accuracy');
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setIsSubmitted(false);
      setReason('');
      setCategory('accuracy');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Escalate Verification Issue
          </DialogTitle>
        </DialogHeader>

        {!isSubmitted ? (
          <div className="space-y-6">
            {/* Lookup Summary */}
            {lookupData && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium text-gray-900">Lookup Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Original Query:</span> {lookupData.originalQuery}</p>
                  <p><span className="font-medium">Verified Address:</span> {lookupData.verifiedAddress}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Confidence Score:</span>
                    <Badge variant="outline">{lookupData.confidenceScore}%</Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Issue Category */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Issue Category</h4>
              <div className="grid grid-cols-1 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                      category === cat.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <cat.icon className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-900">{cat.label}</span>
                    {category === cat.id && (
                      <CheckCircle className="h-4 w-4 text-blue-600 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason Description */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">
                Describe the Issue <span className="text-red-500">*</span>
              </h4>
              <Textarea
                placeholder="Please provide detailed information about the verification issue..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-gray-500">
                Provide specific details to help our team investigate and resolve the issue.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Escalation Submitted</h3>
              <p className="text-gray-600">
                Your issue has been submitted to our verification team. 
                You'll receive an update within 24 hours.
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Ticket ID: ESC-{Date.now().toString().slice(-6)}
            </Badge>
          </div>
        )}

        {!isSubmitted && (
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!reason.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Escalation
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EscalationModal;
