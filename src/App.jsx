import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { supabase } from "./supabase_client";
import Navbar from "../src/Components/Navbar";
import Footer from "../src/Components/Footer";
import Home from "./Pages/Home";
import Login from "../src/Pages/Login";
import About from "../src/Pages/About";
import Signup from "./Pages/Signup";
import Conntact from "./Pages/Contact";
import Blog from "./Pages/Blog";
import Agent from "./Pages/Agent";
import PropertyDetails from "./Pages/PropertyDetails";
import LikedProperties from "./Pages/LikedProperties";
import BlogComponent from "./Components/BlogComponent";
import AgentSignup from "./Pages/SignUp_Agent";
import SignUpCard from "./Pages/Sign_up_card";
import AgentDashboard from "./Pages/Agent_dashboard";
import AdminDashboard from "./Pages/Admin_dashboard";
import UserDashboard from "./Pages/User_dashboard";
import AddProperty from "./Components/Add_properties";
import Myproperties from "./Components/My_properties";
import ClientMessages from "./Components/Client_messages";
import BrowseProperties from "./Components/Browse_properties";
import Savedlistings from "./Components/Saved_listings";
import Profile from "./Components/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import ScrollToTop from "./Components/Scroll_to_top";


function App() {
  useEffect(() => {
    // Global auth listener to create profile after email confirmation
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const userId = session.user.id;
          const userEmail = session.user.email;
          const fullName = session.user.user_metadata?.full_name || "";
          const role = session.user.user_metadata?.role || "customer";

          // Check if profile already exists
          const { data: existingProfile, error: fetchError } = await supabase
            .from("profiles")
            .select("user_id")
            .eq("user_id", userId)
            .maybeSingle();

          if (fetchError && !fetchError?.details?.includes("No rows")) {
            console.error("Failed to fetch profile:", fetchError);
            return;
          }

          // If profile doesn't exist, create it
          if (!existingProfile) {
            const { error: insertError } = await supabase
              .from("profiles")
              .insert([
                {
                  user_id: userId,
                  full_name: fullName,
                  email: userEmail,
                  role: role,
                },
              ]);

            if (insertError) {
              console.error("Failed to create profile:", insertError);
            } else {
              console.log("Profile created successfully for user:", userId);
            }
          }
        }
      },
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
    <ScrollToTop />
      <Navbar />
      <Routes>
        {<Route path="/" element={<Home />} />}
        {<Route path="/login" element={<Login />} />}
        {<Route path="/signup" element={<Signup />} />}
        {<Route path="/about" element={<About />} />}
        {<Route path="/contact" element={<Conntact />} />}
        {<Route path="/blog" element={<Blog />} />}
        {<Route path="/agent" element={<Agent />} />}
        {<Route path="/property/:id" element={<PropertyDetails />} />}
        {<Route path="/blog/:id" element={<BlogComponent />} />}
        {<Route path="/agent-signup" element={<AgentSignup />} />}
        {<Route path="/signup-options" element={<SignUpCard />} />}
        
        {/* Protected Dashboard Routes */}
        {
          <Route
            path="/agent-dashboard"
            element={
              <ProtectedRoute requiredRole="agent">
                <AgentDashboard />
              </ProtectedRoute>
            }
          />
        }
        {
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        }
        {
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute requiredRole="customer">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        }
        {
          <Route
            path="/add-property"
            element={
              <ProtectedRoute requiredRole="agent">
                <AddProperty />
              </ProtectedRoute>
            }
          />
        }
        {
          <Route
            path="/my-properties"
            element={
              <ProtectedRoute requiredRole="agent">
                <Myproperties />
              </ProtectedRoute>
            }
          />
        }
        {
          <Route
            path="/inquiries"
            element={
              <ProtectedRoute requiredRole="agent">
                <ClientMessages />
              </ProtectedRoute>
            }
          />
        }
        {
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        }
        {
          <Route
            path="/saved"
            element={
              <ProtectedRoute requiredRole="customer">
                <Savedlistings />
              </ProtectedRoute>
            }
          />
        }

        {/* Public Browsing Routes */}
        {<Route path="/properties" element={<BrowseProperties />} />}
        {<Route path="/liked" element={<LikedProperties />} />}
        {
          <Route
            path="/browse"
            element={<Navigate to="/properties" replace />}
          />
        }
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
