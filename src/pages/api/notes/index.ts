import type { APIRoute } from "astro";
import { auth } from "../../../lib/auth";
import { db } from "../../../lib/db";

export const GET: APIRoute = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userId = session.user.id;

  try {
    const result = await db`
      SELECT * FROM get_todos_by_owner(${userId}::text)
    `;

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch notes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { title, content } = await request.json();

    if (!title || title.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Title is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (title.length > 30) {
      return new Response(
        JSON.stringify({ error: "Title must be 30 characters or less" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await db`
      SELECT * FROM create_todo(${session.user.id}::text, ${title}::text, ${content || null}::text)
    `;

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Handle specific database errors
    if (errorMessage.includes("Title already exists")) {
      return new Response(
        JSON.stringify({ error: "A note with this title already exists" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (errorMessage.includes("Title must be 30 characters or less")) {
      return new Response(
        JSON.stringify({ error: "Title must be 30 characters or less" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ error: "Failed to create note" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: APIRoute = async ({ request, url }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const noteId = url.searchParams.get("id");

    if (!noteId) {
      return new Response(JSON.stringify({ error: "Note ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await db`
      SELECT delete_todo(${noteId}::uuid, ${session.user.id}::text) as deleted
    `;

    if (!result[0]?.deleted) {
      return new Response(
        JSON.stringify({ error: "Note not found or not owned by user" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Note deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Database error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Failed to delete note", details: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const PUT: APIRoute = async ({ request, url }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const noteId = url.searchParams.get("id");

  if (!noteId) {
    return new Response(JSON.stringify({ error: "Note ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { newContent } = await request.json();

  const result = await db`
    SELECT update_todo(${noteId}::uuid, ${session.user.id}::text, ${newContent}::text) as updated
  `;

  if (!result[0]?.updated) {
    return new Response(JSON.stringify({ error: "Note not updated" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ success: true, message: "Note updated successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
