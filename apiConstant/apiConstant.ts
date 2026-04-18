import axios from "axios";

export const API = {
  AUTH: {
    SIGN_UP: "/auth/signup",
    SIGN_IN: "/auth/signin",
    OTP_VERIFICATION: "/auth/verification",
  },
  V1: {},
};

export const BASE_URL_CLIENT = process.env.NEXT_PUBLIC_BASE_URL_CLIENT;
export const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;

export const axiosClient = axios.create({
  baseURL: BASE_URL_API,
  withCredentials: true,
});

axiosClient.defaults.headers.post["Content-Type"] = "application/json";
