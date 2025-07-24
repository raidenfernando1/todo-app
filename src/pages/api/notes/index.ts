import type { APIRoute } from "astro";
import { db } from "../../../lib/db";
import { auth } from "../../../lib/auth";

export const GET: APIRoute = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) return new Response(null, { status: 401 });

  const res = await db`SELECT get_todos_for_owner(${session.user.id})`;
  return new Response(JSON.stringify(res));
};
