"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/AppSideBar/AppSidebar";
import { PageContainer } from "@/components/Layout/PageContainer";
import { WebSocketProvider } from "@/components/Provider/WebSocketProvider";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/Store/hooks";
import SubtendLoader from "@/components/Loader/SubtendLoader";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const { userData } = useAppSelector((state: any) => state);
  const userId = userData?.user?.id;

  if (userData?.loading || !userId) {
    return (
      <div className="w-full h-[84vh] flex justify-center items-center">
        <SubtendLoader />
      </div>
    );
  }

  return (
    <WebSocketProvider workspaceId={workspaceId} userId={userId}>
      <SidebarProvider defaultOpen>
        <div className="flex h-screen w-full overflow-hidden bg-background">
          <AppSidebar workspaceId={workspaceId} />

          <main className="min-w-0 flex-1 overflow-y-auto">
            <PageContainer>{children}</PageContainer>
          </main>
        </div>
      </SidebarProvider>
    </WebSocketProvider>
  );
}
