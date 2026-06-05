import React, { useState } from "react";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    alert("Login Successful");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-2 text-black font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-black font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black transition"
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-700">
              <input type="checkbox" />
              Remember Me
            </label>

            <a
              href="#"
              className="text-black font-medium hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>

        {/* Sign Up */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account? 
          <a
            href="#"
            className="text-black font-semibold hover:underline"
          >
           < Link to="/signup">
              Sign Up
            </Link>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;