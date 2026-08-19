"use client";

export default function StatusSummary({ statusCountList }: any) {
  const totalIssues =
    statusCountList?.reduce(
      (acc: number, status: any) => acc + status?.count,
      0,
    ) ?? 0;

  return (
    <section className="flex h-full flex-col gap-4">
     
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-base font-semibold text-primary">
            Issues by Status
          </h2>

          <p className="mt-1 text-sm text-secondary">
            Current distribution across the workspace.
          </p>
        </div>

        <span className="text-xs font-medium tabular-nums text-secondary">
          {totalIssues} issues
        </span>
      </div>

     
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-card border border-default bg-card shadow-card">
        {totalIssues > 0 && (
          <div className="flex h-1.5 w-full overflow-hidden bg-secondary/40">
            {statusCountList?.map((status: any) => {
              const percentage = (status?.count / totalIssues) * 100;

              return (
                <div
                  key={status.id}
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: status.color,
                  }}
                  className="transition-all duration-300"
                />
              );
            })}
          </div>
        )}

        <div className="flex min-h-0 flex-1 flex-col">
          {statusCountList?.map((status: any, index: number) => (
            <div
              key={status?.id}
              className={`
                group
                flex
                flex-1
                items-center
                justify-between
                px-5
                py-3.5
                transition-normal
                hover:bg-secondary/40
                ${
                  index !== statusCountList.length - 1
                    ? "border-b border-default"
                    : ""
                }
              `}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor: status?.color,
                  }}
                />

                <span className="truncate text-sm font-medium text-primary">
                  {status?.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {totalIssues > 0 && (
                  <span className="text-xs tabular-nums text-secondary">
                    {Math.round((status?.count / totalIssues) * 100)}%
                  </span>
                )}

                <span className="min-w-[24px] text-right text-sm font-semibold tabular-nums text-primary">
                  {status?.count}
                </span>
              </div>
            </div>
          ))}

          {(!statusCountList || statusCountList.length === 0) && (
            <div className="flex flex-1 items-center justify-center px-6">
              <div className="text-center">
                <p className="text-sm font-medium text-primary">
                  No issue data
                </p>

                <p className="mt-1 text-xs text-secondary">
                  Status information will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
