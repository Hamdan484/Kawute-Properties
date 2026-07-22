import React, { useState } from "react";
import { supabase } from "../supabase_client";

function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    area: "",
    bed_rooms: "",
    bath_rooms: "",
    appartment_type: "Apartment",
    availability: "Available",
    
    amenities: [],
    address: "",
    contact: "",
  });
const amenitiesList = [
  "Swimming Pool",
  "Parking Space",
  "Air Conditioning",
  "Security",
  "Gym",
  "Garden",
  "Balcony",
  "WiFi",
  "Reception Area"



];

const handleAmenityChange = (e) => {
  const { value, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    amenities: checked
      ? [...prev.amenities, value]
      : prev.amenities.filter((item) => item !== value),
  }));
};

  const [image, setImages] = useState({
    main: null,
    interior: null,
  });

  const [preview, setPreview] = useState({
    main: null,
    interior: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e, type) => {
    const file = e.target.files[0];

    if (!file) return;

    setImages((prev) => ({
      ...prev,
      [type]: file,
    }));

    setPreview((prev) => ({
      ...prev,
      [type]: URL.createObjectURL(file),
    }));
  };

  const createFileName = (file) => {
    const originalName = file.name.replace(/\.[^/.]+$/, "");

    const extension = file.name.split(".").pop();

    const safeName = originalName
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 40);

    return `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)}_${safeName}.${extension}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.price ||
      !formData.city ||
      !formData.area
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (!image.main) {
      alert("Please upload main property image");
      return;
    }

    // GET USER SESSION

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.log(sessionError);
      alert("Session error");
      return;
    }

    const userId = sessionData?.session?.user?.id;

    if (!userId) {
      alert("Please login first");
      return;
    }

    // =========================
    // UPLOAD MAIN IMAGE
    // =========================

    const mainFileName = createFileName(image.main);

    const mainPath = `${userId}/${mainFileName}`;

    const { error: mainUploadError } = await supabase.storage
      .from("property-images")
      .upload(mainPath, image.main, {
        cacheControl: "3600",
        upsert: false,
      });

    if (mainUploadError) {
      console.log(mainUploadError);
      alert("Main image upload failed");
      return;
    }

    const { data: mainUrlData } = supabase.storage
      .from("property-images")
      .getPublicUrl(mainPath);

    const mainImageUrl = mainUrlData.publicUrl;

    // =========================
    // UPLOAD INTERIOR IMAGE
    // =========================

    let interiorImageUrl = null;

    if (image.interior) {
      const interiorFileName = createFileName(image.interior);

      const interiorPath = `${userId}/${interiorFileName}`;

      const { error: interiorUploadError } = await supabase.storage
        .from("interior_images_bucket")
        .upload(interiorPath, image.interior, {
          cacheControl: "3600",
          upsert: false,
        });

      if (interiorUploadError) {
        console.log(interiorUploadError);
        alert("Interior image upload failed");
        return;
      }

      const { data: interiorUrlData } = supabase.storage
        .from("interior_images_bucket")
        .getPublicUrl(interiorPath);

      interiorImageUrl = interiorUrlData.publicUrl;
    }

    // =========================
    // INSERT PROPERTY
    // =========================

    const { error } = await supabase.from("properties").insert([
      {
        user_id: userId,

        title: formData.title,

        description: formData.description,

        price: formData.price,

        city: formData.city,

        area: formData.area,

        bed_rooms: formData.bed_rooms,

        bath_rooms: formData.bath_rooms,

        appartment_type: formData.appartment_type,

        availability: formData.availability,

        image_url: mainImageUrl,

        interior_image_url: interiorImageUrl,
        
        amenities: formData.amenities,
        address: formData.address,
        contact: formData.contact,
        
      },
    ]);

    if (error) {
      console.log(error);

      alert(error.message);

      return;
    }

    setFormData({
      title: "",
      description: "",
      price: "",
      city: "",
      area: "",
      bed_rooms: "",
      bath_rooms: "",
      appartment_type: "Apartment",
      availability: "Available",
      
      amenities: [],
      address: "",
      contact: "",
    });

    setImages({
      main: null,
      interior: null,
    });

    setPreview({
      main: null,
      interior: null,
    });

    alert("Property added successfully");
  };
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl border border-white/20 rounded-xl p-6 md:p-10 bg-black/40 backdrop-blur-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Add New Property
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            name="title"
            value={formData.title}
            placeholder="Property Title"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded"
          />

          <input
            name="price"
            value={formData.price}
            placeholder="Price"
            type="number"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded"
          />

          <input
            name="city"
            value={formData.city}
            placeholder="City"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded"
          />

          <input
            name="area"
            value={formData.area}
            placeholder="Area / Location"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded"
          />

          <input
            name="bed_rooms"
            value={formData.bed_rooms}
            placeholder="Bedrooms"
            type="number"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded"
          />

          <input
            name="bath_rooms"
            value={formData.bath_rooms}
            placeholder="Bathrooms"
            type="number"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded"
          />

          <select
            name="appartment_type"
            value={formData.appartment_type}
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded"
          >
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
            <option>Studio</option>
          </select>

          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded"
          >
            <option>Available</option>
            <option>Not available</option>
          </select>
        </div>

        <textarea
          name="description"
          value={formData.description}
          placeholder="Property Description..."
          onChange={handleChange}
          className="w-full mt-5 bg-black border border-white/20 p-3 rounded h-32"
        />

        <input  
        name="address"
            value={formData.address}
            placeholder="Address"
            type="text"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded"
        />
        <input type="text" 
        name="contact"
            value={formData.contact}
            placeholder="Contact"
            type="text"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded"
        />
<div className="mt-6">

  <label className="block mb-3 text-gray-300">
    Available Amenities
  </label>

  <div className="grid grid-cols-2 gap-3">

    {amenitiesList.map((amenity) => (
      <label key={amenity} className="flex items-center gap-2">

        <input
          type="checkbox"
          value={amenity}
          checked={formData.amenities.includes(amenity)}
          onChange={handleAmenityChange}
        />

        <span>{amenity}</span>

      </label>
    ))}

  </div>

</div>
        

        {/* MAIN IMAGE */}

        <div className="mt-6">
          <label className="block mb-2 text-gray-300">
            Upload Main Property Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e, "main")}
            className="w-full"
          />

          {preview.main && (
            <img
              src={preview.main}
              alt="Main preview"
              className="mt-4 w-full h-60 object-cover rounded"
            />
          )}
        </div>

        {/* INTERIOR IMAGE */}

        <div className="mt-6">
          <label className="block mb-2 text-gray-300">
            Upload Interior Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e, "interior")}
            className="w-full"
          />

          {preview.interior && (
            <img
              src={preview.interior}
              alt="Interior preview"
              className="mt-4 w-full h-60 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-white text-black font-semibold py-3 rounded hover:bg-gray-200 transition"
        >
          Submit Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
