// Feature flags for API integration
export const FEATURES = {
  // Set to true to use real API calls, false for mock data
  USE_REAL_API: import.meta.env.VITE_USE_REAL_API === "true",

  // Individual feature flags
  REAL_AUTH: import.meta.env.VITE_REAL_AUTH === "false" || false,
  REAL_WALLET: import.meta.env.VITE_REAL_WALLET === "true" || false,
  REAL_VERIFICATION: import.meta.env.VITE_REAL_VERIFICATION === "true" || false,
  REAL_NOTIFICATIONS: import.meta.env.VITE_REAL_NOTIFICATIONS === "true" || false,

  // WebSocket features
  REAL_TIME_NOTIFICATIONS: import.meta.env.VITE_REAL_TIME_NOTIFICATIONS === "true" || false,
  REAL_TIME_WALLET: import.meta.env.VITE_REAL_TIME_WALLET === "true" || false,
} as const;

// Helper function to check if feature is enabled
export const isFeatureEnabled = (feature: keyof typeof FEATURES): boolean => {
  return FEATURES[feature] || FEATURES.USE_REAL_API;
};
