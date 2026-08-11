"use client";

import { useAppSelector } from "@/Store/hooks";
import SubtendLoader from "@/components/Loader/SubtendLoader";
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

  return (
    <div className="w-full h-[84vh] flex justify-center items-center">
      <div className="flex flex-col items-center">
        <SubtendLoader />
        <span className="font-[Poppins] text-secondary text-[42px] font-semibold tracking-wide">
          subtend
        </span>
      </div>
    </div>
  );
}
