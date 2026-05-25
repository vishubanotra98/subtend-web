import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#111827] px-6 pb-10 text-[#e5e7eb]">
      <div className="animate-pulse">
        <header className="flex justify-between items-center mb-12">
          <Skeleton className="h-8 w-44 bg-white/10" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-36 rounded-md bg-indigo-500/20" />
            <Skeleton className="h-10 w-36 rounded-md bg-indigo-500/20" />
          </div>
        </header>

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

        <main className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <Skeleton className="h-5 mt-10 w-36 mb-4 bg-white/10" />
              <div className="bg-[#1f2937] p-6 rounded-xl border border-white/5 h-[300px] flex items-end gap-4">
                {[42, 68, 52, 82, 60, 74].map((height, index) => (
                  <Skeleton
                    key={index}
                    className="flex-1 rounded-t-md bg-indigo-500/20"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <Skeleton className="h-5 w-32 mt-10 mb-4 bg-white/10" />
              <div className="bg-[#1f2937] border border-white/5 rounded-xl p-5 h-[300px]">
                <ul className="space-y-6">
                  {[0, 1, 2, 3].map((item) => (
                    <li
                      key={item}
                      className="relative pl-8 flex flex-col gap-2"
                    >
                      <Skeleton className="absolute left-0 top-1 w-5 h-5 rounded-full bg-white/10" />
                      <Skeleton className="h-4 w-4/5 bg-white/10" />
                      <Skeleton className="h-3 w-28 bg-white/10" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#1f2937] border border-white/5 rounded-xl p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <Skeleton className="h-6 w-24 bg-white/10" />
              <Skeleton className="h-7 w-32 rounded-full bg-[#111827]" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-20 bg-white/10" />
              <ul className="grid gap-3"></ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
