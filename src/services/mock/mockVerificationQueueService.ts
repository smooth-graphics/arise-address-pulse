import {
  QueueItem,
  QueueFilters,
  QueueStats,
  ProcessQueueItemRequest,
  AssignReviewerRequest
} from '@/types/verificationQueue';

class MockVerificationQueueService {
  private delay = (ms: number = 600) => new Promise(resolve => setTimeout(resolve, ms));

  private mockQueueItems: QueueItem[] = [
    {
      id: '1',
      verificationId: 'VER-2024-001',
      submittedBy: {
        id: 'user-1',
        name: 'Adebayo Johnson',
        email: 'adebayo.johnson@example.com'
      },
      address: '15 Adeniyi Jones Avenue, Ikeja, Lagos',
      fullName: 'Adebayo Johnson',
      phoneNumber: '+234 803 456 7890',
      priority: 'urgent',
      status: 'pending',
      submittedAt: '2024-03-10T09:00:00Z',
      slaDeadline: '2024-03-10T21:00:00Z',
      documents: [
        {
          id: 'doc-1',
          type: 'id_card',
          fileName: 'national_id.pdf',
          fileUrl: '/mock/doc1.pdf',
          uploadedAt: '2024-03-10T09:00:00Z',
          status: 'pending'
        },
        {
          id: 'doc-2',
          type: 'utility_bill',
          fileName: 'electricity_bill.pdf',
          fileUrl: '/mock/doc2.pdf',
          uploadedAt: '2024-03-10T09:00:00Z',
          status: 'pending'
        }
      ],
      notes: 'Urgent verification required for loan application'
    },
    {
      id: '2',
      verificationId: 'VER-2024-002',
      submittedBy: {
        id: 'user-2',
        name: 'Chioma Okafor',
        email: 'chioma.okafor@techcorp.ng'
      },
      address: '42 Adeola Odeku Street, Victoria Island, Lagos',
      fullName: 'Emeka Nwosu',
      phoneNumber: '+234 901 234 5678',
      priority: 'high',
      status: 'under_review',
      submittedAt: '2024-03-09T14:30:00Z',
      slaDeadline: '2024-03-11T14:30:00Z',
      assignedTo: {
        id: 'agent-1',
        name: 'Ibrahim Mohammed'
      },
      documents: [
        {
          id: 'doc-3',
          type: 'id_card',
          fileName: 'drivers_license.pdf',
          fileUrl: '/mock/doc3.pdf',
          uploadedAt: '2024-03-09T14:30:00Z',
          status: 'approved'
        }
      ]
    },
    {
      id: '3',
      verificationId: 'VER-2024-003',
      submittedBy: {
        id: 'user-3',
        name: 'Ngozi Eze',
        email: 'ngozi.eze@example.com'
      },
      address: '8 Allen Avenue, Ikeja, Lagos',
      fullName: 'Ngozi Eze',
      phoneNumber: '+234 807 890 1234',
      priority: 'normal',
      status: 'escalated',
      submittedAt: '2024-03-08T10:00:00Z',
      slaDeadline: '2024-03-12T10:00:00Z',
      escalationReason: 'Document authenticity requires additional verification',
      documents: [
        {
          id: 'doc-4',
          type: 'bank_statement',
          fileName: 'bank_statement.pdf',
          fileUrl: '/mock/doc4.pdf',
          uploadedAt: '2024-03-08T10:00:00Z',
          status: 'pending'
        }
      ]
    }
  ];

  async getQueueItems(filters?: QueueFilters): Promise<{
    items: QueueItem[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await this.delay();

    let filtered = [...this.mockQueueItems];

    if (filters?.priority) {
      filtered = filtered.filter(item => item.priority === filters.priority);
    }

    if (filters?.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.fullName.toLowerCase().includes(search) ||
        item.address.toLowerCase().includes(search) ||
        item.verificationId.toLowerCase().includes(search)
      );
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      items: filtered.slice(start, end),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit)
    };
  }

  async getQueueStats(): Promise<QueueStats> {
    await this.delay(300);

    return {
      totalPending: this.mockQueueItems.filter(item => item.status === 'pending').length,
      underReview: this.mockQueueItems.filter(item => item.status === 'under_review').length,
      escalated: this.mockQueueItems.filter(item => item.status === 'escalated').length,
      breachingSLA: 2,
      avgProcessingTime: '3.5 hours'
    };
  }

  async getQueueItem(itemId: string): Promise<QueueItem> {
    await this.delay();

    const item = this.mockQueueItems.find(i => i.id === itemId);
    if (!item) {
      throw new Error('Queue item not found');
    }

    return item;
  }

  async processItem(request: ProcessQueueItemRequest): Promise<QueueItem> {
    await this.delay(800);

    const item = this.mockQueueItems.find(i => i.id === request.itemId);
    if (!item) {
      throw new Error('Queue item not found');
    }

    if (request.decision === 'approve') {
      item.status = 'approved';
    } else if (request.decision === 'reject') {
      item.status = 'rejected';
    }

    item.notes = request.notes;

    return item;
  }

  async assignReviewer(request: AssignReviewerRequest): Promise<QueueItem> {
    await this.delay(500);

    const item = this.mockQueueItems.find(i => i.id === request.itemId);
    if (!item) {
      throw new Error('Queue item not found');
    }

    item.assignedTo = {
      id: request.reviewerId,
      name: 'Assigned Reviewer'
    };
    item.status = 'under_review';

    return item;
  }
}

export const mockVerificationQueueService = new MockVerificationQueueService();
