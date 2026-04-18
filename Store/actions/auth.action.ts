import { RegisterUserWithConfirmSchema } from "@/lib/schema";
import {
  otpVerificationService,
  signInService,
  signUpService,
} from "@/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface SignupPayloadInterface {
  formData: RegisterUserWithConfirmSchema;
  token: string | null;
  isAdmin: boolean;
}

interface SignInInterface {
  email: string;
  password: string;
}

interface OtpVerificationInterface {
  email: string;
  otp: string;
}

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
