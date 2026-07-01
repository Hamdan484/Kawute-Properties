import React from "react";
import HomeImage from "/HomeImage.png";
import { useState, useEffect } from "react";
import PropertyCard from "../Components/PropertyCard";
import { supabase } from "../supabase_client";

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });

  useEffect(() => {
    let result = properties;
    if (search) {
      result = result.filter(
        (item) =>
          item.title?.trim().toLowerCase().includes(search.toLowerCase()) ||
          item.city?.trim().toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (type) {
      result = result.filter(
        (item) => item.appartment_type.toLowerCase() === type.toLowerCase(),
      );
    }
    if (priceRange.min || priceRange.max) {
      result = result.filter(
        (item) => item.price >= priceRange.min && item.price <= priceRange.max,
      );
    }

    setFiltered(result);
  }, [search, type, priceRange, properties]);

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
      <div className="relative w-full h-[80vh] pt-20">
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Property Type */}
            <select
              className="px-3 py-2 border rounded-md"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
            </select>

            {/* Budget */}
            <select
              className="px-3 py-2 border rounded-md"
              value={budget}
              onChange={(e) => {
                setBudget(e.target.value);
                if (e.target.value) {
                  const [min, max] = e.target.value
                    .split("-")
                    .map((val) => Number(val.replace(/,/g, "")));
                  setPriceRange({ min, max: max || 10000000 });
                }
              }}
            >
              <option value="">Budget</option>
              <option value="100000-200000">$100,000 - $200,000</option>
              <option value="201000-300000">$201,000 - $300,000</option>
              <option value="301000-10000000">$301,000+</option>
            </select>
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
            {filtered.map((property, index) => (
              <PropertyCard property={property} key={property.id || index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
