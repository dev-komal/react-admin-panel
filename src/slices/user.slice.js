import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userLoading: false,
    status: false,
    updateStatus: false,
    updateLoading: false,
    usersList: [],
    error: null,
    usersData: [],
    users: [],
    userDetails: [],
  },
  reducers: {
    // user list
    userListRequest: (state) => {
      state.userLoading = true;
      state.error = null;
      state.status = false;
      state.userDetails = [];
      state.userByIdStatus = false;
      state.deleteStatus = false;
      state.deleteMessage = "";
    },
    userListSuccess: (state, action) => {
      state.userLoading = false;
      state.usersList = action.payload.users;
      state.users = action.payload;
    },
    userListError: (state, action) => {
      state.userLoading = false;
      // state.error = action.payload.message;
      state.usersList = action.payload.errors;
    },

    resetUserAddEditRequest: (state) => {
      state.userLoading = false;
      state.status = false;
      state.updateStatus = false;
      state.error = null;
      state.userByIdStatus = false;
    },
    // user add
    userAddRequest: (state) => {
      state.userLoading = true;
      state.status = false;
      state.updateStatus = false;
      state.error = null;
    },
    userAddSuccess: (state, action) => {
      state.userLoading = false;
      state.usersData = action.payload;
      state.status = true;
      state.error = null;
    },
    userAddError: (state, action) => {
      state.userLoading = false;
      state.error = action.payload?.errors[0]?.path;
      state.status = false;
    },

    // user add
    userGetByIdRequest: (state) => {
      state.userLoading = true;
      state.userDetails = [];
      state.userByIdStatus = false;
    },
    userGetByIdSuccess: (state, action) => {
      state.userLoading = false;
      state.userDetails = action.payload;
      state.userByIdStatus = true;
    },
    userGetByIdError: (state) => {
      state.userLoading = false;
      state.userDetails = [];
      // state.userByIdStatus = false;
    },

    // update user
    updateUserRequest: (state) => {
      state.updateStatus = false;
      state.updateLoading = true;
      state.error = null;
    },
    updateUserSuccess: (state) => {
      state.updateStatus = true;
      state.updateLoading = false;
      state.error = null;
    },
    updateUserError: (state) => {
      state.updateStatus = false;
      state.updateLoading = false;
      state.error = "email";
    },

    // User delete
    userDeleteRequest: (state) => {
      state.deleteStatus = false;
      state.deleteMessage = "";
    },
    userDeleteSuccess: (state) => {
      state.deleteStatus = true;
      state.deleteMessage = "";
    },
    userDeleteError: (state, action) => {
      state.deleteStatus = false;
      state.deleteMessage = action.payload.message;
    },
  },
});

export const {
  userListRequest,
  userListSuccess,
  userListError,
  userAddRequest,
  userAddSuccess,
  userAddError,
  userGetByIdRequest,
  userGetByIdSuccess,
  userGetByIdError,
  updateUserRequest,
  updateUserSuccess,
  updateUserError,
  resetUserAddEditRequest,
  userDeleteRequest,
  userDeleteSuccess,
  userDeleteError,
} = userSlice.actions;

export default userSlice.reducer;
