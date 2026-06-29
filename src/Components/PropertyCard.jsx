import { BedDouble, Bath, MapPin, Heart, ArrowRight } from "lucide-react";

const PropertyCard = ({ property }) => {
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
  } = property || {};

  const formattedPrice = Number(price)
    ? `₵ ${Number(price).toLocaleString()}`
    : "Price unavailable";

  const imageSrc =
    image_url ||
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";
  return (
    <div className="group w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl mt-2">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt="Property"
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
          {appartment_type || "Property"}
        </span>

        <button className="absolute right-4 top-4 rounded-full bg-black p-2 shadow-lg transition hover:bg-white hover:text-black">
          <Heart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">{formattedPrice}</h2>

          <span className="rounded-full border border-black px-3 text-black py-1 text-xs font-medium">
            {availability || "Available"}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-black">
          {title || "Untitled Property"}
        </h3>

        {/* Location */}
        <div className="mb-5 flex items-center gap-2 text-gray-600">
          <MapPin size={18} />
          <span>{city || area || "Unknown Location"}</span>
        </div>

        {/* Property Features */}
        <div className="mb-6 flex items-center justify-between border-y py-4 text-black">
          <div className="flex items-center gap-2">
            <BedDouble size={18} />
            <span className="text-sm font-medium ">
              {bed_rooms ?? "--"} Beds
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Bath size={18} />
            <span className="text-sm font-medium ">
              {bath_rooms ?? "--"} Baths
            </span>
          </div>

          <div>
            <span className="text-sm font-medium">{area || ""}</span>
          </div>
        </div>

        {/* Button */}
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800">
          View Details
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
