import React from "react";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <h1 className="text-xl font-bold">My Dashboard</h1>

        <div className="text-sm border border-white/20 px-3 py-1 rounded">
          Logged in as User
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-6">

        {/* WELCOME SECTION */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">
            Welcome back 👋
          </h2>
          <p className="text-gray-400 mt-1">
            Explore properties and manage your activity.
          </p>
        </div>
        

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link
            to="/properties"
            className="border border-white/20 rounded-xl p-6 bg-black/40 hover:bg-white hover:text-black transition"
          >
            <h3 className="text-lg font-semibold">Browse Properties</h3>
            <p className="text-sm text-gray-400 mt-2">
              Find your next home or investment
            </p>
          </Link>

          <Link
            to="/saved"
            className="border border-white/20 rounded-xl p-6 bg-black/40 hover:bg-white hover:text-black transition"
          >
            <h3 className="text-lg font-semibold">Saved Listings</h3>
            <p className="text-sm text-gray-400 mt-2">
              View properties you saved
            </p>
          </Link>

          <Link
            to="/profile"
            className="border border-white/20 rounded-xl p-6 bg-black/40 hover:bg-white hover:text-black transition"
          >
            <h3 className="text-lg font-semibold">My Profile</h3>
            <p className="text-sm text-gray-400 mt-2">
              Update your account details
            </p>
          </Link>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="mt-10 border border-white/20 rounded-xl p-5">

          <h3 className="text-lg font-semibold mb-4">
            Recent Activity
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Viewed property in Kumasi</span>
              <span className="text-gray-400">2h ago</span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Saved apartment listing</span>
              <span className="text-gray-400">Yesterday</span>
            </div>

            <div className="flex justify-between">
              <span>Updated profile info</span>
              <span className="text-gray-400">3 days ago</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default UserDashboard;