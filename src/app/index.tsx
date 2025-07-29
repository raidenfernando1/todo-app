import React from "react";
import Notes from "./component/Notes";
import Navbar from "./component/Navbar";
import { Card } from "./component/Card";

type Note = {
  id: string;
  title: string;
  content: string;
  last_modified: string;
};

export default function Main() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/notes", {
          credentials: "include",
        });

        const data = await res.json();

        setNotes(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <Navbar />
      <Notes>
        {notes.map((note) => (
          <Card
            key={note.id}
            title={note.title}
            content={note.content}
            id={note.id}
          />
        ))}
      </Notes>
    </main>
  );
}
