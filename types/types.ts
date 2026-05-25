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
