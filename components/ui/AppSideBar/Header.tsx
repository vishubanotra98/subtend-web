"use client";

import Image from "next/image";
import { Building2, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

type HeaderProps = {
  workspaceData: any;
};

const Header = ({ workspaceData }: HeaderProps) => {
  const { state, toggleSidebar } = useSidebar();

  const isCollapsed = state === "collapsed";

  const currentWorkspace = workspaceData?.workspaces?.[0]?.workspace;

  return (
    <header className="shrink-0">
      <div
        className={`flex h-11 py-8 items-center ${isCollapsed ? "justify-center px-2" : "justify-between px-3"}`}
      >
        {!isCollapsed && (
          <div className="flex size-9 items-center justify-center rounded-lg border border-brand/20 bg-brand/5">
            <Image
              src="/assets/svg/subtend.svg"
              alt="Subtend"
              width={30}
              height={30}
              priority
              className="h-auto w-7 object-contain"
            />
          </div>
        )}

        <button
          type="button"
          onClick={toggleSidebar}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex size-7 shrink-0 items-center justify-center rounded-md text-secondary transition-colors duration-150 hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 cursor-pointer"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="size-[17px]" />
          ) : (
            <PanelLeftClose className="size-[17px]" />
          )}
        </button>
      </div>

      <div className={isCollapsed ? "px-2 pb-3" : "px-2 pb-3"}>
        <div
          className={`
            flex min-h-10 w-full items-center rounded-lg
            transition-colors duration-150
            ${isCollapsed ? "justify-center p-1" : "gap-2.5 px-2 py-1.5"}
          `}
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-default bg-accent">
            <Building2 className="size-3.5 text-brand" />
          </div>

          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-primary">
                {currentWorkspace?.name || "Workspace"}
              </p>

              <p className="mt-0.5 text-[11px] leading-none text-secondary">
                Workspace
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
