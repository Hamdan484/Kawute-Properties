import React, { useState } from "react";
import { supabase } from "../supabase_client";
import { Link,useNavigate } from "react-router-dom";



function AgentSignup() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

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

    // 1. Create auth user
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.full_name,
        },
      },
    });

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    const user = data.user;

    if (!user) {
      setLoading(false);
      alert("User creation failed");
      return;
    }

    // 2. Create profile with role = agent
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        user_id: user.id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        role: "agent",
      },
    ]);

    setLoading(false);
    navigate("/agent-Dashboard");

    if (profileError) {
      console.error(profileError);
      alert(profileError.message);
      return;
    }




    // 3. Reset form
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      company: "",
      password: "",
      confirmPassword: "",
    });

    alert("Agent account created successfully. Please check your email.");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">
          Agent Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="full_name" placeholder="Full Name" onChange={handleChange} className="w-full border p-3 rounded" required />

          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border p-3 rounded" required />

          <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-3 rounded" required />

          <input name="company" placeholder="Company" onChange={handleChange} className="w-full border p-3 rounded" />

          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-3 rounded" required />

          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="w-full border p-3 rounded" required />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded"
          >
            {loading ? "Creating..." : "Register as Agent"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AgentSignup;