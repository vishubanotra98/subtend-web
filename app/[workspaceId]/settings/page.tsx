import WorkspaceSettings from "@/components/ui/WorkspaceSettings/WorkspaceSettings";

export default async function ({ params }: any) {
  const { workspaceId } = await params;
  const session = await auth();

  const workspaceMembers = await prisma.workspaceMembers.findMany({
    where: { workspaceId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          firstName: true,
          lastName: true,
          image: true,
          email: true,
        },
      },
    },
  });

  return (
    <div>
      <WorkspaceSettings
        workspaceMembers={workspaceMembers}
        currentUser={session?.user?.id}
      />
    </div>
  );
}
