export type AuthState = { 
    isSignedIn: boolean,
    user: User | null
}

export type SignInParams = {
    email: string,
    password: string
} 

export interface User {
    name: string,
    email: string
}