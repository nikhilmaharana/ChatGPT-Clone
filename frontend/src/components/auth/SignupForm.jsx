import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../../api/authApi";

function SignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      username: "",
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

      await signupUser(formData);

      alert("Signup successful");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#2f2f2f] border border-[#3a3a3a] rounded-3xl p-8 shadow-2xl">

      <div className="flex flex-col items-center mb-8">

        <h1 className="text-3xl font-semibold">
          Create account
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          Start your AI journey
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="block mb-2 text-sm text-gray-300">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full bg-[#212121] border border-[#404040] rounded-xl px-4 py-3 outline-none focus:border-white transition"
          />

        </div>

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
            placeholder="Create password"
            className="w-full bg-[#212121] border border-[#404040] rounded-xl px-4 py-3 outline-none focus:border-white transition"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          {loading
            ? "Creating..."
            : "Sign Up"}
        </button>

      </form>

      <p className="text-center text-sm text-gray-400 mt-6">
        Already have an account?{" "}

        <Link
          to="/login"
          className="text-white hover:underline"
        >
          Login
        </Link>

      </p>

    </div>
  );
}

export default SignupForm;