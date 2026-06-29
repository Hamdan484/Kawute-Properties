import React from "react";
import HomeImage from "/HomeImage.png";
import { useState, useEffect } from "react";
import PropertyCard from "../Components/PropertyCard";
import { supabase } from "../supabase_client";

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .limit(7);

      if (error) {
        console.log("error fetching:", error);
      } else {
        setProperties(data);
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  return (
    <div>
      {/* Background image */}
      <div className="relative w-full h-[80vh]">
        <img
          src={HomeImage}
          alt="Home"
          className="w-full h-full object-cover"
        />

        {/* Dark blue overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content on top */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
            Find Your Dream Property
          </h1>

          {/* Search Box */}
          <div className="bg-white text-black p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-3 w-2/3 max-w-3xl">
            {/* Location / Search input */}
            <input
              type="text"
              placeholder="Search location..."
              className="flex-1 px-3 py-2 border rounded-md outline-none"
            />

            {/* Property Type */}
            <select className="px-3 py-2 border rounded-md">
              <option>Property Type</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
            </select>

            {/* Budget */}
            <select className="px-3 py-2 border rounded-md">
              <option>Budget</option>
              <option>$0 - $500</option>
              <option>$500 - $1000</option>
              <option>$1000+</option>
            </select>

            {/* Search Button */}
            <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </div>

      <section className="bg-black text-white px-6 py-16">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Featured Properties
        </h2>
        <p className="text-gray-400 text-center mb-10">
          Check out some of our latest listings
        </p>

        {loading ? (
          <p className="text-center">Loading properties...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
