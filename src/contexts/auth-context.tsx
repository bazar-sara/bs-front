'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import {
  apiClient,
  mapUserTypeToBackend,
  mapUserTypeFromBackend,
  type FrontendUserType,
} from '@/lib/api';

export type UserType = FrontendUserType | null;

export type User = {
  id: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  name: string;
  type: UserType;
  avatar?: string;
  shopId?: string;
};

type AuthContextProps = {
  user: User | null;
  isAuthenticated: boolean;
  requestOtp: (
    phoneNumber: string
  ) => Promise<{ otp: string; resendAfter: number }>;
  verifyOtp: (
    phoneNumber: string,
    otp: string,
    type: UserType
  ) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const clearAuth = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }, []);

  const refreshTokens = useCallback(async (refreshToken: string) => {
    const { accessToken, refreshToken: newRefreshToken } =
      await apiClient.refreshToken(refreshToken);

    localStorage.setItem('access_token', accessToken);
    if (newRefreshToken) {
      localStorage.setItem('refresh_token', newRefreshToken);
    }

    // Decode token to get user info
    const payload = apiClient.decodeJwt(accessToken);
    if (payload && payload.sub) {
      const userType = mapUserTypeFromBackend(payload.userType as string);
      const user: User = {
        id: payload.sub,
        phoneNumber: '', // We don't have phone number in token, will be loaded from stored user
        name: payload.sub,
        type: userType,
      };

      // Try to load additional user info from stored user
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          user.phoneNumber = parsedUser.phoneNumber || '';
          user.firstName = parsedUser.firstName;
          user.lastName = parsedUser.lastName;
          user.email = parsedUser.email;
          user.avatar = parsedUser.avatar;
          user.shopId = parsedUser.shopId;
          user.name =
            parsedUser.name ||
            `${parsedUser.firstName || ''} ${parsedUser.lastName || ''}`.trim() ||
            parsedUser.phoneNumber ||
            payload.sub;
        } catch {
          // Ignore parsing errors
        }
      }

      setUser(user);
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load user from localStorage
      const storedUser = localStorage.getItem('auth_user');
      const accessToken = localStorage.getItem('access_token');

      if (storedUser && accessToken) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Verify token is still valid
          const payload = apiClient.decodeJwt(accessToken);
          if (payload && payload.exp && payload.exp * 1000 > Date.now()) {
            setUser(parsedUser);
          } else {
            // Token expired, try to refresh
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              refreshTokens(refreshToken).catch(() => {
                // Refresh failed, clear everything
                clearAuth();
              });
            } else {
              clearAuth();
            }
          }
        } catch {
          clearAuth();
        }
      }
    }
  }, [clearAuth, refreshTokens]);

  const requestOtp = useCallback(async (phoneNumber: string) => {
    const response = await apiClient.requestOtp(phoneNumber);
    return response;
  }, []);

  const verifyOtp = useCallback(
    async (phoneNumber: string, otp: string, type: UserType) => {
      if (!type) {
        throw new Error('User type is required');
      }

      const backendUserType = mapUserTypeToBackend(type);
      if (!backendUserType) {
        throw new Error('Invalid user type');
      }

      const { accessToken, refreshToken: refreshTokenValue } =
        await apiClient.verifyOtp(phoneNumber, otp, backendUserType);

      // Store tokens
      localStorage.setItem('access_token', accessToken);
      if (refreshTokenValue) {
        localStorage.setItem('refresh_token', refreshTokenValue);
      }

      // Decode token to get user info
      const payload = apiClient.decodeJwt(accessToken);
      if (payload && payload.sub) {
        const userType = mapUserTypeFromBackend(payload.userType as string);
        const user: User = {
          id: payload.sub,
          phoneNumber,
          name: phoneNumber,
          type: userType,
        };

        // Set a default name from phone number
        user.name = phoneNumber;

        setUser(user);
        localStorage.setItem('auth_user', JSON.stringify(user));
      }
    },
    []
  );

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser;
      const updatedUser = { ...currentUser, ...updates };
      // Update name if firstName or lastName changed
      if (updates.firstName || updates.lastName) {
        updatedUser.name =
          `${updatedUser.firstName || ''} ${updatedUser.lastName || ''}`.trim() ||
          updatedUser.phoneNumber;
      }
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      if (refreshToken) {
        await apiClient.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout service error:', error);
      // Continue with clearing auth even if logout service fails
    } finally {
      // Always clear auth data regardless of service call result
      clearAuth();
    }
  }, [clearAuth]);

  const value: AuthContextProps = {
    user,
    isAuthenticated: !!user,
    requestOtp,
    verifyOtp,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
