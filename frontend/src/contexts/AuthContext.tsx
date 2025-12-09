import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, ASHA } from '../lib/api';

interface AuthContextType {
  asha: ASHA | null;
  login: (ashaId: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [asha, setAsha] = useState<ASHA | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAsha = localStorage.getItem('asha');
    const token = localStorage.getItem('access_token');
    
    if (storedAsha && token) {
      try {
        const ashaData = JSON.parse(storedAsha);
        setAsha(ashaData);
        
        // Skip token verification for demo/mock tokens
        if (token === 'mock_token_for_demo') {
          setLoading(false);
          return;
        }
        
        // Verify token is still valid (only for real tokens)
        authAPI.getCurrentUser().catch(() => {
          // Token invalid, clear storage
          authAPI.logout();
          setAsha(null);
        });
      } catch {
        authAPI.logout();
        setAsha(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (ashaId: string, password: string): Promise<boolean> => {
    try {
      const data = await authAPI.login(ashaId, password);
      setAsha(data.asha);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      
      // Check if this is a demo user (fallback for when backend is not running)
      const isDemoUser = ashaId === 'ASHA001' && password === 'password123';
      if (isDemoUser) {
        // Set demo user data in localStorage and state
        const demoAsha: ASHA = {
          id: 'demo-1',
          asha_id: ashaId,
          name: 'Demo ASHA',
          phc_name: 'Demo PHC',
        };
        localStorage.setItem('asha', JSON.stringify(demoAsha));
        localStorage.setItem('access_token', 'mock_token_for_demo');
        setAsha(demoAsha);
        return true;
      }
      
      return false;
    }
  };

  const logout = () => {
    authAPI.logout();
    setAsha(null);
  };

  return (
    <AuthContext.Provider value={{ asha, login, logout, loading }}>
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
