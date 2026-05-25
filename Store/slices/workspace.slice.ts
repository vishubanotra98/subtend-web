import { createSlice } from "@reduxjs/toolkit";
import {
  completedIssueCountAction,
  fetchActivitiesAction,
  fetchIssuesAction,
  fetchIssuesByProjectAction,
  fetchTeamsDataAction,
  fetchWorkspaceAction,
  fetchWorkspaceMambersAction,
  fetchWorkspaceStatusAction,
} from "../actions/workspace.action";

type WorkspaceState = {
  workspaceData: unknown | null;
  workspaceMembers: unknown[];
  workspaceStatus: unknown[];
  workspaceActivities: unknown[];
  dashboardCount: unknown[];
  teamsData: unknown | null;
  issuesData: unknown[];
  projectIssues: unknown[];
  teamsWorkspaceId: string | null;
  statusWorkspaceId: string | null;
  membersWorkspaceId: string | null;
  activitiesWorkspaceId: string | null;
  issuesWorkspaceId: string | null;
  loading: boolean;
  message: string | null;
  error: string | null;
};

type ApiData = {
  status?: unknown[];
  members?: unknown[];
  activities?: unknown[];
  issues?: unknown[];
  completedTasks?: unknown[];
};

type ApiResponse = {
  data?: ApiData | unknown;
  message?: string | null;
};

const getData = (payload?: ApiResponse) => payload?.data as ApiData | undefined;

const hasMessage = (payload: unknown): payload is { message?: string } =>
  typeof payload === "object" && payload !== null && "message" in payload;

const getErrorMessage = (action: {
  payload?: unknown;
  error?: { message?: string };
}) =>
  (hasMessage(action.payload) ? action.payload.message : action.error?.message) ??
  null;

const initialState: WorkspaceState = {
  workspaceData: null,
  workspaceMembers: [],
  workspaceStatus: [],
  workspaceActivities: [],
  dashboardCount: [],
  teamsData: null,
  issuesData: [],
  projectIssues: [],
  teamsWorkspaceId: null,
  statusWorkspaceId: null,
  membersWorkspaceId: null,
  activitiesWorkspaceId: null,
  issuesWorkspaceId: null,
  loading: false,
  message: null,
  error: null,
};

export const workspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceAction.fulfilled, (state, action) => {
        state.loading = false;
        state.workspaceData = action.payload?.data;
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchWorkspaceAction.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action);
      });

    builder
      .addCase(fetchTeamsDataAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamsDataAction.fulfilled, (state, action) => {
        state.loading = false;
        state.teamsData = action.payload?.data;
        state.teamsWorkspaceId = action.meta.arg;
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchTeamsDataAction.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action);
      });

    builder
      .addCase(fetchWorkspaceStatusAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceStatusAction.fulfilled, (state, action) => {
        state.loading = false;
        state.workspaceStatus = getData(action.payload)?.status ?? [];
        state.statusWorkspaceId = action.meta.arg;
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchWorkspaceStatusAction.rejected, (state, action) => {
        state.loading = false;
        state.workspaceStatus = [];
        state.error = getErrorMessage(action);
      });

    builder
      .addCase(fetchWorkspaceMambersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceMambersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.workspaceMembers = getData(action.payload)?.members ?? [];
        state.membersWorkspaceId = action.meta.arg;
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchWorkspaceMambersAction.rejected, (state, action) => {
        state.loading = false;
        state.workspaceMembers = [];
        state.error = getErrorMessage(action);
      });

    builder
      .addCase(fetchActivitiesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivitiesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.workspaceActivities = getData(action.payload)?.activities ?? [];
        state.activitiesWorkspaceId = action.meta.arg;
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchActivitiesAction.rejected, (state, action) => {
        state.loading = false;
        state.workspaceActivities = [];
        state.error = getErrorMessage(action);
      });

    builder
      .addCase(fetchIssuesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.issuesData = getData(action.payload)?.issues ?? [];
        state.issuesWorkspaceId = action.meta.arg;
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchIssuesAction.rejected, (state, action) => {
        state.loading = false;
        state.issuesData = [];
        state.error = getErrorMessage(action);
      });

    builder
      .addCase(completedIssueCountAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completedIssueCountAction.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardCount = getData(action.payload)?.completedTasks ?? [];
        state.message = action.payload?.message ?? null;
      })
      .addCase(completedIssueCountAction.rejected, (state, action) => {
        state.loading = false;
        state.dashboardCount = [];
        state.error = getErrorMessage(action);
      });

    builder
      .addCase(fetchIssuesByProjectAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesByProjectAction.fulfilled, (state, action) => {
        state.loading = false;
        state.projectIssues = getData(action.payload)?.issues ?? [];
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchIssuesByProjectAction.rejected, (state, action) => {
        state.loading = false;
        state.projectIssues = [];
        state.error = getErrorMessage(action);
      });
  },
});

export default workspaceSlice.reducer;
