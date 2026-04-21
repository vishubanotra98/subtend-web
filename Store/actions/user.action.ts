import { createAsyncThunk } from "@reduxjs/toolkit";
import { InvitePayload } from "@/types/types";
import { inviteMemberService } from "@/services/user.service";

export const inviteMemberAction = createAsyncThunk<any, InvitePayload>(
  "inviteMember",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await inviteMemberService(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  },
);
