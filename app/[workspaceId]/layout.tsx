import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/AppSideBar/AppSidebar";

export default async function MainLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: any }>) {
  const wsParams = await params;

  return (
    <div className="h-screen bg-background">
      <SidebarProvider>
        <AppSidebar workspaceId={wsParams?.workspaceId} />

        <main className="min-w-0 flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
