import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginLoading: false,
    loggedInUser: null,
    loginMessage: "",
    loginError: "",

    forgotPasswordLoading: false,
    forgotPasswordMessage: "",
    forgotPasswordError: null,

    resetPasswordLoading: false,
    resetPasswordMessage: "",
    resetPasswordError: "",

    logoutLoading: false,
    logoutMessage: "",
    logoutError: "",

    profileLoading: false,
    profileDetails: [],

    profileStatus: false,
    error: "",

    updatePasswordLoading: false,
    passwordError: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loginLoading = true;
      state.loginMessage = "";
      state.loginError = "";
    },
    loginSuccess: (state, action) => {
      state.loginLoading = false;
      state.loggedInUser = action.payload.userObj;
      state.loginMessage = action.payload.message;
    },
    loginError: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload.message;
    },
    // forgot password
    forgotPasswordRequest: (state) => {
      state.forgotPasswordLoading = true;
      state.forgotPasswordMessage = "";
      state.forgotPasswordError = "";
    },
    forgotPasswordSuccess: (state, action) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordMessage = action.payload.message;
    },
    forgotPasswordError: (state, action) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordError = action.payload.message;
    },

    // reset password
    resetPasswordRequest: (state) => {
      state.resetPasswordLoading = true;
      state.resetPasswordMessage = "";
      state.resetPasswordError = "";
      state.loginError = "";
    },
    resetPasswordSuccess: (state, action) => {
      state.resetPasswordLoading = false;
      state.resetPasswordMessage = action.payload.message;
    },
    resetPasswordError: (state, action) => {
      state.resetPasswordLoading = false;
      state.resetPasswordError = action.payload.message;
    },

    // Logout User
    logoutRequest: (state) => {
      state.logoutLoading = true;
      state.logoutMessage = "";
      state.logoutError = "";
    },
    logoutSuccess: (state, action) => {
      state.logoutLoading = false;
      state.logoutMessage = action.payload.message;
    },
    logoutError: (state, action) => {
      state.logoutLoading = false;
      state.logoutError = action.payload.message;
    },

    // get profile details
    profileRequest: (state) => {
      state.profileLoading = true;
      state.profileError = "";
    },
    profileSuccess: (state, action) => {
      state.profileLoading = false;
      state.profileDetails = action.payload;
    },
    profileError: (state, action) => {
      state.profileLoading = false;
      state.profileError = action.payload.message;
    },

    // update profile details
    updateProfileRequest: (state) => {
      state.profileStatus = false;
      state.error = null;
    },
    updateProfileSuccess: (state) => {
      state.profileStatus = true;
      state.error = null;
    },
    updateProfileError: (state, action) => {
      state.profileStatus = false;
      state.error = action.payload?.message;
    },

    // update user password
    updatePasswordRequest: (state) => {
      state.updatePasswordLoading = true;
      state.passwordError = null;
    },
    updatePasswordSuccess: (state) => {
      state.updatePasswordLoading = false;
      state.passwordError = null;
    },
    updatePasswordError: (state, action) => {
      state.updatePasswordLoading = false;
      state.passwordError = action.payload?.message;
    },
  },
});

export const {
  loginRequest,
  setAuthUser,
  loginSuccess,
  loginError,
  loginSocialSuccess,
  resetMessage,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  profileRequest,
  profileSuccess,
  profileError,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileError,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordError,
} = authSlice.actions;

export default authSlice.reducer;
