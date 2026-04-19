"use client";

import {
  fetchUserAction,
  fetchWorkspaceAction,
} from "@/Store/actions/workspace.action";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const dispatch = useAppDispatch();
  const {
    workspaceData: { workspaceData },
    userData,
  } = useAppSelector((state: any) => state);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchUserAction());
      await dispatch(fetchWorkspaceAction());
    };
    init();
  }, [dispatch]);

  useEffect(() => {
    if (!userData?.user?.id) {
      router.push("/sign-in");
      return;
    }

    if (workspaceData?.workspaces?.length === 0) {
      router.push("/onboarding");
      return;
    }

    const targetWorkspaceId =
      userData?.user?.lastActiveWorkspaceId ||
      workspaceData?.workspaces[0]?.workspaceId;

    if (targetWorkspaceId) {
      router.push(`/${targetWorkspaceId}/dashboard`);
    }
  }, [userData?.user?.id, workspaceData?.workspaces, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-[#0b1220] to-[#111827]">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
    </div>
  );
}
