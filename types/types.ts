import { RegisterUserWithConfirmSchema } from "@/lib/schema";

export type ActivityAction =
  | "CREATED"
  | "DELETED"
  | "STATUS_CHANGED"
  | "PRIORITY_CHANGED"
  | "ASSIGNED"
  | "DETAILS_UPDATED";

export interface ActivityInterface {
  action: ActivityAction;
  entityTitle: string;
  userId: string;
  workspaceId: string;
  teamId: string;
  projectId: string;
  issueId: string;
  beforeState?: any;
  afterState?: any;
}

export type UserInterface = {
  id: string;
  email: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  image: string;
  lastActiveWorkspaceId: string | null;
};

export interface SignupPayloadInterface {
  formData: RegisterUserWithConfirmSchema;
  token: string | null;
  isAdmin: boolean;
}

export interface SignInInterface {
  email: string;
  password: string;
}

export interface OtpVerificationInterface {
  email: string;
  otp: string;
}

export type UserActionType = {
  user: UserInterface | null;
  message: null | string;
  loading: boolean;
  error: null | string;
  code: string;
};

export type WorkspacePayloadType = {
  userId: string;
  workspaceName: string;
};

export type TeamPayloadType = {
  workspaceId: string;
  teamName: string;
};

export type ProjectPayloadType = {
  teamId: string;
  projectName: string;
};

export type InvitePayload = {
  email: string;
  workspaceId: string;
  role: string;
};

export type WorkspaceItem = {
  workspace?: {
    id?: string;
    [key: string]: unknown;
  };
};

export type WorkspaceListData = {
  adminList?: string[];
  workspaces?: WorkspaceItem[];
};

export type Team = {
  projects?: unknown[];
  [key: string]: unknown;
};

export type TeamsData = {
  teamData?: Team[];
};

export type Status = {
  id?: string;
  name?: string;
  [key: string]: unknown;
};

export type Issue = {
  assigneeId?: string;
  priority?: string;
  statusId?: string;
  [key: string]: unknown;
};

export type Params = {
  workspaceId: string;
  teamId: string;
  projectId: string;
  issueId: string;
};

export type IssueType = {
  assigneeId: string;
  description: string;
  id: null;
  priority: string;
  projectId: string;
  statusId: string;
  ticket_num: null;
  title: string;
};

export type ProjectItem = {
  id: string;
  name: string;
};

export type SidebarTeamType = {
  id: string;
  name: string;
  projects?: ProjectItem[];
};

export type SidebarTeamsData = {
  teamData?: SidebarTeamType[];
};

export type SidebarWorkspaceData = {
  adminList?: string[];
};

export type AppSidebarProps = {
  workspaceId: string;
};

export type TeamItemProps = {
  team: SidebarTeamType;
  params: {
    workspaceId?: string | string[];
    teamId?: string | string[];
    projectId?: string | string[];
  };
  isAdmin?: boolean;
};
