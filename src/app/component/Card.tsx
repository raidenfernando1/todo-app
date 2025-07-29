import { useEffect, useRef, useState } from "react";

type CardTypes = {
  title: string;
  content: string;
  id: string;
  onDelete?: (id: string) => void;
};

const Card = ({ title, content, id, onDelete }: CardTypes) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`; // 15rem = 240px :]
  }, [content]);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/notes?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        if (onDelete) {
          onDelete(id);
        } else {
          window.location.reload();
        }
      } else {
        alert(data.error || "Failed to delete note");
      }
    } catch (error) {
      alert("Failed to delete note");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    window.location.href = `app/${id}`;
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="border-1 p-3 w-full text-left cursor-pointer relative"
      >
        <h1 className="mb-3 text-2xl font-semibold">{title}</h1>

        <textarea
          ref={textareaRef}
          value={content}
          readOnly
          className="w-full overflow-y-auto resize-none p-2 rounded max-h-60"
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            disabled={isDeleting}
            aria-label="Delete this note"
            className="py-1 px-2 border-1 hover:bg-red-50 hover:border-red-300 disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Note</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete "{title}"? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Card };
