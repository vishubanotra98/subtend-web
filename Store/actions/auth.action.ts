import {
  logoutService,
  otpVerificationService,
  signInService,
  signUpService,
} from "@/services/auth.service";
import {
  OtpVerificationInterface,
  SignInInterface,
  SignupPayloadInterface,
} from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUpAction = createAsyncThunk<any, SignupPayloadInterface>(
  "signUp",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await signUpService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const signInAction = createAsyncThunk<any, SignInInterface>(
  "signIn",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await signInService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const otpVerificationAction = createAsyncThunk<
  any,
  OtpVerificationInterface
>("otpVerification", async (payload, { rejectWithValue }) => {
  try {
    const res = await otpVerificationService(payload);
    return res;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data);
  }
});

export const logoutAction = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutService();
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

// export const githubLoginAction = createAsyncThunk(
//   "githubLogin",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await logoutService();
//       return res;
//     } catch (err: any) {
//       return rejectWithValue(err?.response?.data);
//     }
//   },
// );
