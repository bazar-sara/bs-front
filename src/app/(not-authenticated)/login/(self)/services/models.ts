// Backend UserType enum values
export enum BackendUserType {
  CUSTOMER = 'CUSTOMER',
  EMPLOYER = 'EMPLOYER',
}

// Frontend UserType
export type FrontendUserType = 'retail' | 'wholesale';

export const mapUserTypeToBackend = (
  type: FrontendUserType | null
): BackendUserType | null => {
  if (!type) return null;
  return type === 'retail'
    ? BackendUserType.CUSTOMER
    : BackendUserType.EMPLOYER;
};

export const mapUserTypeFromBackend = (
  type: string
): FrontendUserType | null => {
  if (type === BackendUserType.CUSTOMER) return 'retail';
  if (type === BackendUserType.EMPLOYER) return 'wholesale';
  return null;
};

// Request OTP API response (wrapped or flat)
export type RequestOtpApiResponse = {
  data?: { otp: string; resendAfter: number };
  otp?: string;
  resendAfter?: number;
};

// Verify OTP API response (wrapped or flat)
export type VerifyOtpApiResponse = {
  data?: { accessToken: string; refreshToken: string };
  accessToken?: string;
  refreshToken?: string;
};

// Service return types
export type RequestOtpResult = {
  otp: string;
  resendAfter: number;
};

export type VerifyOtpResult = {
  accessToken: string;
  refreshToken: string;
};
