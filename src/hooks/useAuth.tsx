import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { apiService } from '@/services/apiService';
import { User, AuthCredentials } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  signUp: (userData: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    type: 'ADMIN' | 'USER';
  }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const login = async (credentials: AuthCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await apiService.login(credentials);
      if (result.token) {
        // In a real app, you'd decode the JWT to get user info
        // For now, we'll simulate user data
        const userData = {
          id: '1',
          first_name: 'User',
          last_name: 'Name',
          email: credentials.email,
          phone_number: '',
          type: 'USER' as 'USER' | 'ADMIN',
          status: 'ACTIVE' as 'ACTIVE' | 'BLOCKED' | 'PENDING'
        };
        setUser(userData);
        
        // Redirect based on user type
        if (userData.type === 'ADMIN') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/client';
        }
        
        toast({
          title: 'Success',
          description: 'Successfully logged in',
        });
        return true;
      }
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    type: 'ADMIN' | 'USER';
  }): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await apiService.signUp(userData);
      if (result.token) {
        setUser({
          id: '1',
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          phone_number: userData.phone_number,
          type: userData.type,
          status: 'ACTIVE'
        });
        toast({
          title: 'Success',
          description: 'Account created successfully',
        });
        return true;
      }
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    window.location.href = '/';
    toast({
      title: 'Success',
      description: 'Successfully logged out',
    });
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      // In a real app, you'd validate the token and get user info
      // For now, simulate a logged-in user
      setUser({
        id: '1',
        first_name: 'User',
        last_name: 'Name',
        email: 'user@example.com',
        phone_number: '',
        type: 'USER',
        status: 'ACTIVE'
      });
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    login,
    signUp,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}