import React from "react";
import { authClient } from "../lib/auth-client";
import type { Session } from "better-auth";

export default function HomeBtns() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchSession = async () => {
      try {
        const result = await authClient.getSession();
        setSession(result.data?.session ?? null);
      } catch (error) {
        console.error("Error fetching session:", error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const signIn = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const logout = async () => {
    try {
      if (session) {
        await authClient.revokeSession({ token: session.token });
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="mt-4 flex gap-[10px]">
      {!loading &&
        (session ? (
          <>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-[13%] py-[10px] px-[25px] border text-left"
            >
              Goto app
            </button>
            <button
              onClick={logout}
              className="w-[13%] py-[10px] px-[25px] border text-left"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={signIn}
            className="w-[30%] py-[10px] px-[25px] border text-left"
          >
            Signup using Google
          </button>
        ))}
    </div>
  );
}
