import { authClient } from "../lib/auth-client.ts";

const handleLogout = async () => {
  const { data, error } = await authClient.signOut();

  if (data?.success) {
    alert("Logged out sucessfully | Logging out in 3 seconds");
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
    return;
  }

  if (error) {
    console.log(error);
    return alert("Error signout out :)");
  }
};

export default function SettingsPage() {
  return (
    <div className="h-full w-full p-6">
      <button
        onClick={() => (window.location.href = "/app")}
        className="mb-6 px-3 py-1 border border-black hover:bg-gray-100 transition-colors"
      >
        Back
      </button>
      <div className="h-full w-full flex flex-col gap-3 justify-center">
        <div>
          <h1>Notes</h1>
          <button className="mb-6 px-3 py-1 border border-black hover:bg-gray-100 transition-colors">
            Delete all notes
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <h1>Accounts</h1>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="mb-6 px-3 py-1 border border-black hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
            <button className="mb-6 px-3 py-1 border border-black hover:bg-gray-100 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
