import axios from "axios";

export const API = {
  AUTH: {
    SIGN_UP: "/auth/signup",
    SIGN_IN: "/auth/signin",
    REFRESH: "/auth/refresh",
    OTP_VERIFICATION: "/auth/verification",
    LOGOUT: "/auth/logout",
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
    ISSUE: "/api/v1/issue",
    MOVE_ISSE: "/api/v1/issue-move",
    ACTIVITIES: "/api/v1/activities",
    COMPLETED_COUNT: "/api/v1/completed/count",
    VERIFY_INVITE: "/api/v1/verify-invite",
    CHANGE_ROLE: "/api/v1/change-role",
    REMOVE_USER: "/api/v1/remove-user",
  },
};

export const BASE_URL_CLIENT = process.env.NEXT_PUBLIC_BASE_URL_CLIENT;
export const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;

export const axiosClient = axios.create({
  baseURL: BASE_URL_API,
  withCredentials: true,
});

axiosClient.defaults.headers.post["Content-Type"] = "application/json";
const AUTH_ROUTES = [...Object.values(API.AUTH), API.V1.VERIFY_INVITE];
const isAuthRoute = (url?: string) => {
  if (!url) return false;

  return AUTH_ROUTES.some((route) => url.includes(route));
};

axiosClient.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  async function onRejected(error) {
    const originalRequest = error.config;
    const shouldTryRefresh =
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isAuthRoute(originalRequest?.url);

    if (shouldTryRefresh) {
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
