import { get, post, postFormData, put } from "../helper";

const URI = "/auth";

const userList = (payload) => {
  let URL = `${URI}/list?offset=${payload.offset}&limit=${payload.limit}&search_text=${payload.search_text}&role=${payload.role}&isActive=${payload.isActive}`;
  return get(URL, payload);
};

const getById = (payload) => {
  let URL = `${URI}/profile/${payload}`;
  return get(URL, payload);
};

const userAdd = (payload) => {
  let URL = `${URI}/create`;
  return postFormData(URL, payload);
};

const updateUser = (payload, id) => {
  let URL = `${URI}/update/${id}`;
  return put(URL, payload);
};

const userDelete = (payload) => {
  let URL = `${URI}/deleteMany`;
  return post(URL, payload);
};

const UserService = {
  userList,
  userAdd,
  getById,
  updateUser,
  userDelete,
};
export default UserService;
