import { API, axiosClient } from "@/apiConstant/apiConstant";
import {
  ProjectPayloadType,
  TeamPayloadType,
  WorkspacePayloadType,
} from "@/types/types";

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

export const createWorkspaceService = async (payload: WorkspacePayloadType) => {
  try {
    const res = await axiosClient.post(`${API.V1.CREATE_WORKSPACE}`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTeamsDataService = async (workspaceId: string) => {
  try {
    const res = await axiosClient.get(`${API.V1.TEAM}/${workspaceId}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const createTeamService = async (payload: TeamPayloadType) => {
  try {
    const res = await axiosClient.post(`${API.V1.TEAM}`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const createProjectService = async (payload: ProjectPayloadType) => {
  try {
    const res = await axiosClient.post(`${API.V1.PROJECT}`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const lastActiveWorkspaceService = async (workspaceId: string) => {
  try {
    const res = await axiosClient.post(
      `${API.V1.LAST_ACTIVE_WORKSPACE}/${workspaceId}`,
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const fetchWorkspaceStatusService = async (workspaceId: string) => {
  try {
    const res = await axiosClient.get(`${API.V1.STATUS}/${workspaceId}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const fetchWorkspaceMambersService = async (workspaceId: string) => {
  try {
    const res = await axiosClient.get(
      `${API.V1.FETCH_WORKSPACES}/${workspaceId}`,
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const fetchActivitiesService = async (workspaceId: string) => {
  try {
    const res = await axiosClient.get(`${API.V1.ACTIVITIES}/${workspaceId}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const createIssueService = async (payload: any) => {
  try {
    const res = await axiosClient.post(`${API.V1.ISSUE}`, payload);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
