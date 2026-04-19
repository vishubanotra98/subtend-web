import { createSlice } from "@reduxjs/toolkit";
import { fetchUserAction } from "../actions/workspace.action";

const initialState = {
  user: null,
  message: null,
  loading: false,
  error: null,
  code: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.message = action.payload.message;
        state.code = action.payload.code;
        state.user = action.payload.data?.user;
      })
      .addCase(fetchUserAction.rejected, (state, action: any) => {
        state.loading = false;
        state.code = action.payload.code;
        state.error = action.payload?.message;
      });
  },
});

export default userSlice.reducer;
