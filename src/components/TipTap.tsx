import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TipTapProps {
  content: string;
  editable?: boolean;
  onChange?: any;
}

const defaultClasses =
  "appearance-none block w-full py-3 px-4 leading-tight focus:outline-none";

export const Tiptap: React.FC<TipTapProps> = ({
  content,
  onChange,
  editable,
}: TipTapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        spellcheck: "true",
        class: editable
          ? `${defaultClasses} bg-gray-200 text-gray-700 rounded min-h-[12rem]`
          : `${defaultClasses}`,
      },
    },
  });

  if (!editor) {
    return null;
  }

  if (editable) {
    editor.commands.toggleOrderedList();
  }

  return <EditorContent editor={editor} />;
};
