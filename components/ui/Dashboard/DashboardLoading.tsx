import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen  px-6 pb-10">
      <div className="animate-pulse space-y-10">
        <header className="flex items-center justify-between">
          <Skeleton className="h-8 w-52 rounded-md bg-brand/8" />

          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-36 rounded-card bg-brand/8" />
            <Skeleton className="h-10 w-36 rounded-card bg-brand/8" />
          </div>
        </header>

        <section>
          <Skeleton className="mb-5 h-5 w-40 rounded bg-brand/8" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-card border border-default bg-card p-6 shadow-card"
              >
                <Skeleton className="h-3 w-24 bg-brand/8" />
                <Skeleton className="mt-5 h-9 w-16 bg-brand/8" />
                <Skeleton className="mt-5 h-3 w-32 bg-brand/8" />
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <Skeleton className="mb-5 h-5 w-36 bg-brand/8" />

            <div className="flex h-[320px] items-end gap-4 rounded-card border border-default bg-card p-6 shadow-card">
              {[42, 68, 52, 82, 60, 74].map((height, index) => (
                <Skeleton
                  key={index}
                  className="flex-1 rounded-t-md bg-brand/8"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="mb-5 h-5 w-32 bg-brand/8" />

            <div className="rounded-card border border-default bg-card p-6 shadow-card">
              <div className="space-y-6">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-4">
                    <Skeleton className="mt-1 h-5 w-5 rounded-full bg-brand/8" />

                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-4/5 bg-brand/8" />
                      <Skeleton className="h-3 w-28 bg-brand/8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-card border border-default bg-card p-6 shadow-card">
          <div className="mb-6 flex items-center justify-between border-b border-default pb-4">
            <Skeleton className="h-6 w-28 bg-brand/8" />
            <Skeleton className="h-8 w-36 rounded-full bg-brand/8" />
          </div>

          <div className="space-y-4">
            {[0, 1, 2, 3, 4].map((item) => (
              <Skeleton
                key={item}
                className="h-12 w-full rounded-lg bg-brand/8"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
