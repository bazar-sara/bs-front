import axios, { type AxiosInstance, type AxiosError } from 'axios';

// Backend UserType enum values
export enum BackendUserType {
  CUSTOMER = 'CUSTOMER',
  EMPLOYER = 'EMPLOYER',
}

// Frontend UserType
export type FrontendUserType = 'retail' | 'wholesale';

// Map frontend user types to backend user types
export const mapUserTypeToBackend = (
  type: FrontendUserType | null
): BackendUserType | null => {
  if (!type) return null;
  return type === 'retail'
    ? BackendUserType.CUSTOMER
    : BackendUserType.EMPLOYER;
};

// Map backend user types to frontend user types
export const mapUserTypeFromBackend = (
  type: string
): FrontendUserType | null => {
  if (type === BackendUserType.CUSTOMER) return 'retail';
  if (type === BackendUserType.EMPLOYER) return 'wholesale';
  return null;
};

// Get API base URL from environment variable or default to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const accessToken = localStorage.getItem('access_token');
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError & { config?: { _retry?: boolean } }) => {
        const originalRequest = error.config as {
          _retry?: boolean;
          headers?: Record<string, string>;
        };

        // If 401 and we haven't already retried, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              const response = await axios.post(
                `${API_BASE_URL}/api/panel/auth/refresh`,
                {
                  refreshToken,
                }
              );

              const { accessToken, refreshToken: newRefreshToken } =
                response.data.data || response.data;

              localStorage.setItem('access_token', accessToken);
              if (newRefreshToken) {
                localStorage.setItem('refresh_token', newRefreshToken);
              }

              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }
              return this.client(
                originalRequest as Parameters<typeof this.client>[0]
              );
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            if (typeof window !== 'undefined') {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              localStorage.removeItem('auth_user');
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async requestOtp(phoneNumber: string): Promise<{
    otp: string;
    resendAfter: number;
  }> {
    const response = await this.client.post<{
      data?: { otp: string; resendAfter: number };
      otp?: string;
      resendAfter?: number;
    }>('/api/panel/auth/request-otp', { phoneNumber });
    const result = response.data.data || response.data;
    return {
      otp: result.otp!,
      resendAfter:
        typeof result.resendAfter === 'number'
          ? result.resendAfter
          : parseInt(result.resendAfter as unknown as string, 10) || 60,
    };
  }

  async verifyOtp(
    phoneNumber: string,
    otp: string,
    userType: BackendUserType
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const response = await this.client.post<{
      data?: { accessToken: string; refreshToken: string };
      accessToken?: string;
      refreshToken?: string;
    }>('/api/panel/auth/verify-otp', {
      phoneNumber,
      otp,
      userType,
    });
    const result = response.data.data || response.data;
    return {
      accessToken: result.accessToken!,
      refreshToken: result.refreshToken!,
    };
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const response = await this.client.post<{
      data?: { accessToken: string; refreshToken: string };
      accessToken?: string;
      refreshToken?: string;
    }>('/api/panel/auth/refresh', {
      refreshToken,
    });
    const result = response.data.data || response.data;
    return {
      accessToken: result.accessToken!,
      refreshToken: result.refreshToken!,
    };
  }

  async logout(refreshToken: string) {
    await this.client.post('/api/panel/auth/logout', {
      refreshToken,
    });
  }

  // Helper to decode JWT token (without verification for client-side use)
  decodeJwt(token: string): {
    sub?: string;
    userType?: string;
    exp?: number;
    [key: string]: unknown;
  } | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }
}

export const apiClient = new ApiClient();
