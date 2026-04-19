import { API, axiosClient } from "@/apiConstant/apiConstant";

export const fetchUserService = async () => {
  try {
    const res = await axiosClient.get(`${API.V1.ME}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const fetchWorkspaceService = async () => {
  try {
    const res = await axiosClient.get(`${API.V1.FETCH_WORKSPACES}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const createWorkspaceService = async (payload: {
  userId: string;
  workspaceName: string;
}) => {
  try {
    const res = await axiosClient.post(`${API.V1.CREATE_WORKSPACE}`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
