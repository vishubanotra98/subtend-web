"use client";

import Tiptap from "../Common/TextEditor";
import { CircleUser, MoreHorizontal, Flag } from "lucide-react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

// --- DUMMY DATA ---
const priorities = ["Urgent", "High", "Medium", "Low"] as const;
const assignees = ["Unassigned", "Frontend Dev", "Backend Dev"] as const;

// 1. Assignee Combobox Component
export function AssigneeCombobox() {
  return (
    <Combobox items={assignees}>
      {/* Wrapper styled exactly like your previous button */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-gray-400 bg-transparent hover:bg-[#374151] hover:text-gray-200 border border-transparent hover:border-[#4B5563] transition-all duration-200 cursor-pointer focus-within:bg-[#374151] focus-within:text-gray-200">
        <CircleUser size={15} className="shrink-0" />
        <ComboboxInput
          placeholder="Assignee"
          className="bg-transparent border-none outline-none placeholder:text-gray-400 w-16 cursor-pointer text-xs"
        />
      </div>

      {/* Dropdown styling (Adjust bg/border if your UI library handles it differently) */}
      <ComboboxContent className="bg-[#1f2937] border border-[#374151] text-gray-200 rounded-md shadow-xl mt-1 z-50">
        <ComboboxEmpty className="p-2 text-xs text-gray-500">
          No users found.
        </ComboboxEmpty>
        <ComboboxList className="p-1">
          {(item) => (
            <ComboboxItem
              key={item}
              value={item}
              className="px-2 py-1.5 text-xs rounded-sm hover:bg-[#374151] cursor-pointer outline-none data-[active]:bg-[#374151]"
            >
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

// 2. Priority Combobox Component
export function PriorityCombobox() {
  return (
    <Combobox items={priorities}>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-gray-400 bg-transparent hover:bg-[#374151] hover:text-gray-200 border border-transparent hover:border-[#4B5563] transition-all duration-200 cursor-pointer focus-within:bg-[#374151] focus-within:text-gray-200">
        <Flag size={14} className="shrink-0" />
        <ComboboxInput
          placeholder="Priority"
          className="bg-transparent border-none outline-none placeholder:text-gray-400 w-14 cursor-pointer text-xs"
        />
      </div>

      <ComboboxContent className="bg-[#1f2937] border border-[#374151] text-gray-200 rounded-md shadow-xl mt-1 z-50">
        <ComboboxEmpty className="p-2 text-xs text-gray-500">
          No priority found.
        </ComboboxEmpty>
        <ComboboxList className="p-1">
          {(item) => (
            <ComboboxItem
              key={item}
              value={item}
              className="px-2 py-1.5 text-xs rounded-sm hover:bg-[#374151] cursor-pointer outline-none data-[active]:bg-[#374151]"
            >
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

// 3. Main Form Component
export const IssueForm = () => {
  return (
    <form className="flex flex-col h-full gap-4 mt-2">
      <div>
        <textarea
          className="w-full bg-transparent text-2xl font-semibold text-gray-100 placeholder:text-gray-500 resize-none outline-none overflow-hidden leading-tight"
          placeholder="Issue Title"
          rows={1}
          autoFocus
        />
      </div>

      <div className="min-h-[20vh] text-gray-300 text-sm [&_.ProseMirror]:outline-none [&_.ProseMirror.is-editor-empty:before]:text-gray-600">
        <Tiptap />
      </div>

      <div className="h-px w-full bg-[#374151]/50 my-2" />

      <div className="flex items-center justify-between">
        {/* Left: Quick Actions (Now using Comboboxes) */}
        <div className="flex items-center gap-2">
          <AssigneeCombobox />

          <PriorityCombobox />

          {/* More Actions Button (Kept as a button for now) */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-2 p-1.5 rounded-md text-gray-400 bg-transparent hover:bg-[#374151] hover:text-gray-200 border border-transparent hover:border-[#4B5563] transition-all duration-200"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Right: Submit Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-xs font-medium text-gray-400 hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-md shadow-sm transition-colors"
          >
            Create Issue
          </button>
        </div>
      </div>
    </form>
  );
};
