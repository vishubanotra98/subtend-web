import { dashboardAttentionService } from "@/services/dashboard.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const dashboardAttentionAction = createAsyncThunk<any, string>(
  "dashboardAttention",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const res = await dashboardAttentionService(workspaceId);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);
