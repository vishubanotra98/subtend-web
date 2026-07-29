"use client";

import { useAppSelector } from "@/Store/hooks";
import RootPageLoading from "@/components/ui/AppLoading/RootPageLoading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const {
    workspaceData: { workspaceData, loading: workspaceLoading },
    userData,
  } = useAppSelector((state: any) => state);
  const router = useRouter();

  useEffect(() => {
    if (userData?.loading || workspaceLoading) return;
    if (!userData?.user && !userData?.code) return;

    if (!userData?.user?.id) {
      router.push("/sign-in");
      return;
    }

    if (!workspaceData?.workspaces) return;

    if (workspaceData?.workspaces?.length === 0) {
      router.push("/onboarding");
      return;
    }

    const targetWorkspaceId = workspaceData?.workspaces[0]?.workspaceId;

    if (targetWorkspaceId) {
      router.push(`/${targetWorkspaceId}/dashboard`);
    }
  }, [
    userData?.loading,
    workspaceLoading,
    userData?.code,
    userData?.user,
    userData?.user?.id,
    workspaceData?.workspaces,
    router,
  ]);

  return <RootPageLoading />;
}
