import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase_client";

function ProtectedRoute({ children, requiredRole }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          console.log("No user found");
          setIsAuthorized(false);
          setLoading(false);
          return;
        }

        // If no specific role is required, just check if user is authenticated
        if (!requiredRole) {
          console.log("No role required, user authenticated");
          setIsAuthorized(true);
          setLoading(false);
          return;
        }

        // 1. Check user metadata first (instant, bypasses RLS/DB checks)
        const metaRole = user.user_metadata?.role;
        if (metaRole) {
          console.log("Authorized via metadata user role:", metaRole, "Required:", requiredRole);
          setIsAuthorized(metaRole === requiredRole);
          setLoading(false);
          return;
        }

        // 2. Safe database check fallback (for users without role in metadata)
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", user.id)
          .maybeSingle();

        // 3. Default to customer role if no role is found
        const userRole = profile?.role || "customer";

        console.log("Authorized via database user role:", userRole, "Required:", requiredRole);
        setIsAuthorized(userRole === requiredRole);
        setLoading(false);
      } catch (error) {
        console.error("Authorization check error:", error);
        setIsAuthorized(false);
        setLoading(false);
      }
    };

    checkAuthorization();
  }, [requiredRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    console.log("User not authorized, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
