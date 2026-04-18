import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchWorkSpaceData } from "../actions/workspace.action";

const initialState = {
  workspaces: [],
  loading: false,
  error: null,
};

export const workspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    setWorkspace: (state: any, action: PayloadAction) => {
      state.workspaces = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkSpaceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkSpaceData.fulfilled, (state, action: any) => {
        state.loading = false;
        state.workspaces = action.payload;
      })
      .addCase(fetchWorkSpaceData.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
