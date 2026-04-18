import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWorkSpaceData = createAsyncThunk<any, any>(
  "fetchWorkSpace",
  async (payload, { rejectWithValue }) => {
    try {
    } catch (err: any) {
      rejectWithValue(err?.response?.data);
    }
  },
);
