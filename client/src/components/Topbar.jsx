import { useAuth } from "../hooks/useAuth";

export default function Topbar() {
  const { auth, logoutUser } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-700">
        Welcome, {auth?.user?.name || "User"}
      </h1>

      <button
        onClick={logoutUser}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
      >
        Logout
      </button>
    </header>
  );
}
