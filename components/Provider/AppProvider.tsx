"use client";

import {
  fetchUserAction,
  fetchWorkspaceAction,
} from "@/Store/actions/workspace.action";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { useEffect } from "react";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchUserAction());
      await dispatch(fetchWorkspaceAction());
    };
    init();
  }, [dispatch]);

  return <>{children}</>;
}
