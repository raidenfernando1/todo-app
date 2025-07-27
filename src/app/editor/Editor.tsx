import React from "react";
import { X } from "lucide-react";

interface EditorProps {
  note: {
    id: string;
    title: string;
    content: string;
  };
}

export const Editor = ({ note }: EditorProps) => {
  const [fontSize, setFontSize] = React.useState(1);
  const [title, setTitle] = React.useState(note.title);
  const [textContent, setTextContent] = React.useState(note.content);

  return (
    <div className="w-full h-full flex flex-col pl-3 pr-3 pb-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl py-3 mr-8">{title}</h1>
        <EditorBar fontSize={fontSize} setFontSize={setFontSize} />
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
};

const EditorBar = ({ fontSize, setFontSize }: EditorBarProps) => {
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
        onClick={() => (window.location.href = "/app")}
        className="border rounded p-1"
      >
        <X />
      </button>
    </div>
  );
};
