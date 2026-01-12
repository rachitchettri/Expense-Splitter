import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosInstance";
import Image from "../assets/img1.png";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
const { user, token } = res.data;
loginUser(user, token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">

      {/* LEFT – FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 space-y-8">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-br from-emerald-800 to-green-700 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow">
              ES
            </div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
              Expense Splitter
            </h1>
          </div>

          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Manage shared expenses with clarity and control.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-3.5 border border-gray-300 rounded-xl bg-gray-50
                focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/recover"
                  className="text-sm text-emerald-800 hover:text-emerald-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl bg-gray-50
                focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-800 to-green-700 hover:opacity-90
              text-white py-3.5 rounded-xl font-semibold shadow-lg transition disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-emerald-800 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT – ILLUSTRATION */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-emerald-800 to-green-700 relative overflow-hidden">

        {/* Decorative blur */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative text-center text-white px-12 max-w-xl">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Split expenses.<br />Stay in control.
          </h2>
          <p className="text-green-100 text-lg">
            Smarter expense sharing for groups, teams, and trips.
          </p>

          <img
            src={Image}
            alt="Expense illustration"
            className="mt-12 mx-auto w-96 drop-shadow-2xl"
          />
        </div>
      </div>

    </div>
  );
}
