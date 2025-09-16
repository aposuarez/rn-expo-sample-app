// ExpoSampleApp/store/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { initialState, userSignIn, userSignOut } from './thunks';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSignIn.fulfilled, (state, action) => {
        if (action.payload) {
            state.isSignedIn = action.payload.isSignedIn;
            state.user = action.payload.user;
        }
    });
    builder.addCase(userSignOut.fulfilled, (state, action) => {
        state.isSignedIn = action.payload.isSignedIn;
        state.user = action.payload.user;
    });
   
  },
});

export default authSlice.reducer;