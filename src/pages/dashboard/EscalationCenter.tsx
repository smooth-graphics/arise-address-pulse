import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Clock, CheckCircle, XCircle, Search, Filter } from "lucide-react";
import EscalationModal from "@/components/verification/EscalationModal";

interface EscalatedCase {
  id: string;
  address: string;
  requester: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  createdAt: string;
  assignedTo?: string;
}

const mockEscalatedCases: EscalatedCase[] = [
  {
    id: "ESC-001",
    address: "123 Complex Address Lane, Downtown District",
    requester: "John Smith",
    reason: "Address validation failed - property exists but not in database",
    priority: "high",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "ESC-002", 
    address: "456 New Development St, Suburb Area",
    requester: "Sarah Johnson",
    reason: "Conflicting address information from multiple sources",
    priority: "medium",
    status: "in-progress",
    createdAt: "2024-01-14T14:20:00Z",
    assignedTo: "Admin User",
  },
  {
    id: "ESC-003",
    address: "789 Rural Route Road, County District",
    requester: "Mike Wilson",
    reason: "GPS coordinates don't match postal address",
    priority: "low",
    status: "resolved",
    createdAt: "2024-01-13T09:15:00Z",
    assignedTo: "Admin User",
  },
];

const EscalationCenter = () => {
  const [cases, setCases] = useState(mockEscalatedCases);
  const [selectedCase, setSelectedCase] = useState<EscalatedCase | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <AlertTriangle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCaseAction = (caseId: string, action: string) => {
    setCases(prevCases =>
      prevCases.map(case_ =>
        case_.id === caseId
          ? { ...case_, status: action as any, assignedTo: action === 'in-progress' ? 'Admin User' : case_.assignedTo }
          : case_
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Escalation Center</h1>
        <p className="text-gray-600">Manage and resolve escalated address verification cases</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search by address, requester, or case ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <Card>
        <CardHeader>
          <CardTitle>Escalated Cases ({filteredCases.length})</CardTitle>
          <CardDescription>Review and manage cases that require manual intervention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCases.map((case_) => (
              <div
                key={case_.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">{case_.id}</span>
                      <Badge className={getPriorityColor(case_.priority)}>
                        {case_.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(case_.status)}>
                        {getStatusIcon(case_.status)}
                        <span className="ml-1 capitalize">{case_.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{case_.address}</h3>
                    <p className="text-sm text-gray-600 mb-2">Requested by: {case_.requester}</p>
                    <p className="text-sm text-gray-700 mb-2">{case_.reason}</p>
                    <div className="text-xs text-gray-500">
                      Created: {new Date(case_.createdAt).toLocaleDateString()}
                      {case_.assignedTo && ` • Assigned to: ${case_.assignedTo}`}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {case_.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => handleCaseAction(case_.id, 'in-progress')}
                      >
                        Take Case
                      </Button>
                    )}
                    {case_.status === 'in-progress' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCaseAction(case_.id, 'resolved')}
                        >
                          Mark Resolved
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCaseAction(case_.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedCase(case_);
                        setModalOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredCases.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No escalated cases found matching your filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Escalation Modal */}
      {selectedCase && (
        <EscalationModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedCase(null);
          }}
          verificationId={selectedCase.id}
          currentStatus={selectedCase.status}
        />
      )}
    </div>
  );
};

export default EscalationCenter;