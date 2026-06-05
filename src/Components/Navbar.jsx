import React, { useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

const links = {
  Home: "/",
  About: "/about",
  Contact: "/contact",
  Agent: "/agent",
  Blog: "/blog"
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-between p-4 shadow-md px-8 py-4 bg-zinc-100 relative">

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
      
        <Link to="/login" className="bg-black text-white px-4 py-2 rounded-md ">
          Sign In
        </Link>
     

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
        </ul>
      )}
    </div>
  )
}

export default Navbar