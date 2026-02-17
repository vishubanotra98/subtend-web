"use server";

import { executeAction } from "@/lib/executeAction";
import prisma from "@/lib/prisma";
import {
  RegisterUserWithConfirmSchema,
  SignInSchema,
  userSchema,
} from "@/lib/schema";
import { signIn, signOut } from "@/lib/auth";
import bcrypt from "bcrypt";
import { resend } from "@/helpers/verificationEmail";
import Email from "@/VerificationEmail/VerificationEmail";

export const google_signin = async () => {
  await signIn("google");
};

export const credentials_signIn = async (data: SignInSchema) => {
  return executeAction({
    actionFn: async () => await signIn("credentials", data),
  });
};

export const logOutAction = async () => {
  await executeAction({
    actionFn: async () => {
      await signOut();
    },
  });
};

export const signUpAction = async (
  formData: RegisterUserWithConfirmSchema,
  token: string | null,
) => {
  return executeAction({
    successMessage: token ? "" : "Verification code sent to your email.",
    actionFn: async () => {
      const validatedData = userSchema.parse(formData);

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        validatedData.password,
        saltRounds,
      );

      const verificationToken = Math.floor(
        100000 + Math.random() * 999999,
      ).toString();
      const tokenExpiryDate = new Date(Date.now() + 15 * 60 * 1000); //15 min

      if (token) {
        const ifUserExists = await prisma.invitation.findUnique({
          where: { email: validatedData?.email, token: token },
        });
        if (!ifUserExists) throw new Error("User Not Invited.");

        const workspaceId = ifUserExists?.workspaceId;

        const user = await prisma.user.create({
          data: {
            firstName: validatedData?.firstName,
            lastName: validatedData?.lastName,
            email: ifUserExists.email,
            password: hashedPassword,
            emailVerified: true,
            verificationToken: null,
            tokenExpiry: null,
            workspaces: {
              create: {
                workspaceId: ifUserExists?.workspaceId,
                role: "MEMBER",
              },
            },
          },
        });

        await prisma.invitation.delete({
          where: { id: ifUserExists?.id },
        });

        return { email: user?.email, invited: true, workspaceId };
      } else {
        const existingUser = await prisma.user.findFirst({
          where: { email: validatedData.email },
        });

        if (existingUser) {
          if (existingUser.emailVerified) {
            throw new Error("User with this email already exists.");
          }

          await prisma.user.update({
            where: { email: validatedData.email },
            data: {
              firstName: validatedData.firstName,
              lastName: validatedData.lastName,
              password: hashedPassword,
              tokenExpiry: tokenExpiryDate,
              verificationToken: verificationToken,
            },
          });
        } else {
          await prisma.user.create({
            data: {
              firstName: validatedData.firstName,
              lastName: validatedData.lastName,
              email: validatedData.email,
              password: hashedPassword,
              tokenExpiry: tokenExpiryDate,
              emailVerified: false,
              verificationToken: verificationToken,
            },
          });
        }

        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: ["banotravishu89@gmail.com"],
          subject: "TaskFlow Verification OTP",
          react: Email({
            firstName: validatedData.firstName,
            email: validatedData.email,
            verificationToken: verificationToken,
          }),
        });

        return { email: validatedData.email };
      }
    },
  });
};

export const verifyOtpAction = async (
  verificationToken: string,
  email: string,
) => {
  return executeAction({
    successMessage: "Email verified successfully.",
    actionFn: async () => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      if (user.verificationToken !== verificationToken) {
        throw new Error("Incorrect verification code.");
      }

      if (!user.tokenExpiry || new Date() > user.tokenExpiry) {
        throw new Error("Code has expired. Please request a new one.");
      }

      await prisma.user.update({
        where: { email },
        data: {
          emailVerified: true,
          verificationToken: null,
          tokenExpiry: null,
        },
      });

      return { verified: true };
    },
  });
};

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
