// ExpoSampleApp/store/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, signOut } from './thunks';
import { initialState } from './thunks';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
        state.isSignedIn = action.payload.isSignedIn;
        state.user = action.payload.user;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
        state.isSignedIn = action.payload.isSignedIn;
        state.user = action.payload.user;
    });
  },
});

export default authSlice.reducer;