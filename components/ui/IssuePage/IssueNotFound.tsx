import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../button";
import { useSearchParams } from "next/navigation";

const IssueNotFound = () => {
  const searchParams = useSearchParams();
  const fromDashboard = Boolean(searchParams.get("dashboard"));
  const { workspaceId, teamId, projectId } = useParams();
  const router = useRouter();
  return (
    <div className="w-[90%] mx-auto h-[70vh] flex items-center justify-center">
      <div className="bg-secondary border border-brand/30 rounded-lg px-8 py-10 text-center max-w-md shadow-sm">
        <h2 className="text-xl font-semibold text-primary">Issue Not Found</h2>

        <p className="text-sm text-secondary mt-2">
          The issue you're looking for doesn't exist or may have been deleted.
        </p>

        <Button
          onClick={() => {
            if (fromDashboard) {
              router.push(`/${workspaceId}/dashboard`);
            } else {
              router.push(
                `/${workspaceId}/team/${teamId}/project/${projectId}`,
              );
            }
          }}
          className="mt-6 button-primary inline-flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          {fromDashboard ? "Back to Dashboard" : "Back to Project"}
        </Button>
      </div>
    </div>
  );
};

export default IssueNotFound;
