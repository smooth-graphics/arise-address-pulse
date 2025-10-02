import { 
  AddressVerificationRequest, 
  BulkVerificationRequest,
  BulkVerificationStatus,
  VerificationHistory,
  VerificationStats 
} from '../verificationService';
import { VerificationRequest, VerificationDocument } from '@/types/dashboard';

const NIGERIAN_ADDRESSES = [
  '15 Awolowo Road, Ikoyi, Lagos',
  '23 Adeola Odeku Street, Victoria Island, Lagos',
  '8 Ibrahim Babangida Way, Maitama, Abuja',
  '45 Admiralty Way, Lekki Phase 1, Lagos',
  '12 GRA, Port Harcourt, Rivers State',
];

const DOCUMENT_TYPES = ['id_card', 'utility_bill', 'cac_document', 'lease_agreement', 'bank_statement'] as const;

class MockVerificationService {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  private verifications: VerificationRequest[] = this.generateMockVerifications();

  private generateMockVerifications(): VerificationRequest[] {
    return Array.from({ length: 50 }, (_, i) => {
      const addr = NIGERIAN_ADDRESSES[i % NIGERIAN_ADDRESSES.length];
      const statuses = ['pending', 'verified', 'rejected', 'needs_more_info'] as const;
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const submittedDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      
      return {
        id: `ver-${String(i + 1).padStart(6, '0')}`,
        address: `${Math.floor(Math.random() * 100)} ${addr}`,
        status: randomStatus,
        submittedAt: submittedDate.toISOString(),
        verifiedAt: randomStatus === 'verified' 
          ? new Date(submittedDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
        matchScore: randomStatus === 'verified' ? 85 + Math.floor(Math.random() * 15) : undefined,
        documents: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, di) => ({
          id: `doc-${i}-${di}`,
          type: DOCUMENT_TYPES[Math.floor(Math.random() * DOCUMENT_TYPES.length)],
          fileName: `document_${i}_${di}.pdf`,
          uploadedAt: submittedDate.toISOString(),
          status: randomStatus === 'verified' ? 'approved' : randomStatus === 'rejected' ? 'rejected' : 'pending',
        })),
      };
    });
  }

  async verifyAddress(data: AddressVerificationRequest): Promise<VerificationRequest> {
    await this.delay(1500);

    const addr = NIGERIAN_ADDRESSES[Math.floor(Math.random() * NIGERIAN_ADDRESSES.length)];
    const randomStatus = Math.random() > 0.2 ? 'verified' : 'pending';
    const submittedDate = new Date();
    
    const verification: VerificationRequest = {
      id: `ver-${Date.now()}`,
      address: data.address,
      status: randomStatus as any,
      submittedAt: submittedDate.toISOString(),
      verifiedAt: randomStatus === 'verified' ? new Date().toISOString() : undefined,
      matchScore: randomStatus === 'verified' ? 85 + Math.floor(Math.random() * 15) : undefined,
      documents: data.documents ? data.documents.map((file, i) => ({
        id: `doc-${Date.now()}-${i}`,
        type: 'utility_bill' as const,
        fileName: file.name,
        uploadedAt: submittedDate.toISOString(),
        status: 'pending' as const,
      })) : [],
    };

    this.verifications.unshift(verification);
    return verification;
  }

  async bulkVerification(data: BulkVerificationRequest): Promise<BulkVerificationStatus> {
    await this.delay(1200);

    return {
      id: `bulk-${Date.now()}`,
      fileName: data.file.name,
      batchName: data.batchName,
      status: 'processing',
      totalRecords: 100,
      processedRecords: 0,
      successfulRecords: 0,
      failedRecords: 0,
      uploadedAt: new Date().toISOString(),
    };
  }

  async getVerificationHistory(params?: any): Promise<VerificationHistory> {
    await this.delay(600);

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    let filtered = [...this.verifications];
    
    if (params?.status) {
      filtered = filtered.filter(v => v.status === params.status);
    }

    return {
      verifications: filtered.slice(start, end),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    };
  }

  async getVerification(verificationId: string): Promise<VerificationRequest> {
    await this.delay(400);

    const verification = this.verifications.find(v => v.id === verificationId);
    if (!verification) {
      throw new Error('Verification not found');
    }

    return verification;
  }

  async getBulkVerifications(params?: any): Promise<any> {
    await this.delay(600);

    const bulkUploads = Array.from({ length: 5 }, (_, i) => ({
      id: `bulk-${String(i + 1).padStart(6, '0')}`,
      fileName: `addresses_batch_${i + 1}.csv`,
      batchName: `Batch ${i + 1}`,
      status: i === 0 ? 'processing' : 'completed',
      totalRecords: 100 + i * 50,
      processedRecords: i === 0 ? 45 : 100 + i * 50,
      successfulRecords: i === 0 ? 40 : 92 + i * 45,
      failedRecords: i === 0 ? 5 : 8 + i * 5,
      uploadedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: i === 0 ? undefined : new Date(Date.now() - i * 23 * 60 * 60 * 1000).toISOString(),
    }));

    return {
      bulkUploads,
      total: bulkUploads.length,
      page: 1,
      totalPages: 1,
    };
  }

  async getBulkVerificationStatus(bulkId: string): Promise<BulkVerificationStatus> {
    await this.delay(400);

    return {
      id: bulkId,
      fileName: 'addresses_batch.csv',
      batchName: 'Main Batch',
      status: 'completed',
      totalRecords: 100,
      processedRecords: 100,
      successfulRecords: 92,
      failedRecords: 8,
      uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    };
  }

  async downloadBulkResults(bulkId: string): Promise<Blob> {
    await this.delay(800);

    const csvContent = 'Address,Status,Match Score\n' +
      'Sample Address 1,Verified,95\n' +
      'Sample Address 2,Verified,88\n';
    
    return new Blob([csvContent], { type: 'text/csv' });
  }

  async getVerificationStats(): Promise<VerificationStats> {
    await this.delay(500);

    return {
      totalVerifications: 1247,
      successfulVerifications: 1089,
      pendingVerifications: 42,
      rejectedVerifications: 116,
      monthlyVerifications: [
        { month: 'Jan', count: 387 },
        { month: 'Feb', count: 425 },
        { month: 'Mar', count: 435 },
      ],
    };
  }

  async updateVerificationStatus(
    verificationId: string,
    status: 'verified' | 'rejected' | 'needs_more_info',
    notes?: string
  ): Promise<VerificationRequest> {
    await this.delay(600);

    const verification = this.verifications.find(v => v.id === verificationId);
    if (!verification) {
      throw new Error('Verification not found');
    }

    verification.status = status;
    if (status === 'verified') {
      verification.verifiedAt = new Date().toISOString();
      verification.matchScore = 90;
    }

    return verification;
  }

  async uploadAdditionalDocuments(
    verificationId: string,
    documents: File[]
  ): Promise<VerificationDocument[]> {
    await this.delay(1000);

    return documents.map((doc, i) => ({
      id: `doc-${Date.now()}-${i}`,
      type: 'utility_bill' as const,
      fileName: doc.name,
      uploadedAt: new Date().toISOString(),
      status: 'pending' as const,
    }));
  }
}

export const mockVerificationService = new MockVerificationService();
