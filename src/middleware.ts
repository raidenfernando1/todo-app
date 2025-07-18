// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { auth } from "./lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = new URL(context.request.url).pathname;

  const session = await auth.api.getSession({
    headers: context.request.headers,
  });

  context.locals.user = session?.user || null;
  context.locals.session = session?.session || null;

  console.log(context.locals.session);

  if (!session && pathname.startsWith("/app")) {
    return context.redirect("/login");
  }

  return next();
});
