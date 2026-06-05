import React, { useState } from "react";
import { supabase } from "../supabase_client";

function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          fullname: formData.fullname,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    console.log(data);

    setFormData({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    alert("Account created successfully! Check your email to verify your account.");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black">Create Account</h1>
          <p className="text-gray-600 mt-2">
            Sign up to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium text-black">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-black">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-black">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 font-medium text-black">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" required className="mt-1" />
            <p className="text-gray-700">
              I agree to the Terms and Conditions and Privacy Policy.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-black font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;