export interface User {
    id: string;
    username: string;
    role: 'defender' | 'attack';
    organization: string;
    region?: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string;
  }
  