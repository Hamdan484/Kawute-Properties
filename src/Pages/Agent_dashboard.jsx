import React from "react";
import { Link } from "react-router-dom";

function AgentDashboard() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <h1 className="text-xl font-bold">Agent Dashboard</h1>

        <div className="text-sm border border-white/20 px-3 py-1 rounded">
          Logged in as Agent
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-6">

        {/* WELCOME */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">
            Manage your properties 🏠
          </h2>
          <p className="text-gray-400 mt-1">
            Add, edit, and track your listings easily.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link
            to="/add-property"
            className="border border-white/20 rounded-xl p-6 bg-black/40 hover:bg-white hover:text-black transition"
          >
            <h3 className="text-lg font-semibold">Add New Property</h3>
            <p className="text-sm text-gray-400 mt-2">
              Upload a new listing
            </p>
          </Link>

          <Link
            to="/my-properties"
            className="border border-white/20 rounded-xl p-6 bg-black/40 hover:bg-white hover:text-black transition"
          >
            <h3 className="text-lg font-semibold">My Properties</h3>
            <p className="text-sm text-gray-400 mt-2">
              View and manage your listings
            </p>
          </Link>

          <Link
            to="/inquiries"
            className="border border-white/20 rounded-xl p-6 bg-black/40 hover:bg-white hover:text-black transition"
          >
            <h3 className="text-lg font-semibold">Client Messages</h3>
            <p className="text-sm text-gray-400 mt-2">
              See buyer inquiries
            </p>
          </Link>

        </div>

        {/* STATS SECTION */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="border border-white/20 p-5 rounded-xl bg-black/40">
            <h3 className="text-gray-400">Total Listings</h3>
            <p className="text-2xl font-bold mt-2">18</p>
          </div>

          <div className="border border-white/20 p-5 rounded-xl bg-black/40">
            <h3 className="text-gray-400">Active Listings</h3>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>

          <div className="border border-white/20 p-5 rounded-xl bg-black/40">
            <h3 className="text-gray-400">Pending Approval</h3>
            <p className="text-2xl font-bold mt-2">3</p>
          </div>

          <div className="border border-white/20 p-5 rounded-xl bg-black/40">
            <h3 className="text-gray-400">Total Views</h3>
            <p className="text-2xl font-bold mt-2">2,450</p>
          </div>

        </div>

        {/* RECENT LISTINGS */}
        <div className="mt-10 border border-white/20 rounded-xl p-5">

          <h3 className="text-lg font-semibold mb-4">
            Recent Listings
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>2 Bedroom Apartment - Kumasi</span>
              <span className="text-green-400">Active</span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Luxury Villa - Accra</span>
              <span className="text-yellow-400">Pending</span>
            </div>

            <div className="flex justify-between">
              <span>Studio Apartment - Cape Coast</span>
              <span className="text-green-400">Active</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AgentDashboard;