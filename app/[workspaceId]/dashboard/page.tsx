import Dashboard from "@/components/ui/Dshboard/Dashboard";

export default async function DashboardMain({ params }: any) {
  const { workspaceId } = await params;
  return <Dashboard workspaceId={workspaceId} />;
}
