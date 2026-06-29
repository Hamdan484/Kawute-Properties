import React from "react";
import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import { supabase } from "../supabase_client";

function My_properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchProperties = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;

      if (!userId) {
        alert("you must be logged in");
        setLoading(false);
        return;
      }
      setUser(userId);

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.log("error fetching data", error);
      } else {
        setProperties(data);
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Properties</h1>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : properties.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            You haven't uploaded any properties yet
          </p>
          <a
            href="/add-property"
            className="bg-black border border-white px-4 py-2 rounded hover:bg-white hover:text-black"
          >
            Add Your First Property
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id}>
              {" "}
              <PropertyCard property={property} />
              {/* Edit & Delete Buttons */}
              <div className="flex gap-3 mt-3 max-w-sm">
                <button className="flex-1 px-3 py-2 border border-white rounded hover:bg-white hover:text-black transition">
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 border border-red-500 rounded hover:bg-red-500 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default My_properties;
