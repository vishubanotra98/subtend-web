import { API, axiosClient } from "@/apiConstant/apiConstant";

export const signUpService = async (payload: any) => {
  try {
    const res = await axiosClient.post(`${API.AUTH.SIGN_UP}`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const signInService = async (payload: any) => {
  try {
    const res = await axiosClient.post(`${API.AUTH.SIGN_IN}`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const otpVerificationService = async (payload: any) => {
  try {
    const res = await axiosClient.post(`${API.AUTH.OTP_VERIFICATION}`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
