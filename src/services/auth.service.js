import { get, post, put, putFormData } from "../helper";

const URI = "/auth";

const login = (payload) => {
  let URL = `${URI}/login`;
  return post(URL, payload);
};

const forgotPassword = (payload) => {
  let URL = `${URI}/forgotPassword`;
  return post(URL, payload);
};

const resetPassword = (payload) => {
  let URL = `${URI}/resetPassword`;
  return post(URL, payload);
};

const userProfile = (payload) => {
  let URL = `${URI}/profile/${payload}`;
  return get(URL, payload);
};

const updateUserProfile = (payload, id) => {
  let URL = `${URI}/update/${id}`;
  return putFormData(URL, payload);
};

const updatePassword = (payload, id) => {
  let URL = `${URI}/${id}/update-password`;
  return put(URL, payload);
};

const logout = () => {
  let URL = `${URI}/logout`;
  return get(URL);
};

const AuthService = {
  login,
  forgotPassword,
  resetPassword,
  logout,
  userProfile,
  updateUserProfile,
  updatePassword,
};
export default AuthService;
