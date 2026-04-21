import {
  createProjectService,
  createTeamService,
  createWorkspaceService,
  fetchTeamsDataService,
  fetchUserService,
  fetchWorkspaceService,
  lastActiveWorkspaceService,
} from "@/services/workspace.service";
import {
  ProjectPayloadType,
  TeamPayloadType,
  WorkspacePayloadType,
} from "@/types/types";
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

export const createWorkspaceAction = createAsyncThunk<
  any,
  WorkspacePayloadType
>("createWorkspace", async (payload, { rejectWithValue }) => {
  try {
    const res = await createWorkspaceService(payload);
    return res;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data);
  }
});

export const fetchTeamsDataAction = createAsyncThunk<any, string>(
  "fetchTeams",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const res = await fetchTeamsDataService(workspaceId);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const createTeamAction = createAsyncThunk<any, TeamPayloadType>(
  "createTeam",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createTeamService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const createProjectAction = createAsyncThunk<any, ProjectPayloadType>(
  "createProject",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createProjectService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const lastActiveWorkspaceAction = createAsyncThunk<any, string>(
  "lastActiveWorkspace",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const res = await lastActiveWorkspaceService(workspaceId);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);
