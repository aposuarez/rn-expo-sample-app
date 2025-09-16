// ExpoSampleApp/store/authSlice.ts
import { signIn, signOut } from '@/libs/supabase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, SignInParams } from './models';

export const initialState: AuthState = { isSignedIn: false, user: null };

export const userSignIn = createAsyncThunk(
    'auth/signIn',
    async (params: SignInParams, thunkAPI) => {
      try {
        const { user, error } = await signIn(params);

        if (error) {
          return thunkAPI.rejectWithValue(error.message);
        }

        if (user) {
          return { isSignedIn: true, user: user }
        }
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const userSignOut = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
  try {
    const { error } = await signOut()
    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    else {
      return initialState
    }
  }
  catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
    
});
