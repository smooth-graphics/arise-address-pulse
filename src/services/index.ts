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

// Mock services
import { mockAuthService } from './mock/mockAuthService';
import { mockVerificationService } from './mock/mockVerificationService';
import { mockWalletService } from './mock/mockWalletService';
import { mockNotificationService } from './mock/mockNotificationService';
import { mockUserService } from './mock/mockUserService';

// Export the appropriate service based on feature flags
export const authService = FEATURES.REAL_AUTH ? realAuthService : mockAuthService;
export const verificationService = FEATURES.REAL_VERIFICATION ? realVerificationService : mockVerificationService;
export const walletService = FEATURES.REAL_WALLET ? realWalletService : mockWalletService;
export const notificationService = FEATURES.REAL_NOTIFICATIONS ? realNotificationService : mockNotificationService;
export const userService = FEATURES.REAL_VERIFICATION ? realUserService : mockUserService;

// Log which services are in mock mode (development only)
if (import.meta.env.DEV) {
  const mockServices = [];
  if (!FEATURES.REAL_AUTH) mockServices.push('Auth');
  if (!FEATURES.REAL_VERIFICATION) mockServices.push('Verification');
  if (!FEATURES.REAL_WALLET) mockServices.push('Wallet');
  if (!FEATURES.REAL_NOTIFICATIONS) mockServices.push('Notifications');
  
  if (mockServices.length > 0) {
    console.log(`[Demo Mode] Using mock services: ${mockServices.join(', ')}`);
  } else {
    console.log('[Live Mode] All services connected to real API');
  }
}
