import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dateAdded: string;
  status: "active" | "inactive";
  allocatedUnits?: number;
  usedUnits?: number;
  remainingUnits?: number;
}

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember;
  onUpdate: (memberId: string, updates: Partial<TeamMember>) => void;
}

export function EditMemberModal({ isOpen, onClose, member, onUpdate }: EditMemberModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: member.name,
    email: member.email,
    allocatedUnits: member.allocatedUnits || 0,
    status: member.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onUpdate(member.id, {
      name: formData.name,
      email: formData.email,
      allocatedUnits: formData.allocatedUnits,
      status: formData.status,
    });

    toast({
      title: 'Member Updated',
      description: `${formData.name}'s details have been updated successfully.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
          <DialogDescription>
            Update member details and permissions
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allocatedUnits">Allocated Units</Label>
            <Input
              id="allocatedUnits"
              type="number"
              min="0"
              value={formData.allocatedUnits}
              onChange={(e) => setFormData({ ...formData, allocatedUnits: parseInt(e.target.value) || 0 })}
              placeholder="Enter allocated units"
              required
            />
            <p className="text-xs text-muted-foreground">
              Currently used: {member.usedUnits || 0} units
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'active' | 'inactive') =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
