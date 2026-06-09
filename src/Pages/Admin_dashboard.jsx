import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black border-b border-white/20 flex justify-between items-center p-4 z-50">
        <h1 className="font-bold">Admin Panel</h1>
        <button onClick={() => setOpen(!open)} className="text-white text-2xl">
          ☰
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-black border-r border-white/10 p-6 transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h1 className="text-2xl font-bold mb-10">Admin</h1>

        <nav className="flex flex-col gap-4">
          <Link className="hover:bg-white hover:text-black px-3 py-2 rounded transition">
            Dashboard
          </Link>
          <Link className="hover:bg-white hover:text-black px-3 py-2 rounded transition">
            Users
          </Link>
          <Link className="hover:bg-white hover:text-black px-3 py-2 rounded transition">
            Agents
          </Link>
          <Link className="hover:bg-white hover:text-black px-3 py-2 rounded transition">
            Properties
          </Link>
          <Link className="hover:bg-white hover:text-black px-3 py-2 rounded transition">
            Settings
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-6 pt-20 md:pt-6">

        {/* TOP HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl font-semibold">
            Admin Dashboard
          </h2>

          <div className="text-sm border border-white/20 px-3 py-1 rounded">
            Logged in as Admin
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="border border-white/20 p-5 rounded-xl bg-black/40">
            <h3 className="text-gray-400">Total Users</h3>
            <p className="text-2xl font-bold mt-2">1,245</p>
          </div>

          <div className="border border-white/20 p-5 rounded-xl bg-black/40">
            <h3 className="text-gray-400">Agents</h3>
            <p className="text-2xl font-bold mt-2">320</p>
          </div>

          <div className="border border-white/20 p-5 rounded-xl bg-black/40">
            <h3 className="text-gray-400">Properties</h3>
            <p className="text-2xl font-bold mt-2">890</p>
          </div>

          <div className="border border-white/20 p-5 rounded-xl bg-black/40">
            <h3 className="text-gray-400">Pending Approvals</h3>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>

        </div>

        {/* TABLE SECTION */}
        <div className="mt-10 border border-white/20 rounded-xl p-4 overflow-x-auto">

          <h3 className="text-lg font-semibold mb-4">Recent Users</h3>

          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="text-gray-400 border-b border-white/10">
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2">John Doe</td>
                <td>john@example.com</td>
                <td>User</td>
                <td className="text-green-400">Active</td>
              </tr>

              <tr className="border-b border-white/10">
                <td className="py-2">Jane Smith</td>
                <td>jane@example.com</td>
                <td>Agent</td>
                <td className="text-yellow-400">Pending</td>
              </tr>
            </tbody>
          </table>

        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;