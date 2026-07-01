import React, { useEffect, useState } from "react";
import { supabase } from "../supabase_client";
import PropertyCard from "../Components/PropertyCard";
import { Search, Filter } from "lucide-react";

function Listings() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [type, setType] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase.from("properties").select("*");

      if (error) {
        console.log("Error fetching properties:", error);
        return;
      }

      setProperties(data || []);
      setFiltered(data || []);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = properties;

    if (search) {
      result = result.filter(
        (item) =>
          item.title?.trim().toLowerCase().includes(search.toLowerCase()) ||
          item.city?.trim().toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (minPrice) {
      result = result.filter((item) => item.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter((item) => item.price <= Number(maxPrice));
    }

    if (beds) {
      result = result.filter((item) => item.bed_rooms === Number(beds));
    }

    if (type) {
      result = result.filter(
        (item) => item.appartment_type?.toLowerCase() === type.toLowerCase(),
      );
    }

    setFiltered(result);
  }, [search, minPrice, maxPrice, beds, type, properties]);

  const handleResetFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setBeds("");
    setType("");
  };

  const activeFilters =
    [search, minPrice, maxPrice, beds, type].filter(Boolean).length > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-zinc-900 px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Our Listings
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Explore our curated collection of premium properties. Find your
            perfect home today.
          </p>

          {/* Main Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by city, title, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-zinc-900 px-6 py-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
          >
            <Filter size={18} />
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>

          {/* Filter Grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${
              showFilters ? "block" : "hidden lg:grid"
            }`}
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Min Price
              </label>
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Price
              </label>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                placeholder="Number of Beds"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Property Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:border-blue-500 transition"
              >
                <option value="">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="land">Land</option>
              </select>
            </div>

            {activeFilters && (
              <div className="flex items-end">
                <button
                  onClick={handleResetFilters}
                  className="w-full px-4 py-2 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 font-medium hover:bg-red-600/30 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {activeFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {search && (
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300">
                  Search: {search} ✕
                </span>
              )}
              {minPrice && (
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300">
                  Min: ₵{Number(minPrice).toLocaleString()} ✕
                </span>
              )}
              {maxPrice && (
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300">
                  Max: ₵{Number(maxPrice).toLocaleString()} ✕
                </span>
              )}
              {beds && (
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300">
                  {beds} Beds ✕
                </span>
              )}
              {type && (
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300">
                  {type} ✕
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Results Counter */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Results
                <span className="text-gray-400 ml-2">
                  ({filtered.length} properties found)
                </span>
              </h2>
            </div>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400 mb-4">No properties found</p>
              <p className="text-sm text-gray-500">
                Try adjusting your filters or search criteria
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property, index) => (
                <PropertyCard key={property.id || index} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Listings;
