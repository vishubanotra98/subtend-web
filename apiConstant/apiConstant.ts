import axios from "axios";

export const API = {
  AUTH: {
    SIGN_UP: "/auth/signup",
    SIGN_IN: "/auth/signin",
    REFRESH: "/auth/refresh",
    OTP_VERIFICATION: "/auth/verification",
  },
  V1: {
    ME: "/api/v1/user",
    FETCH_WORKSPACES: "/api/v1/workspaces",
    CREATE_WORKSPACE: "/api/v1/workspace",
    TEAM: "/api/v1/team",
    INVITE: "/api/v1/member-invite",
    LAST_ACTIVE_WORKSPACE: "/api/v1/last-active-workspace",
    PROJECT: "/api/v1/project",
    STATUS: "/api/v1/status",
  },
};

export const BASE_URL_CLIENT = process.env.NEXT_PUBLIC_BASE_URL_CLIENT;
export const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;

export const axiosClient = axios.create({
  baseURL: BASE_URL_API,
  withCredentials: true,
});

axiosClient.defaults.headers.post["Content-Type"] = "application/json";

axiosClient.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  async function onRejected(error) {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${BASE_URL_API}${API.AUTH.REFRESH}`, null, {
          withCredentials: true,
        });
        return axiosClient(originalRequest);
      } catch (refreshError: any) {
        if (!location.href.includes("/sign-in")) {
          location.href = `${BASE_URL_CLIENT}/sign-in`;
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
