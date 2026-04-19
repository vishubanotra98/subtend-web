import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "@/Store/slices/workspace.slice";
import userReducer from "@/Store/slices/user.slice";

export const store = configureStore({
  reducer: {
    userData: userReducer,
    workspaceData: workspaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
