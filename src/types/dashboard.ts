
export interface VerificationRequest {
  id: string;
  address: string;
  status: 'pending' | 'verified' | 'rejected' | 'needs_more_info';
  submittedAt: string;
  verifiedAt?: string;
  matchScore?: number;
  documents: VerificationDocument[];
}

export interface VerificationDocument {
  id: string;
  type: 'id_card' | 'utility_bill' | 'cac_document' | 'lease_agreement' | 'bank_statement';
  fileName: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface OrganizationProfile {
  id: string;
  name: string;
  cacNumber: string;
  tinNumber: string;
  address: string;
  industry: string;
  contactEmail: string;
  contactPhone: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface BulkUpload {
  id: string;
  fileName: string;
  totalRecords: number;
  processedRecords: number;
  successfulRecords: number;
  failedRecords: number;
  status: 'processing' | 'completed' | 'failed';
  uploadedAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
}

export interface ApiUsageStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  requestsThisMonth: number;
  dailyUsage: Array<{
    date: string;
    requests: number;
  }>;
}

export interface VerificationMatch {
  id: string;
  fullName: string;
  address: string;
  confidenceScore: number; // 0-100
  matchType: 'exact' | 'high' | 'medium' | 'low';
  verificationId?: string;
  phoneNumber?: string;
  email?: string;
  nin?: string; // National Identification Number
  dateOfBirth?: string;
  gender?: string;
  additionalInfo?: {
    alternateAddresses?: string[];
    knownAliases?: string[];
    verificationDate?: string;
    dataSource?: string;
  };
}

export interface VerificationSearchResult {
  query: {
    fullName: string;
    fullAddress: string;
  };
  matches: VerificationMatch[];
  totalMatches: number;
  searchedAt: string;
}

export interface MemberUsageLimit {
  userId: string;
  allocatedUnits: number;
  usedUnits: number;
  remainingUnits: number;
  resetDate?: string;
  warningThreshold: number; // percentage (e.g., 80)
  criticalThreshold: number; // percentage (e.g., 95)
}

export interface UsageLimitNotification {
  id: string;
  userId: string;
  type: 'warning' | 'critical' | 'depleted';
  message: string;
  threshold: number;
  createdAt: string;
  isRead: boolean;
}
