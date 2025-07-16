
export type UserPlan = 'basic' | 'pro' | 'enterprise';

export interface RedactionConfig {
  showFullAddress: boolean;
  showCoordinates: boolean;
  showFullTimestamp: boolean;
  showConfidenceScore: boolean;
  showDetailedMetrics: boolean;
  historyLimit: number | null;
  allowBulkExport: boolean;
  allowApiAccess: boolean;
}

export const getRedactionConfig = (plan: UserPlan): RedactionConfig => {
  switch (plan) {
    case 'basic':
      return {
        showFullAddress: false,
        showCoordinates: false,
        showFullTimestamp: false,
        showConfidenceScore: false,
        showDetailedMetrics: false,
        historyLimit: 5,
        allowBulkExport: false,
        allowApiAccess: false,
      };
    case 'pro':
      return {
        showFullAddress: true,
        showCoordinates: true,
        showFullTimestamp: true,
        showConfidenceScore: true,
        showDetailedMetrics: true,
        historyLimit: null,
        allowBulkExport: true,
        allowApiAccess: false,
      };
    case 'enterprise':
      return {
        showFullAddress: true,
        showCoordinates: true,
        showFullTimestamp: true,
        showConfidenceScore: true,
        showDetailedMetrics: true,
        historyLimit: null,
        allowBulkExport: true,
        allowApiAccess: true,
      };
    default:
      return getRedactionConfig('basic');
  }
};

export const redactAddress = (address: string, config: RedactionConfig): string => {
  if (config.showFullAddress) {
    return address;
  }
  
  // Basic redaction: show only first few and last few characters
  const words = address.split(' ');
  if (words.length <= 2) {
    return words[0] + ' ****';
  }
  
  return words[0] + ' **** ' + words[words.length - 1];
};

export const redactCoordinates = (lat: number, lng: number, config: RedactionConfig): { lat: number | string, lng: number | string } => {
  if (config.showCoordinates) {
    return { lat, lng };
  }
  
  return { lat: '****', lng: '****' };
};

export const redactTimestamp = (timestamp: string, config: RedactionConfig): string => {
  if (config.showFullTimestamp) {
    return timestamp;
  }
  
  // Show only date, not time
  return new Date(timestamp).toLocaleDateString();
};

export const redactConfidenceScore = (score: number, config: RedactionConfig): number | string => {
  if (config.showConfidenceScore) {
    return score;
  }
  
  // Show only general categories
  if (score >= 80) return 'High';
  if (score >= 60) return 'Medium';
  return 'Low';
};

export const shouldShowUpgradePrompt = (feature: string, config: RedactionConfig): boolean => {
  switch (feature) {
    case 'fullAddress':
      return !config.showFullAddress;
    case 'coordinates':
      return !config.showCoordinates;
    case 'detailedMetrics':
      return !config.showDetailedMetrics;
    case 'bulkExport':
      return !config.allowBulkExport;
    case 'apiAccess':
      return !config.allowApiAccess;
    default:
      return false;
  }
};
