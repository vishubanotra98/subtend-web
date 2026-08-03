import Dashboard from "@/components/ui/Dashboard/Dashboard";

export default async function DashboardMain({ params }: any) {
  const { workspaceId } = await params;
  return <Dashboard workspaceId={workspaceId} />;
}
