import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    loginStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    //these three reducers are for updating the user profile
    updateUserStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // deleteUserStart: (state) => {
    //   state.loading = true;
    // },
    // deleteUserSuccess: (state) => {
    //   state.currentUser = null; // This is to clear the user data from the state
    //   state.loading = false;
    //   state.error = null;
    // },
    // deleteUserFailure: (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
    logOutStart: (state) => {
      state.loading = true;
    },
    logOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    logOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    // This reducer is to set the user data in the state related to check-auth route
    setUpUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    // This reducer is to delete the user data from the state related to check-auth route
    deleteUser: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  clearError,
  setUpUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;

// Reducer: A pure function that takes the current state and an action, then returns a new state based on the action type and payload.
