// components/TestLogin.tsx
import { useEffect } from "react";
import { authClient } from "../lib/auth-client";

export default function TestLogin() {
  const handleSessionCheck = async () => {
    const session = await authClient.getSession();
    console.log(session);
  };

  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  return (
    <>
      <button onClick={() => handleSessionCheck()}>Check Session</button>
      <button onClick={() => signIn()}>Sign In with Google</button>
    </>
  );
}
