import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { loginUser } from "../../api/authApi";

import {
  useAuth,
} from "../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        await loginUser(formData);

      login(
        data.user,
        data.token
      );

      alert("Login successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#2f2f2f] border border-[#3a3a3a] rounded-3xl p-8 shadow-2xl">

      <div className="flex flex-col items-center mb-8">

        <h1 className="text-3xl font-semibold">
          Welcome back
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          Login to continue chatting
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="block mb-2 text-sm text-gray-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full bg-[#212121] border border-[#404040] rounded-xl px-4 py-3 outline-none focus:border-white transition"
          />

        </div>

        <div>

          <label className="block mb-2 text-sm text-gray-300">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full bg-[#212121] border border-[#404040] rounded-xl px-4 py-3 outline-none focus:border-white transition"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

      <p className="text-center text-sm text-gray-400 mt-6">

        Don’t have an account?{" "}

        <Link
          to="/signup"
          className="text-white hover:underline"
        >
          Sign up
        </Link>

      </p>

    </div>
  );
}

export default LoginForm;