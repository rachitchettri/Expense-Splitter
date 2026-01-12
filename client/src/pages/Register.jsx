import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Image from "../assets/img1.png";
import API from "../api/axiosInstance";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
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
            <h1 className="text-xl font-semibold text-gray-900">
              Expense Splitter
            </h1>
          </div>

          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Start managing shared expenses the smart way.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="mt-2 w-full px-4 py-3.5 border border-gray-300 rounded-xl bg-gray-50
                focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="mt-2 w-full px-4 py-3.5 border border-gray-300 rounded-xl bg-gray-50
                focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-800 to-green-700
              hover:opacity-90 text-white py-3.5 rounded-xl font-semibold shadow-lg
              transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-800 font-semibold hover:underline">
              Sign in
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
            Smarter group spending.
          </h2>
          <p className="text-green-100 text-lg">
            Join now and simplify how you manage shared expenses.
          </p>

          <img
            src={Image}
            alt="Register illustration"
            className="mt-12 mx-auto w-96 drop-shadow-2xl"
          />
        </div>
      </div>

    </div>
  );
}
