import React from "react";
import {
  BedDouble,
  Bath,
  MapPin,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase_client";

function PropertyDetailsCard({ property }) {
  const navigate = useNavigate();
const deposit = (property.price*12) * 0.30;
  const handlePayment = async () => {
    
  try {
    const { data, error } = await supabase.functions.invoke(
      "initialize-payment",
      {
        body: {
          propertyId: property.property_id,
          amount: deposit,
          paymentType: "reservation_deposit",
        },
      }
    );

    if (error) {
      console.error("Functions error:", error);

      // Read the actual response returned by the Edge Function
      if (error.context) {
        const responseText = await error.context.text();
        alert("Payment initialization failed. Please try again later.");
        console.error("Actual Edge Function response:", responseText);
      }

      return;
    }

    console.log("Payment initialized successfully:", data);

    window.location.href = data.authorization_url;
  } catch (error) {
    console.error("Payment error:", error);
  }
};

  return (
    <main className="min-h-screen bg-white text-black">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={18} />
          Back to properties
        </button>

        {/* Property Header */}
        <div className="mb-8">

          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500">
            {property.appartment_type || "Property"}
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {property.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-gray-500">
            <MapPin size={18} />

            <span>
              {property.area}, {property.city}
            </span>
          </div>

        </div>

        {/* Images */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Main image */}
          <div className="h-[350px] overflow-hidden rounded-3xl bg-gray-100 md:h-[500px]">

            {property.image_url ? (
              <img
                src={property.image_url}
                alt={property.title}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No main image available
              </div>
            )}

          </div>

          {/* Interior image */}
          <div className="h-[350px] overflow-hidden rounded-3xl bg-gray-100 md:h-[500px]">

            {property.interior_image_url ? (
              <img
                src={property.interior_image_url}
                alt={`${property.title} interior`}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No interior image available
              </div>
            )}

          </div>

        </div>

        {/* Main Content */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* Left Content */}
          <div className="lg:col-span-2">

            {/* Price */}
            <section className="border-b border-gray-200 pb-6">

              <p className="text-sm text-gray-500">
                Price
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                GH₵{" "}
                {Number(property.price).toLocaleString()}
              </h2>

            </section>

            {/* Property Features */}
            <section className="grid grid-cols-3 gap-4 border-b border-gray-200 py-6">

              {/* Bedrooms */}
              <div className="flex items-center gap-3">

                <BedDouble size={24} />

                <div>
                  <p className="font-bold">
                    {property.bed_rooms ?? "--"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Bedrooms
                  </p>
                </div>

              </div>

              {/* Bathrooms */}
              <div className="flex items-center gap-3">

                <Bath size={24} />

                <div>
                  <p className="font-bold">
                    {property.bath_rooms ?? "--"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Bathrooms
                  </p>
                </div>

              </div>

              {/* Area */}
              <div>

                <p className="font-bold">
                  {property.area || "--"}
                </p>

                <p className="text-sm text-gray-500">
                  Area
                </p>

              </div>

            </section>

            {/* Description */}
            <section className="border-b border-gray-200 py-8">

              <h2 className="mb-4 text-xl font-bold">
                About this property
              </h2>

              <p className="leading-8 text-gray-600">
                {property.description ||
                  "No description available."}
              </p>

            </section>

            {/* Amenities */}
            <section className="border-b border-gray-200 py-8">

              <h2 className="mb-4 text-xl font-bold">
                Amenities
              </h2>

              {Array.isArray(property.amenities) &&
              property.amenities.length > 0 ? (

                <div className="flex flex-wrap gap-3">

                  {property.amenities.map(
                    (amenity, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-600"
                      >
                        {amenity}
                      </span>
                    )
                  )}

                </div>

              ) : (

                <p className="text-gray-500">
                  No amenities listed.
                </p>

              )}

            </section>

            {/* Address */}
            <section className="py-8">

              <h2 className="mb-4 text-xl font-bold">
                Address
              </h2>

              <p className="text-gray-600">
                {property.address ||
                  "Address not provided."}
              </p>

            </section>

          </div>

          {/* Contact Card */}
          <div>

            <div className="sticky top-8 rounded-3xl border border-gray-200 p-6 shadow-sm">

              <h2 className="text-xl font-bold">
                Interested in this property?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Contact the agent for more information about this property.
              </p>

              <textarea
                rows="5"
                placeholder="Write your message..."
                className="mt-6 w-full resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-black"
              />

              <button
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 font-medium text-white transition hover:bg-gray-800"
              >
                <MessageCircle size={18} />
                Send Message
              </button>

              {property.contact && (
                <a
                  href={`https://wa.me/${property.contact}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-black py-3 font-medium transition hover:bg-black hover:text-white"
                >
                  Contact on WhatsApp
                </a>
              )}
<button onClick={handlePayment} className="mt-3 flex w-full items-center justify-center rounded-xl border border-black py-3 font-medium transition hover:bg-black hover:text-white">
  Pay GHS {deposit.toLocaleString()} Reservation Deposit
</button>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default PropertyDetailsCard;