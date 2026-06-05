import React from "react"
import { Share2, MailOpen, Globe } from "lucide-react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-black text-white px-8 py-16 mt-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h1 className="text-xl font-bold">
            KAWUTE PROPERTIES
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Premium real estate solutions built for modern living.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <div className="text-sm text-gray-300 space-y-1">
            <p>London, UK</p>
            <p>Geneva, CH</p>
            <p>New York, US</p>
            <p>+44 (0) 20 7946 0000</p>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Explore</h2>
          <div className="text-sm text-gray-300 space-y-1 flex flex-col gap-1">
            <Link to="/listing" className="hover:text-white">
              Listing
            </Link>
            <Link to="/private-sale" className="hover:text-white">
              Private Sale
            </Link>
            <Link to="/agent" className="hover:text-white">
              Agent
            </Link>
            <Link to="/blog" className="hover:text-white">
              Blog
            </Link>
          </div>
        </div>

        {/* Social + Legal */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Share2 className="w-5 h-5 cursor-pointer hover:text-blue-400" />
            <MailOpen className="w-5 h-5 cursor-pointer hover:text-blue-400" />
            <Globe className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          </div>

          <p className="text-xs text-gray-400 mb-2">
            © {new Date().getFullYear()} KAWUTE PROPERTIES
          </p>

          <div className="flex gap-4 text-xs text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer