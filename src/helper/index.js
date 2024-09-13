import axios from "axios";
import { SERVER_AUTH_ERROR_STATUS_CODE } from "../config/constants";
import ROUTE_URLS from "../config/routes";
import LocalstorageService from "./localStorage-services";

//apply base url for axios
const API_URL = process.env.REACT_APP_BASE_URL || "";
const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(
  (config) => {
    const token = LocalstorageService.getLoggedInUserToken();
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data, status } = error.response;
    if (status === SERVER_AUTH_ERROR_STATUS_CODE) {
      LocalstorageService.logoutUser();
      window.location.replace(ROUTE_URLS.LOGIN);
    }
    return Promise.reject(data);
  },
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config });
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config });
}

export async function put(url, config = {}) {
  return await axiosApi.put(url, { ...config });
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config });
}

export async function postFormData(url, data, config = {}) {
  return axiosApi.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...config.headers,
    },
    ...config,
  });
}

export async function putFormData(url, data, config = {}) {
  return axiosApi.put(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...config.headers,
    },
    ...config,
  });
}
