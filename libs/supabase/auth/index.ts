import { supabase } from '../index';

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
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

/**
 * Sign up a new user with email and password
 */
export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: data.metadata,
      },
    });

    if (error) {
      return {
        user: null,
        error: new Error(error.message),
      };
    }

    return {
      user: authData.user as AuthUser,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error : new Error('An unexpected error occurred'),
    };
  }
};

/**
 * Sign in an existing user with email and password
 */
export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return {
        user: null,
        error: new Error(error.message),
      };
    }

    return {
      user: authData.user as AuthUser,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error : new Error('An unexpected error occurred'),
    };
  }
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        error: new Error(error.message),
      };
    }

    return {
      error: null,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error('An unexpected error occurred'),
    };
  }
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return {
        user: null,
        error: new Error(error.message),
      };
    }

    return {
      user: user as AuthUser,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error : new Error('An unexpected error occurred'),
    };
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user as AuthUser || null);
  });
};

/**
 * Reset password for a user
 */
export const resetPassword = async (email: string): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return {
        error: new Error(error.message),
      };
    }

    return {
      error: null,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error('An unexpected error occurred'),
    };
  }
};
