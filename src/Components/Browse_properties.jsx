import React, { useEffect, useState } from "react";
import { supabase } from "../supabase_client";
import PropertyCard from "./PropertyCard";

function BrowseProperties() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data, error } = await supabase.from("properties").select("*");

    if (error) {
      console.log("Error fetching properties:", error);
      return;
    }

    setProperties(data);
    setFiltered(data);
  };

  useEffect(() => {
    let result = properties;

    if (search) {
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.location?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (minPrice) {
      result = result.filter((item) => item.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter((item) => item.price <= Number(maxPrice));
    }

    if (beds) {
      result = result.filter((item) => item.beds === Number(beds));
    }

    if (type) {
      result = result.filter((item) => item.type === type);
    }

    setFiltered(result);
  }, [search, minPrice, maxPrice, beds, type, properties]);

  return (
    <div className="bg-black min-h-screen text-white px-6 py-10">
      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6">Browse Properties</h2>

      {/* FILTER BAR */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-10">
        <input
          className="p-3 rounded bg-white/10 border border-white/20 outline-none"
          type="text"
          placeholder="Search location or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className="p-3 rounded bg-white/10 border border-white/20 outline-none"
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          className="p-3 rounded bg-white/10 border border-white/20 outline-none"
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <input
          className="p-3 rounded bg-white/10 border border-white/20 outline-none"
          type="number"
          placeholder="Beds"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />

        <select
          className="p-3 rounded bg-white/10 border border-white/20 outline-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="land">Land</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-gray-400">No properties found.</p>
        ) : (
          filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseProperties;
