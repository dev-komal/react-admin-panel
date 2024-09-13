import {
  CREATED_STATUS_CODE,
  DELETED_STATUS_CODE,
  SUCCESS_STATUS_CODE,
} from "../config/constants";
import UserService from "../services/user.service";
import {
  updateUserError,
  updateUserRequest,
  updateUserSuccess,
  userAddError,
  userAddRequest,
  userAddSuccess,
  userDeleteError,
  userDeleteRequest,
  userDeleteSuccess,
  userGetByIdError,
  userGetByIdRequest,
  userGetByIdSuccess,
  userListError,
  userListRequest,
  userListSuccess,
} from "../slices/user.slice";

export function userList(payload) {
  return (dispatch) => {
    dispatch(userListRequest());
    UserService.userList(payload)
      .then((response) => {
        const { status, data, message, error } = response.data;
        if (status === SUCCESS_STATUS_CODE) {
          dispatch(userListSuccess({ ...data, message }));
        } else {
          dispatch(userListError(error));
        }
      })
      .catch((error) => {
        dispatch(userListError(error));
      });
  };
}

export function userGetById(payload) {
  return (dispatch) => {
    dispatch(userGetByIdRequest());
    UserService.getById(payload)
      .then((response) => {
        const { status, data, message, error } = response.data;
        if (status === SUCCESS_STATUS_CODE) {
          dispatch(userGetByIdSuccess({ ...data, message }));
        } else {
          dispatch(userGetByIdError(error));
        }
      })
      .catch((error) => {
        dispatch(userGetByIdError(error));
      });
  };
}

export function createUser(payload) {
  return (dispatch) => {
    dispatch(userAddRequest());
    UserService.userAdd(payload)
      .then((response) => {
        const { status, data, message, error } = response.data;
        if (status === CREATED_STATUS_CODE) {
          dispatch(userAddSuccess({ ...data, message }));
        } else {
          dispatch(userAddError(error));
        }
      })
      .catch((error) => {
        dispatch(userAddError(error));
      });
  };
}

export function updateUser(payload, id) {
  return (dispatch) => {
    dispatch(updateUserRequest());
    UserService.updateUser(payload, id)
      .then((response) => {
        const { status, data, message, error } = response.data;
        if (status === SUCCESS_STATUS_CODE) {
          dispatch(updateUserSuccess({ ...data, message }));
        } else {
          dispatch(updateUserError(error));
        }
      })
      .catch((error) => {
        dispatch(updateUserError(error));
      });
  };
}

export function deleteSelectedUser(payload) {
  return (dispatch) => {
    dispatch(userDeleteRequest());
    UserService.userDelete(payload)
      .then((response) => {
        const { status, data, message } = response.data;
        if (status === DELETED_STATUS_CODE) {
          dispatch(userDeleteSuccess({ ...data, message }));
        }
      })
      .catch((error) => {
        dispatch(userDeleteError(error));
      });
  };
}
