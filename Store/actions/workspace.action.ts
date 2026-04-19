import {
  createWorkspaceService,
  fetchUserService,
  fetchWorkspaceService,
} from "@/services/workspace.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

type WorkspacePayload = {
  userId: string;
  workspaceName: string;
};

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

export const createWorkspaceAction = createAsyncThunk<any, WorkspacePayload>(
  "createWorkspace",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createWorkspaceService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);
