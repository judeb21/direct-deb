import axios from "axios";
import SessionStorageService from "@/services/sessionStorage";

const axiosInstance = axios.create({});

const authHeader = () => {
  let auth = SessionStorageService.getItem("token");
  if (auth) return auth;
  return "";
};

/* eslint-disable  no-unused-vars */
/* eslint-disable  no-undef */

const setHeader = () => {
  axios.defaults.baseURL = "http://proleanfinancials.biz/middleware";
  axios.defaults.headers.common = {
    "Access-Control-Allow-Origin": "*",
    accept: "Accept: application/json",
    Authorization: `Bearer ${authHeader()}`,
  };
};

const ProleanApiService = {
  init() {
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = SessionStorageService.getItem("token");

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },

      (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },

      (error) => {
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }
        // Logout user if token refresh didn't work or user is disabled
        if (error.config.url.includes("/refreshtoken")) {
          Store.dispatch(LOGOUT);
          router.push("/auth/login");
          return Promise.reject(error);
        }
      }
    );
  },

  query(resource, params) {
    return axios.get(resource, params);
  },

  getRequest(resource, slug = "") {
    setHeader();
    if (slug == null || slug == "") {
      return axios.get(`${resource}`).catch((error) => {
        throw new Error(`${error}`);
      });
    } else {
      return axios.get(`${resource}/${slug}`).catch((error) => {
        throw new Error(`${error}`);
      });
    }
  },

  postRequest(resource, params) {
    setHeader();
    return axios.post(`${resource}`, params);
  },
};

export default ProleanApiService;
