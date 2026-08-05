"use client";

const statuses = [
  {
    id: "1",
    name: "Todo",
    count: 18,
    color: "#64748B",
  },
  {
    id: "2",
    name: "In Progress",
    count: 9,
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "In Review",
    count: 4,
    color: "#F59E0B",
  },
  {
    id: "4",
    name: "Blocked",
    count: 2,
    color: "#EF4444",
  },
  {
    id: "5",
    name: "Done",
    count: 73,
    color: "#22C55E",
  },
];

const totalIssues = statuses.reduce((acc, status) => acc + status.count, 0);

export default function StatusSummary() {
  return (
    <section className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">Issues by Status</h2>

        <span className="text-sm text-secondary">{totalIssues} Issues</span>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-card border border-default bg-card shadow-card">
        <div className="flex h-1.5 overflow-hidden border-b border-default">
          {statuses.map((status) => (
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
          {statuses.map((status) => (
            <div
              key={status.id}
              className="group flex flex-1 items-center justify-between px-6 py-3.5 transition-normal hover-card"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: status.color }}
                />

                <span className="text-sm font-medium text-primary">
                  {status.name}
                </span>
              </div>

              <span className="text-sm font-semibold tabular-nums text-primary">
                {status.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
