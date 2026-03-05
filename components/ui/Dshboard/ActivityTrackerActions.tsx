export const GetActivity = ({
  item,
  getStatusName,
  findMember,
  getName,
}: any) => {
  const statuses = getStatusName(item);
  const selectedMember = findMember(item?.userId);
  const name = getName(selectedMember);

  if (item?.action === "STATUS_CHANGED") {
    return (
      <>
        <span className="text-gray-500 font-medium text-sm">from</span>
        <span className="bg-gray-800 border border-white/10 px-2 py-0.5 rounded-md text-gray-300 font-semibold text-xs shadow-sm whitespace-nowrap">
          {statuses?.oldStatusName || "Unknown"}
        </span>
        <span className="text-gray-500 font-medium text-sm">to</span>
        <span className="bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md text-indigo-400 font-semibold text-xs shadow-sm whitespace-nowrap">
          {statuses?.newStatusName || "Unknown"}
        </span>
      </>
    );
  }

  if (item?.action === "ASSIGNED") {
    return (
      <>
        <span className="text-gray-500 font-medium text-sm">to</span>
        <span className="text-gray-300 font-semibold text-sm whitespace-nowrap">
          {name || "Unassigned"}
        </span>
      </>
    );
  }

  if (item?.action === "PRIORITY_CHANGED") {
    return (
      <>
        <span className="text-gray-500 font-medium text-sm">from</span>
        <span className="bg-gray-800 border border-white/10 px-2 py-0.5 rounded-md text-gray-300 font-semibold text-xs shadow-sm whitespace-nowrap">
          {item?.beforeState?.prev_priority || "Unknown"}
        </span>
        <span className="text-gray-500 font-medium text-sm">to</span>
        <span className="bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md text-indigo-400 font-semibold text-xs shadow-sm whitespace-nowrap">
          {item?.afterState?.new_priority || "Unknown"}
        </span>
      </>
    );
  }

  return null;
};
