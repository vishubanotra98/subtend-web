"use client";

import {
  fetchUserAction,
  fetchWorkspaceAction,
} from "@/Store/actions/workspace.action";
import { useAppDispatch } from "@/Store/hooks";
import { useEffect, useRef } from "react";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const init = async () => {
      await Promise.all([
        dispatch(fetchUserAction()),
        dispatch(fetchWorkspaceAction()),
      ]);
    };

    init();
  }, [dispatch]);

  return <>{children}</>;
}
