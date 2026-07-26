import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const IssueNotFound = () => {
  const { workspaceId, teamId, projectId } = useParams();
  const router = useRouter();
  return (
    <div className="w-[90%] mx-auto h-[70vh] flex items-center justify-center">
      <div className="bg-[#1F2937] border border-[#374151] rounded-lg px-8 py-10 text-center max-w-md shadow-sm">
        <h2 className="text-xl font-semibold text-gray-100">Issue Not Found</h2>

        <p className="text-sm text-gray-400 mt-2">
          The issue you're looking for doesn't exist or may have been deleted.
        </p>

        <button
          onClick={() =>
            router.push(`/${workspaceId}/team/${teamId}/project/${projectId}`)
          }
          className="mt-6 button-primary !px-6 !py-2 inline-flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          Back to Project
        </button>
      </div>
    </div>
  );
};

export default IssueNotFound;
