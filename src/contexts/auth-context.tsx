'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';

export type UserType = 'retail' | 'wholesale' | null;

export type User = {
  id: string;
  email: string;
  name: string;
  type: UserType;
  avatar?: string;
  shopId?: string;
};

type AuthContextProps = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, type: UserType) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('auth_user');
        }
      }
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string, type: UserType) => {
      if (!type) {
        throw new Error('User type is required');
      }

      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        type,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`,
        ...(type === 'wholesale' && { shopId: `shop_${Date.now()}` }),
      };

      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_user');
  }, []);

  const value: AuthContextProps = {
    user,
    isAuthenticated: !!user,
    login,
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
