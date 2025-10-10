export interface QueueItem {
  id: string;
  verificationId: string;
  submittedBy: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  address: string;
  fullName: string;
  phoneNumber?: string;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  status: 'pending' | 'under_review' | 'escalated' | 'approved' | 'rejected';
  submittedAt: string;
  slaDeadline: string;
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  documents: QueueDocument[];
  notes?: string;
  escalationReason?: string;
}

export interface QueueDocument {
  id: string;
  type: 'id_card' | 'utility_bill' | 'cac_document' | 'lease_agreement' | 'bank_statement' | 'other';
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface QueueFilters {
  priority?: string;
  status?: string;
  assignedTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface QueueStats {
  totalPending: number;
  underReview: number;
  escalated: number;
  breachingSLA: number;
  avgProcessingTime: string;
}

export interface ProcessQueueItemRequest {
  itemId: string;
  decision: 'approve' | 'reject' | 'request_more_info';
  notes: string;
  reviewerId: string;
}

export interface AssignReviewerRequest {
  itemId: string;
  reviewerId: string;
}
