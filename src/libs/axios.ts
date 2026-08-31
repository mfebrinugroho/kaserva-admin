import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/staff`,
  // withCredentials: true,
  headers: {
    Accept: "application/json",
    // "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // if (token) {
    //   config.headers.Authorization =
    //     `Bearer ${token}`;
    // }

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default api;
