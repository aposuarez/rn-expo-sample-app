import { AuthUser } from "@/libs/supabase/auth/models"

export type AuthState = { 
    isSignedIn: boolean,
    user: AuthUser | null
}

export type SignInParams = {
    email: string,
    password: string
} 

export type SignUpParams = {
    email: string,
    password: string,
    metadata: {
        name: string
    }
} 
