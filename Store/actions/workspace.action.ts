import {
  fetchUserService,
  fetchWorkspaceService,
} from "@/services/workspace.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserAction = createAsyncThunk<any, void>(
  "fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchUserService();
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const fetchWorkspaceAction = createAsyncThunk<any, void>(
  "fetchWorkSpaces",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchWorkspaceService();
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);
