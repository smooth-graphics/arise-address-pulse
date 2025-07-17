
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Clock, User, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  verificationId: string;
  currentStatus: string;
}

const EscalationModal: React.FC<EscalationModalProps> = ({ 
  isOpen, 
  onClose, 
  verificationId, 
  currentStatus 
}) => {
  const [escalationType, setEscalationType] = useState('technical');
  const [priority, setPriority] = useState('medium');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const { toast } = useToast();

  const handleEscalate = () => {
    console.log('Escalating verification:', {
      verificationId,
      type: escalationType,
      priority,
      description,
      assignedTo
    });

    toast({
      title: "Verification Escalated",
      description: `Case #${verificationId} has been escalated to the ${escalationType} team.`,
    });

    onClose();
  };

  const escalationTypes = [
    { value: 'technical', label: 'Technical Issue', icon: FileText },
    { value: 'quality', label: 'Quality Assurance', icon: AlertTriangle },
    { value: 'manual', label: 'Manual Review', icon: User },
    { value: 'fraud', label: 'Fraud Detection', icon: AlertTriangle },
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'critical', label: 'Critical', color: 'bg-red-500' },
  ];

  const teamMembers = [
    'Technical Support Team',
    'Quality Assurance Team',
    'Senior Verification Specialist',
    'Fraud Detection Team'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Escalate Verification
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Case Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Case ID:</span>
              <span className="text-sm">{verificationId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Current Status:</span>
              <Badge variant="secondary">{currentStatus}</Badge>
            </div>
          </div>

          {/* Escalation Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Escalation Type</Label>
            <RadioGroup 
              value={escalationType} 
              onValueChange={setEscalationType}
              className="space-y-2"
            >
              {escalationTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Label htmlFor={type.value} className="flex items-center gap-2 cursor-pointer">
                    <type.icon className="h-4 w-4" />
                    {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Priority Level */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Priority Level</Label>
            <RadioGroup 
              value={priority} 
              onValueChange={setPriority}
              className="flex gap-2"
            >
              {priorityLevels.map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.value} id={level.value} />
                  <Label htmlFor={level.value} className="flex items-center gap-2 cursor-pointer">
                    <div className={`w-3 h-3 rounded-full ${level.color}`} />
                    {level.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the issue or reason for escalation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Assignment */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Assign To</Label>
            <RadioGroup value={assignedTo} onValueChange={setAssignedTo}>
              {teamMembers.map((member) => (
                <div key={member} className="flex items-center space-x-2">
                  <RadioGroupItem value={member} id={member} />
                  <Label htmlFor={member} className="cursor-pointer text-sm">
                    {member}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleEscalate} 
              className="flex-1"
              disabled={!description.trim() || !assignedTo}
            >
              <Clock className="h-4 w-4 mr-2" />
              Escalate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EscalationModal;
