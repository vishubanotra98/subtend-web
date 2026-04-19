import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchWorkspaceAction } from "../actions/workspace.action";

const initialState = {
  workspaceData: null,
  loading: false,
  message: null,
  code: null,
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
        state.code = action.payload.code;
        state.message = action.payload.message;
      })
      .addCase(fetchWorkspaceAction.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message;
        state.code = action.payload.code;
      });
  },
});

export default workspaceSlice.reducer;
