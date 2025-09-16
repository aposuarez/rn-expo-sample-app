
export interface AuthUser {
    id: string;
    email: string;
    metadata?: {
      [key: string]: any;
    };
  }
  
  export interface AuthResponse {
    user: AuthUser | null;
    error: Error | null;
  }
  
  export interface SignUpData {
    email: string;
    password: string;
    metadata?: {
      [key: string]: any;
    };
  }
  
  export interface SignInData {
    email: string;
    password: string;
  }
  