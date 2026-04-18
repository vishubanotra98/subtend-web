

export const verifyInviteMember = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  return executeAction({
    successMessage: "Verified Successfully",
    actionFn: async () => {
      const existingInvite = await prisma.invitation.findUnique({
        where: { token: token },
      });

      if (!existingInvite) {
        throw new Error("Invalid invitation token.");
      }

      if (existingInvite.email !== email) {
        throw new Error(
          "This invitation belongs to a different email address.",
        );
      }

      const hasExpired = new Date(existingInvite.expires) < new Date();
      if (hasExpired) {
        throw new Error("Invitation has expired.");
      }
    },
  });
};
