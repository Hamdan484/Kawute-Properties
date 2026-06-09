import React, { useEffect, useState } from "react";

function MyProfile() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    full_name: "John Doe",
    email: "johndoe@email.com",
    phone: "0240000000",
    location: "Kumasi, Ghana",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: imageUrl });
    }
  };

  const handleSave = () => {
    // Later: update Supabase here
    console.log("Saved profile:", profile);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl">

        {/* IMAGE SECTION */}
        <div className="flex items-center gap-6">

          <img
            src={profile.avatar}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border border-white/20"
          />

          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />
          )}

        </div>

        {/* DETAILS */}
        <div className="mt-6 space-y-4">

          {/* NAME */}
          <div>
            <label className="text-gray-400 text-sm">Full Name</label>
            {editing ? (
              <input
                name="full_name"
                value={profile.full_name}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-white/10 border border-white/20 rounded"
              />
            ) : (
              <p>{profile.full_name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <p>{profile.email}</p>
          </div>

          {/* PHONE */}
          <div>
            <label className="text-gray-400 text-sm">Phone</label>
            {editing ? (
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-white/10 border border-white/20 rounded"
              />
            ) : (
              <p>{profile.phone}</p>
            )}
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-gray-400 text-sm">Location</label>
            {editing ? (
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-white/10 border border-white/20 rounded"
              />
            ) : (
              <p>{profile.location}</p>
            )}
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-3">

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-white text-black rounded"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default MyProfile;