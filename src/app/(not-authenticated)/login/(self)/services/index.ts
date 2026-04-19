import { apiClient } from '@/lib/api';
import { getResponseData } from '../functions';
import {
  type BackendUserType,
  type RequestOtpApiResponse,
  type RequestOtpResult,
  type VerifyOtpApiResponse,
  type VerifyOtpResult,
} from './models';

/** `POST /api/panel/auth/request-otp` — sends OTP to phone; returns dev hint + resend cooldown when applicable. */
export async function requestOtp(
  phoneNumber: string
): Promise<RequestOtpResult> {
  const response = await apiClient.post<RequestOtpApiResponse>(
    '/api/panel/auth/request-otp',
    { phoneNumber }
  );
  return getResponseData(response);
}

/** `POST /api/panel/auth/verify-otp` — validates OTP and returns JWT pair for the chosen wholesale/retail role. */
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
