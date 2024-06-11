import axios from "axios";
import { BASE_URL } from "../constants/userModule/apiConstants";
import { getFromLocalStorage } from "../utils/javaScript";

export const userDataApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

userDataApi.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage("token");
    if (token) {
      config.headers["access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userDataApi.interceptors.response.use(
  (response) => {
    // console.log(`Response is : `, response);
    return response?.data;
  },
  (error) => {
    console.log(`I got error.`);
    throw new Error(error.response?.data?.message);
  }
);

//email : "tecrsts@yopmail.com"
//name : "aa"
//role : "teacher"