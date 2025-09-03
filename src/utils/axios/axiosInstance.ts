import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4100/api",
  withCredentials: true,
  timeout: 15000,
});

// Simple token store (in-memory) to avoid reading localStorage on every request
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers?.set("Authorization", `Bearer ${accessToken}`);
      console.log("Token Attached");
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.log("Token Error:", error.response);

      // Show toast only once
      // if (!toast.isActive(activeToastId)) {
      //   toast.error(
      //     (error.response.data as { message?: string })?.message ||
      //       "Access denied. No token provided.",
      //     { toastId: activeToastId }
      //   );
      // }

      // Dispatch Action to remove Data from LocalStorage i.e logout

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
    return Promise.reject(error);
  }
);
