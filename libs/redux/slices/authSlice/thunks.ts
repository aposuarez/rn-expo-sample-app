// ExpoSampleApp/store/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState, SignInParams } from './models';

export const initialState: AuthState = { isSignedIn: false, user: null };

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (params: SignInParams, thunkAPI) => {
      try {
        return { isSignedIn: params.email == "test" && params.password == "test", user: {name:"test", email: params.email}}
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
    return initialState
});
