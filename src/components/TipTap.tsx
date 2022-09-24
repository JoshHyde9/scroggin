import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({
  description,
  onChange,
}: {
  description: string;
  onChange: any;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        spellcheck: "true",
        class:
          "appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight min-h-[12rem] focus:outline-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
