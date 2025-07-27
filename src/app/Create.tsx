import { useState } from "react";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (title.length > 30) {
      setError("Title must be 30 characters or less");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create note");
      }

      setSuccess("Note created successfully!");

      // Redirect after success
      setTimeout(() => {
        window.location.href = `/app/${data.id}`;
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
    setError("");
    setSuccess("");
  };

  const handleBack = () => {
    window.location.href = "/app";
  };

  const charCount = title.length;
  const charCountColor =
    charCount > 25
      ? "text-red-500"
      : charCount > 20
        ? "text-orange-500"
        : "text-gray-500";

  return (
    <div className="h-full w-full p-6">
      <button
        onClick={handleBack}
        className="mb-6 px-3 py-1 border border-black hover:bg-gray-100 transition-colors"
      >
        Back
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-96 h-4/5 flex flex-col justify-center gap-3"
      >
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded">
            {success}
          </div>
        )}

        {/* Title Input */}
        <label className="flex flex-col gap-3">
          <span>Create a title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={30}
            placeholder="Enter note title (max 30 chars)"
            className="border border-black p-3"
            disabled={isLoading}
          />
          <span className={`text-sm text-right ${charCountColor}`}>
            {charCount}/30
          </span>
        </label>

        {/* Content Input */}
        <label className="flex flex-col gap-3">
          <span>Content (optional)</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content..."
            rows={5}
            className="border border-black p-3 resize-y min-h-[100px]"
            disabled={isLoading}
          />
        </label>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 border border-black hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Creating..." : "Create Note"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="px-4 py-2 border border-black hover:bg-gray-100 disabled:opacity-60 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
