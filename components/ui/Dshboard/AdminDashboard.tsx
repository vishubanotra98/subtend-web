import DashboardButton from "@/components/Common/TeamDashboardButton";
import Card from "../Card/Card";
import TaskBarChart from "../Chart/BarChart";

export default function AdminDashboard({
  totalTeamCount,
  totalIssuesCount,
  totalMembers,
  selectedWorkspace,
  workspaceId,
  totalProjectsCount,
  activities,
}: any) {
  return (
    <div>
      <header className="flex justify-between items-center mb-12">
        <h3 className="text-2xl font-semibold">{selectedWorkspace?.name}</h3>
        <DashboardButton workspaceId={workspaceId} />
      </header>

      <main className="space-y-10">
        <section>
          <h4 className="font-semibold mb-4">Workspace Summary</h4>
          <div className="flex flex-wrap gap-4">
            <Card
              title="Teams"
              data={totalTeamCount}
              className="bg-[#1f2937] border-white/5"
              desc="This is the description for Teams"
            />
            <Card
              title="Issues"
              data={totalIssuesCount}
              className="bg-[#1f2937] border-white/5"
              desc={totalIssuesCount < 1 ? "No Issues Found" : ""}
            />
            <Card
              title="Members"
              data={totalMembers}
              className="bg-[#1f2937] border-white/5"
              desc="desc for members"
            />

            <Card
              title="Projects"
              data={totalProjectsCount}
              className="bg-[#1f2937] border-white/5"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4">Task Completion</h4>
            <div className="bg-[#1f2937] p-6 rounded-xl border border-white/5 h-[300px]">
              <TaskBarChart />
            </div>
          </div>

          <div className="h-[300px]">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="font-semibold">Recent Activity</h4>
            </div>
            <div className=" bg-[#1f2937] border border-white/5 rounded-xl p-5 h-full">
              <ul className="relative space-y-6 before:absolute before:left-[9px]  before:w-[1px]">
                {activities.map((item: any) => (
                  <li
                    key={item.id}
                    className="relative pl-8 flex flex-col gap-1"
                  >
                    <div className="absolute left-0 top-1 w-[20px] h-[20px] bg-[#111827] border border-white/10 rounded-full flex items-center justify-center z-10">
                      {item.icon}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-white">
                        {item.user}
                      </span>
                      <span className="text-gray-400"> {item.action} </span>
                      <span className="text-indigo-400 hover:underline cursor-pointer">
                        {item.task}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
