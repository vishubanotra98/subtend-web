import { createAsyncThunk } from "@reduxjs/toolkit";
import { InvitePayload } from "@/types/types";
import {
  changRoleService,
  inviteMemberService,
  removeUserService,
  verifyInviteMemberService,
} from "@/services/user.service";

export const inviteMemberAction = createAsyncThunk<any, InvitePayload>(
  "inviteMember",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await inviteMemberService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const verifyInviteMemberAction = createAsyncThunk<any, any>(
  "verifyInvitememberAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await verifyInviteMemberService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const changRoleAction = createAsyncThunk<any, any>(
  "changeRole",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await changRoleService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const removeUsersAction = createAsyncThunk<any, any>(
  "removeUser",
  async (params, { rejectWithValue }) => {
    try {
      const res = await removeUserService(params);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);
