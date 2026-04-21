import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function SidebarLoading() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Skeleton className="mt-2 mb-3 h-6 w-24 bg-white/10" />

        <div className="rounded-md p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 bg-white/10" />
            <Skeleton className="h-4 w-24 bg-white/10" />
          </div>
          <Skeleton className="h-4 w-4 bg-white/10" />
        </div>

        <div className="mt-2 space-y-1">
          <Skeleton className="h-8 w-full rounded-md bg-white/10" />
          <Skeleton className="h-8 w-4/5 rounded-md bg-white/10" />
        </div>
      </SidebarHeader>

      <div className="h-px bg-[#1f2937] my-2" />

      <SidebarContent className="gap-0 flex flex-col justify-between">
        <SidebarGroup>
          <Skeleton className="mb-2 h-9 w-full rounded-md bg-white/10" />

          <div className="mt-2 rounded-md p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 bg-white/10" />
              <Skeleton className="h-4 w-14 bg-white/10" />
            </div>
            <Skeleton className="h-4 w-4 bg-white/10" />
          </div>

          <div className="mt-2 space-y-2 px-4">
            {[0, 1, 2].map((item) => (
              <div key={item} className="space-y-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-1.5 w-1.5 rounded-full bg-indigo-500/50" />
                  <Skeleton className="h-4 w-28 bg-white/10" />
                </div>
                <div className="ml-4 space-y-1 border-l border-[#1f2937] pl-3">
                  <Skeleton className="h-3 w-24 bg-white/10" />
                  <Skeleton className="h-3 w-20 bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <Skeleton className="h-9 w-full rounded-md bg-white/10" />
        </SidebarGroup>
      </SidebarContent>

      <div className="h-px bg-[#1f2937] my-2 opacity-50" />

      <SidebarFooter className="pb-3">
        <div className="flex items-center gap-3 w-full rounded-lg">
          <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full bg-white/10" />
            <Skeleton className="h-3 w-16 bg-white/10" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
