import React, { useEffect, useState } from "react";

function MyProperties() {
  const [properties, setProperties] = useState([]);

  // 🔥 Replace this with Supabase later
  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        title: "2 Bedroom Apartment",
        price: 1200,
        city: "Kumasi",
        status: "Active",
        image:"https://th.bing.com/th/id/OIP.Vws3e2lZwzOQ5e1Wh-EYyAHaE8?w=286&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
      },
      {
        id: 2,
        title: "Luxury Villa",
        price: 5000,
        city: "Accra",
        status: "Pending",
        image:"https://tse2.mm.bing.net/th/id/OIP.ivqYtXZ8oFjIKc_fbkoVhgHaEN?rs=1&pid=ImgDetMain&o=7&rm=3"
      },
    ];

    setProperties(dummyData);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Properties
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {properties.map((property) => (
          <div
            key={property.id}
            className="border border-white/20 rounded-xl p-5 bg-black/40 hover:bg-white hover:text-black transition"
          >
            <h2 className="text-lg font-semibold">
              {property.title}
            </h2>

            <p className="text-sm mt-2">
              {property.city}
            </p>

            <p className="mt-2 font-bold">
              ${property.price}
            </p>

            <p className="mt-3 text-sm">
              Status:
              <span
                className={
                  property.status === "Active"
                    ? "text-green-400 ml-2"
                    : "text-yellow-400 ml-2"
                }
              >
                {property.status}
              </span>
            </p>
            <p>
              <img src={property.image} alt={property.title} />
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">

              <button className="px-3 py-1 border border-white rounded hover:bg-white hover:text-black transition">
                Edit
              </button>

              <button className="px-3 py-1 border border-white rounded hover:bg-red-500 hover:border-red-500 transition">
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default MyProperties;