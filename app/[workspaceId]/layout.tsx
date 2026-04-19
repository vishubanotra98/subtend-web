import { NAV_ITEMS } from "@/utils/constants";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/AppSideBar/AppSidebar";
import prisma from "@/lib/prisma";

export default async function MainLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: any }>) {
  const wsParams = await params;
  const session = { user: { id: "dasdadasdasdasdasd" } };
  const currentUser = session?.user;
  // if (!session) redirect("/sign-in");

  if (currentUser?.id) {
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        lastActiveWorkspaceId: wsParams.workspaceId,
      },
    });
  }

  const workspaces = await prisma.user.findUnique({
    where: {
      id: currentUser?.id,
    },
    include: { workspaces: { include: { workspace: true } } },
  });

  const teams = await prisma.team.findMany({
    where: {
      workspaceId: wsParams?.workspaceId,
    },
    include: { projects: true },

    orderBy: {
      createdAt: "desc",
    },
  });

  const workspaceMember = await prisma?.workspaceMembers?.findFirst({
    where: { userId: currentUser?.id, workspaceId: wsParams?.workspaceId },
  });

  return (
    <div>
      <SidebarProvider>
        <AppSidebar
          teams={teams}
          workspaceData={workspaces}
          currentUser={currentUser}
          workspaceMemberData={workspaceMember}
        />
        <main className="py-3 px-4 w-full bg-primary-2">
          <SidebarTrigger className=" cursor-pointer bg-transparent hover:bg-[#1f2937]" />

          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
