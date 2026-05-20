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

const initialState = {
  workspaceData: null,
  workspaceMembers: [],
  workspaceStatus: [],
  workspaceActivities: [],
  dashboardCount: [],
  teamsData: null,
  issuesData: [],
  projectIssues: [],
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
      .addCase(fetchWorkspaceAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.workspaceData = action.payload?.data;
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchWorkspaceAction.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message ?? action.error?.message ?? null;
      });

    builder
      .addCase(fetchTeamsDataAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamsDataAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.teamsData = action.payload?.data;
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchTeamsDataAction.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message ?? action.error?.message ?? null;
      });

    builder
      .addCase(fetchWorkspaceStatusAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceStatusAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.workspaceStatus = action.payload?.data?.status ?? [];
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchWorkspaceStatusAction.rejected, (state, action: any) => {
        state.loading = false;
        state.workspaceStatus = [];
        state.error = action.payload?.message ?? action.error?.message ?? null;
      });

    builder
      .addCase(fetchWorkspaceMambersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceMambersAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.workspaceMembers = action.payload?.data?.members ?? [];
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchWorkspaceMambersAction.rejected, (state, action: any) => {
        state.loading = false;
        state.workspaceMembers = [];
        state.error = action.payload?.message ?? action.error?.message ?? null;
      });

    builder
      .addCase(fetchActivitiesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivitiesAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.workspaceActivities = action.payload?.data?.activities ?? [];
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchActivitiesAction.rejected, (state, action: any) => {
        state.loading = false;
        state.workspaceActivities = [];
        state.error = action.payload?.message ?? action.error?.message ?? null;
      });

    builder
      .addCase(fetchIssuesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.issuesData = action.payload?.data?.issues ?? [];
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchIssuesAction.rejected, (state, action: any) => {
        state.loading = false;
        state.issuesData = [];
        state.error = action.payload?.message ?? action.error?.message ?? null;
      });

    builder
      .addCase(completedIssueCountAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completedIssueCountAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.dashboardCount = action.payload?.data?.completedTasks ?? [];
        state.message = action.payload?.message ?? null;
      })
      .addCase(completedIssueCountAction.rejected, (state, action: any) => {
        state.loading = false;
        state.dashboardCount = [];
        state.error = action.payload?.message ?? action.error?.message ?? null;
      });

    builder
      .addCase(fetchIssuesByProjectAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssuesByProjectAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.projectIssues = action.payload?.data?.issues ?? [];
        state.message = action.payload?.message ?? null;
      })
      .addCase(fetchIssuesByProjectAction.rejected, (state, action: any) => {
        state.loading = false;
        state.projectIssues = [];
        state.error = action.payload?.message ?? action.error?.message ?? null;
      });
  },
});

export default workspaceSlice.reducer;
