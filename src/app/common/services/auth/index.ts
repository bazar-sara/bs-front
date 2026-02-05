import { apiClient } from '@/lib/api';
import { getResponseData } from './functions';
import type {
  JwtPayload,
  RefreshTokenApiResponse,
  RefreshTokenResult,
} from './models';

export async function refreshToken(
  refreshTokenValue: string
): Promise<RefreshTokenResult> {
  const response = await apiClient.post<RefreshTokenApiResponse>(
    '/api/panel/auth/refresh',
    { refreshToken: refreshTokenValue }
  );
  return getResponseData(response);
}

export async function logout(refreshTokenValue: string): Promise<void> {
  await apiClient.post('/api/panel/auth/logout', {
    refreshToken: refreshTokenValue,
  });
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as JwtPayload;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}
