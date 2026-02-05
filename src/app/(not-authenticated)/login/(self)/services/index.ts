import { apiClient } from '@/lib/api';
import { getResponseData } from '../functions';
import {
  type BackendUserType,
  type RequestOtpApiResponse,
  type RequestOtpResult,
  type VerifyOtpApiResponse,
  type VerifyOtpResult,
} from './models';

export async function requestOtp(
  phoneNumber: string
): Promise<RequestOtpResult> {
  const response = await apiClient.post<RequestOtpApiResponse>(
    '/api/panel/auth/request-otp',
    { phoneNumber }
  );
  return getResponseData(response);
}

export async function verifyOtp(
  phoneNumber: string,
  otp: string,
  userType: BackendUserType
): Promise<VerifyOtpResult> {
  const response = await apiClient.post<VerifyOtpApiResponse>(
    '/api/panel/auth/verify-otp',
    { phoneNumber, otp, userType }
  );
  return getResponseData(response);
}
