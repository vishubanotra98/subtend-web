import { Skeleton } from "@/components/ui/skeleton";

export default function RootPageLoading() {
  return (
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb]">
      <div className="flex min-h-screen">
        <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-[#1f2937] bg-[#0b1220] p-4">
          <Skeleton className="mb-5 h-6 w-24 bg-white/10" />

          <div className="space-y-3">
            <Skeleton className="h-9 w-full rounded-md bg-white/10" />
            <Skeleton className="h-9 w-5/6 rounded-md bg-white/10" />
            <Skeleton className="h-9 w-full rounded-md bg-white/10" />
          </div>

          <div className="mt-8 space-y-4">
            {[0, 1, 2].map((item) => (
              <div key={item} className="space-y-2">
                <Skeleton className="h-4 w-32 bg-white/10" />
                <div className="ml-3 space-y-2 border-l border-[#1f2937] pl-3">
                  <Skeleton className="h-3 w-24 bg-white/10" />
                  <Skeleton className="h-3 w-20 bg-white/10" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-3 w-16 bg-white/10" />
            </div>
          </div>
        </aside>

        <main className="flex-1 px-6 py-5">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-32 bg-white/10" />
              <Skeleton className="mt-3 h-4 w-48 bg-white/10" />
            </div>
            <Skeleton className="h-10 w-28 rounded-md bg-indigo-500/20" />
          </div>

          <section>
            <Skeleton className="mb-4 h-5 w-36 bg-white/10" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/5 bg-[#1f2937] p-6 shadow-lg"
                >
                  <Skeleton className="h-3 w-24 bg-white/10" />
                  <Skeleton className="mt-4 h-9 w-14 bg-white/10" />
                  <Skeleton className="mt-4 h-3 w-32 bg-white/10" />
                </div>
              ))}
            </div>
          </section>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="h-[300px] rounded-xl border border-white/5 bg-[#1f2937] p-6">
              <div className="flex h-full items-end gap-4">
                {[42, 68, 52, 82, 60, 74].map((height, index) => (
                  <Skeleton
                    key={index}
                    className="flex-1 rounded-t-md bg-indigo-500/20"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="h-[300px] rounded-xl border border-white/5 bg-[#1f2937] p-6">
              <div className="space-y-6">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3">
                    <Skeleton className="h-5 w-5 rounded-full bg-white/10" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-4/5 bg-white/10" />
                      <Skeleton className="h-3 w-28 bg-white/10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
