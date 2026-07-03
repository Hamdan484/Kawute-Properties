import React, { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Link } from "react-router-dom";

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
        <Link
          to="/login"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Sign In
        </Link>
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
        <ul className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-4 py-4 shadow-md z-50 lg:hidden">
          {Object.entries(links).map(([name, path]) => (
            <li key={path}>
              <Link to={path} onClick={() => setIsOpen(false)}>
                {name}
              </Link>
            </li>
          ))}
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
        </ul>
      )}
    </div>
  );
}

export default Navbar;
