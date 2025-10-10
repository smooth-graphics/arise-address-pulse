import { useState } from "react";
import {
  Search,
  ListFilter,
  Send,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { EditMemberModal } from '@/components/team/EditMemberModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Steve Johnson",
    email: "stevieson239@gmail.com",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/0daf656e2958fd63d7fc63ce08fb48fed8267ae4?width=80",
    dateAdded: "24/07/2025 - 09:41 AM",
    status: "active",
    allocatedUnits: 100,
    usedUnits: 45,
    remainingUnits: 55,
  },
  {
    id: "2",
    name: "Olamide Coker",
    email: "cokerhola@gmail.com",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/80c63fcf970df44a3b4a227466aeb2d918d268af?width=80",
    dateAdded: "24/07/2025 - 09:41 AM",
    status: "active",
    allocatedUnits: 150,
    usedUnits: 120,
    remainingUnits: 30,
  },
  {
    id: "3",
    name: "Lisa Kay",
    email: "kayalisaaa@gmail.com",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/7616138e88321fa9e95fe33d079a5138acb44f42?width=80",
    dateAdded: "24/07/2025 - 09:41 AM",
    status: "active",
    allocatedUnits: 200,
    usedUnits: 25,
    remainingUnits: 175,
  },
];

export default function TeamManagement() {
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteType, setInviteType] = useState<"single" | "bulk">("single");
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendInvite = () => {
    if (!inviteEmail.trim()) return;

    const emails = inviteEmail.split(',').map(e => e.trim()).filter(e => e);
    
    if (emails.some(email => !email.includes('@'))) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter valid email addresses.',
        variant: 'destructive',
      });
      return;
    }

    // Mock sending invites
    toast({
      title: 'Invitations Sent',
      description: `Successfully sent ${emails.length} invitation${emails.length > 1 ? 's' : ''}.`,
    });
    
    setInviteEmail("");
    setShowInviteModal(false);
  };

  const handleEditMember = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (member) {
      setEditingMember(member);
    }
  };

  const handleUpdateMember = (memberId: string, updates: Partial<TeamMember>) => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === memberId ? { ...member, ...updates } : member
      )
    );
  };

  const handleDeleteMember = (memberId: string) => {
    setDeletingMemberId(memberId);
  };

  const confirmDeleteMember = () => {
    if (!deletingMemberId) return;

    setMembers(prevMembers => prevMembers.filter(m => m.id !== deletingMemberId));
    
    toast({
      title: 'Member Removed',
      description: 'The team member has been removed successfully.',
    });
    
    setDeletingMemberId(null);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4 border-b border-black/5 bg-white">
        <h1 className="text-xl font-semibold text-foreground">Team Management</h1>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 p-4 space-y-6">

      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-6">
        {/* Search */}
        <div className="flex items-center gap-2 w-[465px] h-9 px-3 bg-white border border-gray-400 rounded-lg">
          <Search className="w-6 h-6 text-gray-600" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm text-gray-600 placeholder:text-gray-600 border-none outline-none bg-transparent"
          />
        </div>

        {/* Filter and Invite */}
        <div className="flex items-start gap-2">
          {/* Filter Button */}
          <button className="flex items-center gap-2 h-9 px-3 bg-white border border-gray-400 rounded-lg text-sm text-gray-600">
            <ListFilter className="w-4 h-4" />
            <span>Filter</span>
          </button>

          {/* Invite Button */}
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-1.5 h-9 px-3 bg-white border border-orange-500 text-orange-500 rounded-lg text-sm font-medium shadow-orange-500/25 shadow-md"
          >
            <span>Invite new member</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 mx-4 mb-6">
        <div className="bg-white rounded-t-2xl overflow-hidden border border-gray-300">
          {/* Table Header */}
          <div className="flex items-center bg-gray-300 h-9">
            <div className="flex items-center gap-2 px-3 h-full">
              <div className="w-4 h-4 border border-gray-500 rounded-md"></div>
            </div>
            <div className="flex-1 flex items-center px-3 h-full">
              <span className="text-xs font-medium text-gray-950">Name</span>
            </div>
            <div className="w-[200px] flex items-center px-3 h-full">
              <span className="text-xs font-medium text-gray-950">Date added</span>
            </div>
            <div className="w-[150px] flex items-center px-3 h-full">
              <span className="text-xs font-medium text-gray-950">Units</span>
            </div>
            <div className="w-[120px] flex items-center px-3 h-full">
              <span className="text-xs font-medium text-gray-950">Status</span>
            </div>
            <div className="w-[120px] flex items-center justify-end px-3 h-full">
              <span className="text-xs font-medium text-gray-950">Actions</span>
            </div>
          </div>

            {/* Table Rows */}
            <div className="flex-1 divide-y divide-black/10 overflow-y-auto">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center bg-white pt-2 h-16">
                <div className="flex items-center gap-2 px-3 h-full">
                  <div className="w-4 h-4 border border-gray-500 rounded-md"></div>
                </div>
                <div className="flex-1 flex items-center gap-2 px-3 h-full">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col justify-center gap-0.5">
                    <div className="text-sm font-normal text-black leading-5">
                      {member.name}
                    </div>
                    <div className="text-xs font-normal text-gray-600 leading-4.5">
                      {member.email}
                    </div>
                  </div>
                </div>
                <div className="w-[200px] flex items-center px-3 h-full">
                  <div className="text-sm font-normal text-black leading-5 truncate">
                    {member.dateAdded}
                  </div>
                </div>
                <div className="w-[150px] flex items-center px-3 h-full">
                  <div className="text-sm font-normal text-black">
                    {member.remainingUnits}/{member.allocatedUnits}
                  </div>
                </div>
                <div className="w-[120px] flex items-center px-3 h-full">
                  <div className="flex items-center justify-center gap-2 px-2 py-0.5 rounded-full border-0.5 border-green-500 bg-green-50">
                    <span className="text-xs font-medium text-green-600 leading-4.5">
                      Active
                    </span>
                  </div>
                </div>
                <div className="w-[120px] flex items-center justify-end gap-3 px-3 h-full">
                  <button 
                    onClick={() => handleEditMember(member.id)}
                    className="text-gray-800 hover:text-orange-500 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-gray-800 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* Pagination */}
        <div className="flex items-center justify-between flex-shrink-0 h-12">
        <div className="text-sm font-normal text-gray-900">
          Showing 1 - 3 of 3 items
        </div>
        <div className="flex items-center border border-gray-400 rounded-lg bg-white">
          <button className="flex items-center gap-2 h-8 px-3 text-sm text-gray-600">
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <div className="w-px h-8 bg-gray-400"></div>
          <div className="flex items-center justify-center w-8 h-8 text-sm text-gray-800">
            1
          </div>
          <div className="w-px h-8 bg-gray-400"></div>
          <button className="flex items-center gap-2 h-8 px-3 text-sm text-gray-600">
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-80 bg-white rounded-xl border border-black/5 shadow-sm">
            {/* Modal Header */}
            <div className="px-3 pt-4 pb-2">
              <h3 className="text-xs font-medium text-gray-600">
                Invite new member
              </h3>
              <div className="w-full h-px bg-gray-400 mt-3"></div>
            </div>

            {/* Tabs */}
            <div className="px-3 mb-2">
              <div className="flex p-0.5 bg-gray-300 rounded-lg">
                <button
                  onClick={() => setInviteType("single")}
                  className={`flex-1 h-8 px-3 text-sm font-medium rounded-lg transition-colors ${
                    inviteType === "single"
                      ? "bg-white text-gray-600 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  Single Invite
                </button>
                <button
                  onClick={() => setInviteType("bulk")}
                  className={`flex-1 h-8 px-3 text-sm font-medium rounded-lg transition-colors ${
                    inviteType === "bulk"
                      ? "bg-white text-gray-600 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  Bulk Invite
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div className="px-3 mb-6">
              <label className="text-xs font-normal text-gray-600">Email</label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="josephola@gmail.com"
                className="w-full h-9 px-3 mt-1.5 border border-gray-400 rounded-lg text-sm text-gray-600 placeholder:text-gray-600 outline-none focus:border-orange-500"
              />
              <p className="text-xs text-gray-700 mt-1.5 leading-4">
                Enter single email or multiple emails as comma separated values.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-3 pb-3 flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendInvite}
                  className="flex items-center gap-1.5 h-8 px-3 bg-white border border-orange-500 text-orange-500 rounded-lg text-sm font-medium shadow-orange-500/25 shadow-md"
                >
                  <span>Send invite</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="w-full h-px bg-gray-400"></div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <EditMemberModal
          isOpen={!!editingMember}
          onClose={() => setEditingMember(null)}
          member={editingMember}
          onUpdate={handleUpdateMember}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingMemberId} onOpenChange={() => setDeletingMemberId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the member from your team
              and revoke their access to the platform. All their data and usage history will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteMember} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}