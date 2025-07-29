import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: import.meta.env.NEON_DATABASE_URL,
  }),
  socialProviders: {
    google: {
      clientId: import.meta.env.GOOGLE_OAUTH_ID,
      clientSecret: import.meta.env.GOOGLE_OAUTH_SECRET,
    },
  },
  baseUrl: import.meta.env.PROD ? "https://todoapp1235.vercel.app" : undefined,
});
