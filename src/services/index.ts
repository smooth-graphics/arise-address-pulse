/**
 * Service Factory
 * 
 * This file exports the appropriate service implementation (real or mock)
 * based on the feature flags configured in src/config/features.ts
 */

import { FEATURES } from '@/config/features';

// Real services
import { authService as realAuthService } from './authService';
import { verificationService as realVerificationService } from './verificationService';
import { walletService as realWalletService } from './walletService';
import { notificationService as realNotificationService } from './notificationService';
import { userService as realUserService } from './userService';
import { userManagementService as realUserManagementService } from './userManagementService';
import { verificationQueueService as realVerificationQueueService } from './verificationQueueService';
import { activityLogService as realActivityLogService } from './activityLogService';
import { apiMonitorService as realApiMonitorService } from './apiMonitorService';
import { apiAccessService as realApiAccessService } from './apiAccessService';
import { pricingManagementService as realPricingManagementService } from './pricingManagementService';

// Mock services
import { mockAuthService } from './mock/mockAuthService';
import { mockVerificationService } from './mock/mockVerificationService';
import { mockWalletService } from './mock/mockWalletService';
import { mockNotificationService } from './mock/mockNotificationService';
import { mockUserService } from './mock/mockUserService';
import { mockUserManagementService } from './mock/mockUserManagementService';
import { mockVerificationQueueService } from './mock/mockVerificationQueueService';
import { mockActivityLogService } from './mock/mockActivityLogService';
import { mockApiMonitorService } from './mock/mockApiMonitorService';
import { mockApiAccessService } from './mock/mockApiAccessService';
import { mockPricingManagementService } from './mock/mockPricingManagementService';

// Export the appropriate service based on feature flags
export const authService = FEATURES.USE_REAL_API ? realAuthService : mockAuthService;
export const verificationService = FEATURES.USE_REAL_API ? realVerificationService : mockVerificationService;
export const walletService = FEATURES.USE_REAL_API ? realWalletService : mockWalletService;
export const notificationService = FEATURES.USE_REAL_API ? realNotificationService : mockNotificationService;
export const userService = FEATURES.USE_REAL_API ? realUserService : mockUserService;
export const userManagementService = FEATURES.USE_REAL_API ? realUserManagementService : mockUserManagementService;
export const verificationQueueService = FEATURES.USE_REAL_API ? realVerificationQueueService : mockVerificationQueueService;
export const activityLogService = FEATURES.USE_REAL_API ? realActivityLogService : mockActivityLogService;
export const apiMonitorService = FEATURES.USE_REAL_API ? realApiMonitorService : mockApiMonitorService;
export const apiAccessService = FEATURES.USE_REAL_API ? realApiAccessService : mockApiAccessService;
export const pricingManagementService = FEATURES.USE_REAL_API ? realPricingManagementService : mockPricingManagementService;

// Log which services are in mock mode (development only)
if (import.meta.env.DEV) {
  if (!FEATURES.USE_REAL_API) {
    console.log('[Demo Mode] Using mock services for all features');
  } else {
    console.log('[Live Mode] All services connected to real API');
  }
}
