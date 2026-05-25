import { API, axiosClient } from "@/apiConstant/apiConstant";
import { InvitePayload } from "@/types/types";

export const inviteMemberService = async (payload: InvitePayload) => {
  try {
    const res = await axiosClient.post(`${API.V1.INVITE}`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const verifyInviteMemberService = async (payload: {
  email: string;
  token: string;
}) => {
  try {
    const res = await axiosClient.post(`${API.V1.VERIFY_INVITE}`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const changRoleService = async (payload: any) => {
  try {
    const res = await axiosClient.post(`${API.V1.CHANGE_ROLE}`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const removeUserService = async (params: any) => {
  try {
    const res = await axiosClient.delete(`${API.V1.REMOVE_USER}`, {
      params: params,
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};
