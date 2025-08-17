import React from "react";

type CardTypes = {
  title: string;
  content: string;
  id: string;
  onDelete?: (id: string) => void;
};

const Card = ({ title, content, id, onDelete }: CardTypes) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const TEXTAREA_SCROLL_HEIGHT = 240;

  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_SCROLL_HEIGHT)}px`; // 15rem = 240px :]
  }, [content]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/notes?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        onDelete ? onDelete(id) : window.location.reload();
      } else {
        alert(data.error || "Failed to delete note");
      }
    } catch (error) {
      alert("Failed to delete note");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="border-1 p-3 w-full text-left cursor-pointer relative">
        <h1 className="mb-3 text-2xl font-semibold">{title}</h1>

        <textarea
          ref={textareaRef}
          value={content}
          readOnly
          disabled
          className="w-full overflow-y-auto resize-none p-2 rounded max-h-60 outline-hidden"
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={(e) => (window.location.href = `app/${id}`)}
            aria-label="Goto this note"
            className="py-1 px-2 border-1 hover:opacity-60"
          >
            Go
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            aria-label="Delete this note"
            className="py-1 px-2 border-1 hover:opacity-60"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="border-1 p-6 shadow-lg max-w-sm w-full mx-4 bg-amber-50">
            <h3 className="text-lg font-semibold mb-4">Delete Note</h3>
            <p className="mb-6">
              Are you sure you want to delete "{title}"? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border hover:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className=" px-4 py-2 border-red-800 border-1 hover:opacity-60 bg-red-600 "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Card };
