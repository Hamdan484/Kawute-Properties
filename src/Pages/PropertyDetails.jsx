import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyDetailsCard from "../Components/PropertyDetailsCard";
import { supabase } from "../supabase_client";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProperty = async () => {
      if (!id) {
        setError("Property ID is missing.");
        setLoading(false);
        return;
      }

      console.log("Fetching property with UUID:", id);

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("property_id", id)
        .single();

      // Prevent updating state if the component has been unmounted
      if (cancelled) return;

      if (error) {
        console.error("Error fetching property:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      console.log("Property fetched successfully:", data);

      setProperty(data);
      setLoading(false);
    };

    fetchProperty();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-gray-500">
          Loading property...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-red-500">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-gray-500">
          Property not found.
        </p>
      </div>
    );
  }

  return (
    <PropertyDetailsCard
      property={property}
    />
  );
}

export default PropertyDetails;