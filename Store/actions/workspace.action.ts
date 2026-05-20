import {
  completedIssueCountService,
  createIssueService,
  createProjectService,
  createTeamService,
  createWorkspaceService,
  deletedIssueService,
  editIssueService,
  fetchActivitiesService,
  fetchIssuesByProjectService,
  fetchIssuesService,
  fetchTeamsDataService,
  fetchUserService,
  fetchWorkspaceMambersService,
  fetchWorkspaceService,
  fetchWorkspaceStatusService,
  lastActiveWorkspaceService,
  moveCardService,
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

export const fetchWorkspaceStatusAction = createAsyncThunk<any, string>(
  "workspaceStatus",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const res = await fetchWorkspaceStatusService(workspaceId);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const fetchWorkspaceMambersAction = createAsyncThunk<any, string>(
  "workspaceMembers",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const res = await fetchWorkspaceMambersService(workspaceId);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const fetchActivitiesAction = createAsyncThunk<any, string>(
  "fetchActivities",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const res = await fetchActivitiesService(workspaceId);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const createIssueAction = createAsyncThunk<any, any>(
  "createIssue",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createIssueService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const fetchIssuesAction = createAsyncThunk<any, string>(
  "fetchIssues",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const res = await fetchIssuesService(workspaceId);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const editIssueAction = createAsyncThunk<any, any>(
  "editIssue",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await editIssueService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const completedIssueCountAction = createAsyncThunk<any, any>(
  "completedIssueCount",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await completedIssueCountService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const fetchIssuesByProjectAction = createAsyncThunk<any, any>(
  "issuesByProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await fetchIssuesByProjectService(projectId);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const moveCardAction = createAsyncThunk<any, any>(
  "moveCard",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await moveCardService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const deleteIssueAction = createAsyncThunk<any, any>(
  "deleteIssue",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await deletedIssueService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);
