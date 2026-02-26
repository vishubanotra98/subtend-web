"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const DescriptionEditor = ({ state, setState }: any) => {
  const { description } = state;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Add description...",
      }),
    ],
    content: description || "",
    editorProps: {
      attributes: {
        class:
          "linear-editor tiptap min-h-[120px] text-gray-200 text-sm leading-relaxed",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const des = JSON.stringify(editor.getJSON());
      setState((prev: any) => ({
        ...prev,
        description: des,
      }));
    },
  });

  return (
    <div className="w-full rounded-md p-3 bg-transparent border border-transparent hover:border-[#374151] focus-within:border-[#4B5563] focus-within:bg-[#111827]30 transition-all duration-200">
      <EditorContent editor={editor} />
    </div>
  );
};

export default DescriptionEditor;
