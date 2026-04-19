import { createSlice } from "@reduxjs/toolkit";
import { fetchUserAction } from "../actions/workspace.action";

type UserInterface = {
  id: string;
  email: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  image: string;
  lastActiveWorkspaceId: string | null;
};

type UserActionType = {
  user: UserInterface | null;
  message: null | string;
  loading: boolean;
  error: null | string;
  code: string;
};

const initialState: UserActionType = {
  user: null,
  message: "",
  loading: false,
  error: "",
  code: "",
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
