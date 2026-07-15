import React, { useState, useEffect } from "react";
import { supabase } from "../supabase_client";
import PropertyCard from "../Components/PropertyCard";
import { Heart, X } from "lucide-react";

function LikedProperties() {
  const [likedProperties, setLikedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLikedProperties();

    // Listen for custom event when likes are updated
    const handleLikesUpdated = () => {
      console.log("Like event received, refreshing...");
      fetchLikedProperties();
    };

    // Listen for storage changes (when likes are updated in other tabs)
    const handleStorageChange = () => {
      console.log("Storage changed, refreshing...");
      fetchLikedProperties();
    };

    // Listen for visibility changes to refresh when user returns to page
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Page became visible, refreshing...");
        fetchLikedProperties();
      }
    };

    window.addEventListener("likesUpdated", handleLikesUpdated);
    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("likesUpdated", handleLikesUpdated);
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const fetchLikedProperties = async () => {
    try {
      let likedIds = JSON.parse(
        localStorage.getItem("likedProperties") || "[]",
      );

      // Clean out null values from old buggy data
      likedIds = likedIds.filter((id) => id !== null && id !== undefined);
      localStorage.setItem("likedProperties", JSON.stringify(likedIds));

      console.log("Fetching liked properties with IDs:", likedIds);

      if (likedIds.length === 0) {
        console.log("No liked properties found");
        setLikedProperties([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .in("property_id", likedIds);

      if (error) {
        console.error("Error fetching liked properties:", error);
        setLikedProperties([]);
      } else {
        console.log("Fetched properties:", data);
        setLikedProperties(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (propertyId) => {
    const likedIds = JSON.parse(
      localStorage.getItem("likedProperties") || "[]",
    );
    const updatedIds = likedIds.filter((id) => id !== propertyId);
    localStorage.setItem("likedProperties", JSON.stringify(updatedIds));
    setLikedProperties(
      likedProperties.filter((p) => p.property_id !== propertyId),
    );
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-40 px-6 overflow-hidden min-h-[450px] w-full"
        style={{
          backgroundImage:
            "url('https://tse4.mm.bing.net/th/id/OIP.8_ywY1M2l91OzDCzZoGkUQHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            My Liked Properties
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Your favorite properties saved for later viewing
          </p>
        </div>
      </section>

      {/* Properties Section */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : likedProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-6">
                <Heart size={64} className="mx-auto text-gray-300" />
              </div>
              <h2 className="text-3xl font-bold text-black mb-3">
                No Liked Properties Yet
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Start exploring and like properties to save them here
              </p>

              

              <a
                href="/properties"
                className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                Browse Properties
              </a>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <p className="text-gray-600 text-lg">
                  You have{" "}
                  <span className="font-bold text-black">
                    {likedProperties.length}
                  </span>{" "}
                  liked propert{likedProperties.length !== 1 ? "ies" : "y"}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {likedProperties.map((property) => (
                  <div key={property.property_id} className="relative group">
                    <PropertyCard property={property} hideHeart={true} />
                    <button
                      onClick={() => handleRemove(property.property_id)}
                      className="absolute top-4 right-4 bg-white/90 hover:bg-red-500 text-gray-800 hover:text-white p-2.5 rounded-full z-10 transition shadow-md hover:shadow-lg transform hover:scale-110"
                      title="Remove from liked"
                    >
                      <X size={24} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LikedProperties;
