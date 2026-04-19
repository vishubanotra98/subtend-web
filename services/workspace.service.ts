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
