import { defineMiddleware } from "astro:middleware";
import { auth } from "./lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = new URL(context.request.url).pathname;

  const session = await auth.api.getSession({
    headers: context.request.headers,
  });

  context.locals.user = session?.user || null;
  context.locals.session = session?.session || null;

  if (!session && pathname.startsWith("/app")) {
    return context.redirect("/404");
  }

  return next();
});
