import React, { useState } from "react";
import { supabase } from "../supabase_client";
import { Link } from "react-router-dom";
function Signup() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");

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

    // Sign up user
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.full_name,
        },
        emailRedirectTo: `${window.location.origin}/signup`,
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // Store email for confirmation message and reset form
    setSignupEmail(formData.email);
    setFormData({
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setSignupSuccess(true);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10 pt-20">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {signupSuccess ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-4">
              Check Your Email
            </h1>
            <p className="text-gray-600 mb-4">
              We've sent a confirmation link to <strong>{signupEmail}</strong>
            </p>
            <p className="text-gray-600 mb-6">
              Click the link to confirm your email. Your profile will be created
              automatically, and you'll be logged in!
            </p>
            <button
              onClick={() => {
                setSignupSuccess(false);
                setSignupEmail("");
              }}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              Back to Sign Up
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-black">Create Account</h1>
              <p className="text-gray-600 mt-2">Sign up to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>
            <p>
              Have an account?{" "}
              <Link
                to="/login"
                className="text-black font-semibold hover:underline text-center"
              >
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;
