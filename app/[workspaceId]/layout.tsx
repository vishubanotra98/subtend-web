import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/AppSideBar/AppSidebar";

export default async function MainLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: any }>) {
  const wsParams = await params;

  return (
    <div>
      <SidebarProvider>
        <AppSidebar workspaceId={wsParams?.workspaceId} />
        <main className="py-3 px-4 w-full bg-primary-2">
          <SidebarTrigger className=" cursor-pointer bg-transparent hover:bg-[#1f2937]" />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
