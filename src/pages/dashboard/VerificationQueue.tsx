import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SearchTable from "@/components/common/SearchTable";
import { useQueueItems, useQueueStats, useProcessQueueItem } from "@/hooks/api/useVerificationQueue";
import { QueueFilters, QueueItem } from "@/types/verificationQueue";
import { Search, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";

const VerificationQueue = () => {
  const [filters, setFilters] = useState<QueueFilters>({ page: 1, limit: 10 });
  const { data, isLoading } = useQueueItems(filters);
  const { data: stats } = useQueueStats();
  const processMutation = useProcessQueueItem();
  
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'normal': return 'outline';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const handleProcess = (decision: 'approve' | 'reject' | 'request_more_info') => {
    if (!selectedItem) return;
    
    processMutation.mutate({
      itemId: selectedItem.id,
      decision,
      notes: reviewNotes,
      reviewerId: 'current-user-id'
    }, {
      onSuccess: () => {
        setSelectedItem(null);
        setReviewNotes("");
      }
    });
  };

  const columns: Array<{
    key: keyof QueueItem;
    label: string;
    render?: (value: any, item: QueueItem) => React.ReactNode;
  }> = [
    { 
      key: 'verificationId', 
      label: 'ID',
      render: (value: any, item: QueueItem) => (
        <span className="font-mono text-sm">{item.verificationId.slice(0, 8)}...</span>
      )
    },
    { 
      key: 'fullName', 
      label: 'Applicant',
      render: (value: any, item: QueueItem) => (
        <div>
          <p className="font-medium">{item.fullName}</p>
          <p className="text-sm text-muted-foreground">{item.submittedBy.email}</p>
        </div>
      )
    },
    { 
      key: 'priority', 
      label: 'Priority',
      render: (value: any, item: QueueItem) => (
        <Badge variant={getPriorityVariant(item.priority)}>
          {item.priority}
        </Badge>
      )
    },
    { 
      key: 'slaDeadline', 
      label: 'SLA',
      render: (value: any, item: QueueItem) => {
        const isOverdue = new Date(item.slaDeadline) < new Date();
        return (
          <div className={isOverdue ? 'text-destructive' : ''}>
            <p className="text-sm font-medium">
              {formatDistanceToNow(new Date(item.slaDeadline), { addSuffix: true })}
            </p>
            {isOverdue && <AlertTriangle className="h-3 w-3 inline ml-1" />}
          </div>
        );
      }
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: any, item: QueueItem) => (
        <Badge variant="outline">{item.status.replace(/_/g, ' ')}</Badge>
      )
    },
    {
      key: 'id',
      label: 'Actions',
      render: (value: any, item: QueueItem) => (
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(item);
          }}
        >
          Review
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Verification Queue</h1>
        <p className="text-muted-foreground">Review and process pending verifications</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPending || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.underReview || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalated</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.escalated || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Breaching SLA</CardTitle>
            <CheckCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.breachingSLA || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Queue Items</CardTitle>
          <CardDescription>Verifications awaiting manual review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                className="pl-8"
              />
            </div>
            <Select 
              value={filters.priority || 'all'} 
              onValueChange={(value) => setFilters({ ...filters, priority: value === 'all' ? undefined : value, page: 1 })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SearchTable
            data={data?.items || []}
            columns={columns}
            pageSize={10}
          />
        </CardContent>
      </Card>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Verification</DialogTitle>
            <DialogDescription>
              Review the verification details and take appropriate action
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Applicant</p>
                  <p className="text-sm text-muted-foreground">{selectedItem.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{selectedItem.submittedBy.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Priority</p>
                  <Badge variant={getPriorityVariant(selectedItem.priority)}>
                    {selectedItem.priority}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">SLA Deadline</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(selectedItem.slaDeadline), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Review Notes</p>
                <Textarea
                  placeholder="Enter your review notes..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelectedItem(null)}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => handleProcess('request_more_info')}>
              Request More Info
            </Button>
            <Button variant="destructive" onClick={() => handleProcess('reject')}>
              Reject
            </Button>
            <Button onClick={() => handleProcess('approve')}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerificationQueue;