/* eslint-disable no-restricted-globals */
import { SUCCESS_STATUS_CODE } from '../config/constants'
import ROUTES_URL from '../config/routes'
import LocalStorageService from '../helper/localStorage-services'
import AuthService from '../services/auth.service'
import {
  forgotPasswordError,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  logoutError,
  logoutSuccess,
  profileError,
  profileRequest,
  profileSuccess,
  resetPasswordError,
  resetPasswordRequest,
  resetPasswordSuccess,
  updatePasswordError,
  updatePasswordRequest,
  updatePasswordSuccess,
  updateProfileError,
  updateProfileRequest,
  updateProfileSuccess,
} from '../slices/auth.slice'

export function loginUser(payload) {
  return (dispatch) => {
    dispatch(loginRequest())
    AuthService.login(payload)
      .then((response) => {
        const { status, data, message } = response.data
        if (status === SUCCESS_STATUS_CODE) {
          LocalStorageService.loginUser(data)
          dispatch(loginSuccess({ ...data, message }))
          window.location.replace(ROUTES_URL.DASHBOARD)
        }
      })
      .catch((error) => {
        dispatch(loginError(error))
      })
  }
}

export function logoutLoggedUser(navigate) {
  return (dispatch) => {
    dispatch(loginRequest())
    AuthService.logout()
      .then((response) => {
        const { status, data, message, error } = response.data
        if (status === SUCCESS_STATUS_CODE) {
          dispatch(logoutSuccess({ ...data, message }))
          LocalStorageService.logoutUser()
          navigate(ROUTES_URL.LOGIN)
          location.reload()
        } else {
          dispatch(logoutError(error))
        }
      })
      .catch((error) => {
        dispatch(logoutError(error))
      })
  }
}

export function getProfileInformation(payload) {
  return (dispatch) => {
    dispatch(profileRequest())
    AuthService.userProfile(payload)
      .then((response) => {
        const { status, data, message, error } = response.data
        if (status === SUCCESS_STATUS_CODE) {
          dispatch(profileSuccess({ ...data, message }))
        } else {
          dispatch(profileError(error))
        }
      })
      .catch((error) => {
        dispatch(profileError(error))
      })
  }
}

export function updateProfileInformation(payload, id) {
  return (dispatch) => {
    dispatch(updateProfileRequest())
    AuthService.updateUserProfile(payload, id)
      .then((response) => {
        const { status, data, message, error } = response.data
        if (status === SUCCESS_STATUS_CODE) {
          dispatch(updateProfileSuccess({ ...data, message }))
        } else {
          dispatch(updateProfileError(error))
        }
      })
      .catch((error) => {
        dispatch(updateProfileError(error))
      })
  }
}

export function updateLoggedUserPassword(payload, id, navigate) {
  return (dispatch) => {
    dispatch(updatePasswordRequest())
    AuthService.updatePassword(payload, id)
      .then((response) => {
        const { status, data, message, error } = response.data
        if (status === SUCCESS_STATUS_CODE) {
          dispatch(updatePasswordSuccess({ ...data, message }))
          LocalStorageService.logoutUser()
          navigate(ROUTES_URL.LOGIN)
          location.reload()
        } else {
          dispatch(updatePasswordError(error))
        }
      })
      .catch((error) => {
        dispatch(updatePasswordError(error))
      })
  }
}
