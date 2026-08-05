"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const DescriptionEditor = ({ state, setState, isEditing = false }: any) => {
  const { description } = state;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Describe the issue...",
      }),
    ],
    content: isEditing ? JSON.parse(description) : description || "",
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
    <div
      className="
        transition-all
        duration-200
        focus-within:border-foreground/15
        focus-within:shadow-card
      "
    >
      <div className="px-4 py-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default DescriptionEditor;
