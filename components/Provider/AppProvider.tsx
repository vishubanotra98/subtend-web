"use client";

import {
  fetchUserAction,
  fetchWorkspaceAction,
} from "@/Store/actions/workspace.action";
import { useAppDispatch } from "@/Store/hooks";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const PUBLIC_ROUTES = [
  "/user-invite",
  "/sign-in",
  "/sign-up",
  "/account-verification",
];

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const didInit = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (didInit.current) return;
    if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) return;

    didInit.current = true;

    const init = async () => {
      await Promise.all([
        dispatch(fetchUserAction()),
        dispatch(fetchWorkspaceAction()),
      ]);
    };

    init();
  }, [dispatch, pathname]);

  return <>{children}</>;
}
