import React from "react";
import { X, Save } from "lucide-react";

interface EditorProps {
  note: {
    id: string;
    title: string;
    content: string;
  };
}

const Editor = ({ note }: EditorProps) => {
  const [fontSize, setFontSize] = React.useState(1);
  const [title, setTitle] = React.useState(note.title);
  const [textContent, setTextContent] = React.useState(note.content);

  const handleSave = async () => {
    const response = await fetch(`/api/notes?id=${note.id}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newContent: textContent }),
    });

    if (!response.ok) {
      console.error("Failed to save note");
    } else {
      console.log("Note saved");
    }

    return response;
  };

  return (
    <div className="w-full h-full flex flex-col pl-3 pr-3 pb-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl py-3 mr-8">{title}</h1>
        <EditorBar
          fontSize={fontSize}
          setFontSize={setFontSize}
          onSave={handleSave}
        />
        s{" "}
      </div>
      <textarea
        style={{ fontSize: `${fontSize}rem` }}
        className="w-full h-full p-3.5 border rounded resize-none outline-none focus:ring"
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
      />
    </div>
  );
};

type EditorBarProps = {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  onSave: () => void;
};

const EditorBar = ({ fontSize, setFontSize, onSave }: EditorBarProps) => {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex gap-4 items-center">
        <label htmlFor="fontsize" className="text-sm">
          Fontsize: {fontSize.toFixed(1)}
        </label>
        <input
          id="fontsize"
          type="range"
          min={1}
          max={7}
          step={0.1}
          value={fontSize}
          onChange={(e) => setFontSize(parseFloat(e.target.value))}
          className="w-full sm:w-64 md:w-96 max-w-[80vw]"
        />
      </div>
      <button
        onClick={onSave}
        className="border rounded p-1 bg-green-50 hover:bg-green-100"
        title="Save"
      >
        <Save />
      </button>
      <button
        onClick={() => (window.location.href = "/app")}
        className="border rounded p-1"
        title="Close"
      >
        <X />
      </button>
    </div>
  );
};

export default Editor;
