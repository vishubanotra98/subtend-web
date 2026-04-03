"use client";

import { Trash2 } from "lucide-react";

const DangerContentTab = () => {
  return (
    <div className=" space-y-10">
      <div className="p-6 border border-red-900 bg-red-950/20 rounded-2xl shadow-2xl space-y-5">
        <div className="flex items-center gap-3">
          <Trash2 className="text-red-500" size={24} />
          <h2 className="text-xl font-bold text-red-500">Danger Zone</h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 max-w-xl">
            <h4 className="text-gray-100 font-semibold mb-1">
              Delete this workspace
            </h4>
            <p className="text-sm text-gray-400">
              Once you delete a workspace, there is no going back. Data will be
              permanently scheduled for deletion in 30 days. You will not lose
              your member billing profile.
            </p>
          </div>
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-colors shrink-0">
            Delete Workspace
          </button>
        </div>
      </div>
    </div>
  );
};

export default DangerContentTab;
