import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase_client";
import {
  BedDouble,
  Bath,
  MapPin,
  Heart,
  Share2,
  ChevronLeft,
  Wifi,
  Zap,
  Droplet,
  Wind,
} from "lucide-react";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchPropertyDetails();
    // Check if property is liked
    const likedIds = JSON.parse(
      localStorage.getItem("likedProperties") || "[]",
    );
    setLiked(likedIds.includes(id));
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("property_id", id)
        .single();

      if (error) {
        console.error("Error fetching property:", error);
        setProperty(null);
      } else {
        setProperty(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold text-black mb-4">
          Property Not Found
        </h2>
        <button
          onClick={() => navigate("/properties")}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  const {
    title,
    price,
    city,
    area,
    bed_rooms,
    bath_rooms,
    appartment_type,
    availability,
    image_url,
    description,
  } = property;

  const formattedPrice = Number(price)
    ? `₵ ${Number(price).toLocaleString()}`
    : "Price unavailable";

  const imageSrc =
    image_url ||
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back Button */}
      <div className="sticky top-20 bg-white border-b z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-black hover:text-blue-600 transition"
          >
            <ChevronLeft size={20} />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Image Section */}
        <div className="mb-12">
          <div className="relative rounded-3xl overflow-hidden h-125 bg-gray-200 mb-6">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-black text-white px-6 py-2 rounded-full font-semibold">
                {appartment_type || "Property"}
              </span>
            </div>
            <div className="absolute top-6 right-6 flex gap-3">
              <button
                onClick={() => {
                  const likedIds = JSON.parse(
                    localStorage.getItem("likedProperties") || "[]",
                  );

                  let newLikedState = false;

                  if (liked) {
                    const updatedIds = likedIds.filter(
                      (likedId) => likedId !== id,
                    );
                    localStorage.setItem(
                      "likedProperties",
                      JSON.stringify(updatedIds),
                    );
                    newLikedState = false;
                    console.log("Property unliked:", id);
                  } else {
                    if (!likedIds.includes(id)) {
                      likedIds.push(id);
                      localStorage.setItem(
                        "likedProperties",
                        JSON.stringify(likedIds),
                      );
                      console.log("Property liked:", id);
                      console.log("Updated likedIds:", likedIds);
                    }
                    newLikedState = true;
                  }

                  setLiked(newLikedState);

                  // Dispatch custom event to notify other components
                  window.dispatchEvent(
                    new CustomEvent("likesUpdated", {
                      detail: { propertyId: id, isLiked: newLikedState },
                    }),
                  );
                }}
                className="bg-white p-3 rounded-full hover:bg-gray-100 transition shadow-lg"
              >
                <Heart
                  size={24}
                  className={liked ? "fill-red-500 text-red-500" : "text-black"}
                />
              </button>
              <button className="bg-white p-3 rounded-full hover:bg-gray-100 transition shadow-lg">
                <Share2 size={24} className="text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Info Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8 pb-8 border-b">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {title}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin size={20} />
                <span className="text-lg">{city || area}</span>
              </div>
              <p className="text-4xl font-bold text-black">{formattedPrice}</p>
            </div>

            {/* Property Features Grid */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 p-6 rounded-xl text-center">
                  <BedDouble size={32} className="mx-auto mb-3 text-black" />
                  <p className="text-2xl font-bold text-black">
                    {bed_rooms || "--"}
                  </p>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                </div>

                <div className="bg-gray-100 p-6 rounded-xl text-center">
                  <Bath size={32} className="mx-auto mb-3 text-black" />
                  <p className="text-2xl font-bold text-black">
                    {bath_rooms || "--"}
                  </p>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                </div>

                <div className="bg-gray-100 p-6 rounded-xl text-center">
                  <span className="text-3xl font-bold text-black block">
                    {area || "--"}
                  </span>
                  <p className="text-sm text-gray-600">sq. ft</p>
                </div>

                <div className="bg-gray-100 p-6 rounded-xl text-center">
                  <span className="text-xl font-bold text-black block">
                    {availability || "Available"}
                  </span>
                  <p className="text-sm text-gray-600">Status</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12 pb-12 border-b">
              <h2 className="text-2xl font-bold text-black mb-6">
                Description
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {description ||
                  "This beautiful property offers modern living with exceptional amenities and a prime location. Perfect for families and professionals alike."}
              </p>
            </div>

            {/* Interior & Amenities */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">
                Interior & Amenities
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                  <Wifi size={32} className="text-blue-600 mb-4" />
                  <h3 className="text-lg font-bold text-black mb-2">
                    High-Speed Internet
                  </h3>
                  <p className="text-gray-700">
                    Premium WiFi and fiber connectivity throughout
                  </p>
                </div>

                <div className="bg-linear-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl">
                  <Zap size={32} className="text-yellow-600 mb-4" />
                  <h3 className="text-lg font-bold text-black mb-2">
                    Solar Power System
                  </h3>
                  <p className="text-gray-700">
                    Eco-friendly solar panels installed
                  </p>
                </div>

                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                  <Droplet size={32} className="text-blue-600 mb-4" />
                  <h3 className="text-lg font-bold text-black mb-2">
                    Water Filtration
                  </h3>
                  <p className="text-gray-700">
                    Advanced water purification system
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
                  <Wind size={32} className="text-green-600 mb-4" />
                  <h3 className="text-lg font-bold text-black mb-2">
                    AC & Ventilation
                  </h3>
                  <p className="text-gray-700">
                    Central cooling and smart ventilation
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-gray-100 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-black mb-6">
                Additional Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 font-semibold mb-2">
                    Property Type
                  </p>
                  <p className="text-black text-lg font-bold">
                    {appartment_type}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold mb-2">
                    Availability
                  </p>
                  <p className="text-black text-lg font-bold">{availability}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold mb-2">Area</p>
                  <p className="text-black text-lg font-bold">{area} sq. ft</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold mb-2">Location</p>
                  <p className="text-black text-lg font-bold">{city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-black text-white p-8 rounded-3xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Interested?</h2>

              <div className="mb-8 pb-8 border-b border-white/20">
                <p className="text-sm text-gray-300 mb-2">Price</p>
                <p className="text-3xl font-bold text-white">
                  {formattedPrice}
                </p>
              </div>

              <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition mb-3">
                Schedule Viewing
              </button>

              <button className="w-full border-2 border-white text-white font-bold py-4 rounded-xl hover:bg-white hover:text-black transition mb-8">
                Contact Agent
              </button>

              <div className="bg-white/10 p-6 rounded-xl">
                <p className="text-sm text-gray-300 mb-3 font-semibold">
                  Quick Info
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Beds:</span>
                    <span className="font-bold">{bed_rooms || "--"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Baths:</span>
                    <span className="font-bold">{bath_rooms || "--"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Area:</span>
                    <span className="font-bold">{area || "--"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
