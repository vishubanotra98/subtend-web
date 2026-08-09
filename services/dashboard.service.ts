import { API, axiosClient } from "@/apiConstant/apiConstant";

export const dashboardAttentionService = async (workspaceId: string) => {
  try {
    const res = await axiosClient.get(`${API.V1.ATTENTION}/${workspaceId}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
