import axios from "axios";

export const userDataApi = axios.create({
    baseURL: "https://examination.onrender.com/users",
    headers: {
        "Content-Type": "application/json",
    },
});

userDataApi.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem();
        // if (token) {
        //     // config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


userDataApi.interceptors.response.use(
    (response) => {
        // console.log(`Response is : `, response.data.data)
        return response.data;
    },
    (error) => {
        console.log(`I got error.`);
        throw new Error(error.response.data.message);
    }
);