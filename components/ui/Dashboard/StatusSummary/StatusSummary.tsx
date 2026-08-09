"use client";

export default function StatusSummary({ statusCountList }: any) {
  const totalIssues = statusCountList?.reduce(
    (acc: any, status: any) => acc + status?.count,
    0,
  );
  return (
    <section className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">Issues by Status</h2>

        <span className="text-sm text-secondary">{totalIssues} Issues</span>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-card border border-default bg-card shadow-card">
        <div className="flex h-1.5 overflow-hidden border-b border-default">
          {statusCountList.map((status: any) => (
            <div
              key={status.id}
              style={{
                width: `${(status.count / totalIssues) * 100}%`,
                backgroundColor: status.color,
              }}
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col divide-y divide-default">
          {statusCountList.map((status: any) => (
            <div
              key={status?.id}
              className="group flex flex-1 items-center justify-between px-6 py-3.5 transition-normal hover-card"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: status?.color }}
                />

                <span className="text-sm font-medium text-primary">
                  {status?.name}
                </span>
              </div>

              <span className="text-sm font-semibold tabular-nums text-primary">
                {status?.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
