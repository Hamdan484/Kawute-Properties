import React, { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase_client";

const links = {
  Home: "/",
  About: "/about",
  Contact: "/contact",
  Listings: "/properties",
  Agent: "/agent",
  Blog: "/blog",
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchUserProfile = async (uid) => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", uid)
          .maybeSingle();
        if (mounted && data) {
          setRole(data.role);
        }
      } catch (err) {
        console.error("Error fetching role:", err);
      }
    };

    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setUser(session?.user || null);
        if (session?.user) {
          const metaRole = session.user.user_metadata?.role;
          if (metaRole) {
            setRole(metaRole);
          } else {
            fetchUserProfile(session.user.id);
          }
        } else {
          setRole(null);
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setUser(session?.user || null);
          if (session?.user) {
            const metaRole = session.user.user_metadata?.role;
            if (metaRole) {
              setRole(metaRole);
            } else {
              fetchUserProfile(session.user.id);
            }
          } else {
            setRole(null);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      navigate("/");
    }
  };

  const getDashboardPath = () => {
    if (role === "agent") return "/agent-dashboard";
    if (role === "admin") return "/admin-dashboard";
    return "/user-dashboard";
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 shadow-md bg-zinc-100 fixed top-0 left-0 right-0 z-50 border-b border-gray-300">
      {/* Logo */}
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
        KAWUTE PROPERTIES
      </h1>

      {/* Desktop Nav */}
      <nav>
        <ul className="hidden lg:flex items-center gap-4 text-lg">
          {Object.entries(links).map(([name, path]) => (
            <li key={path}>
              <Link to={path} className="hover:text-blue-500">
                {name}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link to={getDashboardPath()} className="hover:text-blue-500 font-semibold">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Sign In Button */}
      <div className="flex items-center gap-4">
        <Link
          to="/liked"
          className="hidden md:flex items-center gap-2 text-black hover:text-red-500 transition font-semibold"
          title="View liked properties"
        >
          <Heart size={20} />
          <span className="text-sm">Liked</span>
        </Link>
        {user ? (
          <button
            onClick={handleSignOut}
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer font-semibold sm:text-sm md: text-md"
          >
            Sign Out
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Icon */}
      <div className="lg:hidden cursor-pointer">
        {isOpen ? (
          <X className="w-6 h-6" onClick={() => setIsOpen(false)} />
        ) : (
          <Menu className="w-6 h-6" onClick={() => setIsOpen(true)} />
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-4 py-4 shadow-md z-50 lg:hidden border-b border-gray-300">
          {Object.entries(links).map(([name, path]) => (
            <li key={path}>
              <Link to={path} onClick={() => setIsOpen(false)}>
                {name}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link
                to={getDashboardPath()}
                onClick={() => setIsOpen(false)}
                className="font-semibold text-black"
              >
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/liked"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-black hover:text-red-500 transition font-semibold"
            >
              <Heart size={20} />
              <span>Liked Properties</span>
            </Link>
          </li>
          {user && (
            <li className="w-full text-center px-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleSignOut();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer font-semibold w-2/3 mx-auto"
              >
                Sign Out
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Navbar;
