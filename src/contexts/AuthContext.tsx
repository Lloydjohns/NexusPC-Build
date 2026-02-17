import { createContext, useContext, useState, ReactNode } from 'react';

export interface Address {
  street: string;
  city: string;
  province: string;
  zip: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: Address;
  avatar?: string;
}

/* =======================
   ADDED: LOGIN OPTIONS
======================= */
export const LOGIN_OPTIONS = [
  { id: 'email', label: 'Email & Password' },
  { id: 'google', label: 'Continue with Google' },
  { id: 'facebook', label: 'Continue with Facebook' },
  { id: 'yahoo', label: 'Continue with Yahoo' },
  { id: 'apple', label: 'Continue with Apple' },
  { id: 'phone', label: 'Continue with Phone Number' },
  { id: 'guest', label: 'Continue as Guest' },
];

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: Address;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupPayload) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || password.length < 6) return false;

    setUser({
      id: 'user-1',
      email,
      name: 'Returning Customer',
      phone: '09123456789',
      address: {
        street: 'Sample Street',
        city: 'Manila',
        province: 'Metro Manila',
        zip: '1000',
        country: 'Philippines',
      },
    });

    return true;
  };

  const signup = async (data: SignupPayload): Promise<boolean> => {
    const { email, password, name, phone, address } = data;

    if (!email || password.length < 6 || !name || !phone) return false;

    setUser({
      id: crypto.randomUUID(),
      email,
      name,
      phone,
      address,
    });

    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
