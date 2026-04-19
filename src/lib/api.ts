import axios, { type AxiosInstance, type AxiosError } from 'axios';

/** Base URL for the marketplace backend (`NEXT_PUBLIC_API_URL` or dev default). */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Central HTTP client: JSON API, Bearer access token on each request (browser),
 * and automatic refresh when access token expires (401).
 */
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Attach `Authorization: Bearer <access_token>` from localStorage when running in the browser.
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

    // On 401, try once to refresh tokens via panel auth refresh; on success retry the original request; on failure clear auth and send user to login.
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError & { config?: { _retry?: boolean } }) => {
        const originalRequest = error.config as {
          _retry?: boolean;
          headers?: Record<string, string>;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              // Refresh uses a standalone axios call to avoid interceptor recursion.
              const response = await axios.post(
                `${API_BASE_URL}/api/panel/auth/refresh`,
                { refreshToken }
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

  get<T>(url: string) {
    return this.client.get<T>(url);
  }

  post<T>(url: string, data?: unknown) {
    return this.client.post<T>(url, data);
  }

  patch<T>(url: string, data?: unknown) {
    return this.client.patch<T>(url, data);
  }

  delete<T = void>(url: string) {
    return this.client.delete<T>(url);
  }
}

export const apiClient = new ApiClient();
