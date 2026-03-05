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
