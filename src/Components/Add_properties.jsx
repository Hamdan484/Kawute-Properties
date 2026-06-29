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
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (
      !formData.title ||
      !formData.price ||
      !formData.city ||
      !formData.area
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (!image) {
      alert("Please select an image");
      return;
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    if (sessionError) {
      console.error("Failed to get session:", sessionError);
      alert("Unable to verify user session. Please log in again.");
      return;
    }

    if (!userId) {
      alert("You must be logged in to add a property.");
      return;
    }

    // unique file name (remove spaces and unsafe characters)
    const originalName = image.name.replace(/\.[^/.]+$/, "");
    const fileExt = image.name.split(".").pop() || "jpg";
    const safeBase = originalName
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 50);
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2, 10)}_${safeBase}.${fileExt}`;
    const uploadPath = `${userId}/${fileName}`;
   //After userId verify user is authenticated
    if(!sessionData?.session){
      alert("session expired. please login again");
      return
    }

    // upload image to storage
    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(uploadPath, image, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      console.error("Storage upload failed:", uploadError);
      alert("Failed to upload image. Please try again.");
      return;
    }

    // get public URL
    const { data: urlData, error: urlError } = supabase.storage
      .from("property-images")
      .getPublicUrl(uploadPath);

    if (urlError) {
      console.error("Failed to get public URL:", urlError);
      alert("Failed to get image URL.");
      return;
    }

    const imageUrl = urlData.publicUrl;

    // insert into database
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
        image_url: imageUrl,
      },
    ]);

    if (error) {
  console.error("Insert error details:", error);
  alert(`Failed to save property: ${error.message}`);
  return;
}
    // reset form
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
    });

    setImage(null);
    setPreview(null);

    alert("Property submitted successfully");
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

        {/* GRID INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            name="title"
            value={formData.title}
            placeholder="Property Title"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

          <input
            name="price"
            value={formData.price}
            placeholder="Price"
            type="number"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

          <input
            name="city"
            value={formData.city}
            placeholder="City"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

          <input
            name="area"
            value={formData.area}
            placeholder="Area / Location"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

          <input
            name="bed_rooms"
            value={formData.bed_rooms}
            placeholder="Bedrooms"
            type="number"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

          <input
            name="bath_rooms"
            value={formData.bath_rooms}
            placeholder="Bath rooms"
            type="number"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

          {/* TYPE */}
          <select
            name="appartment_type"
            value={formData.appartment_type}
            onChange={handleChange}
            className="w-full mt-5 bg-black border border-white/20 p-3 rounded"
          >
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
            <option>Studio</option>
          </select>

          {/* AVAILABILITY */}
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full mt-5 bg-black border border-white/20 p-3 rounded"
          >
            <option>Available</option>
            <option>Not available</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={formData.description}
          placeholder="Property Description..."
          onChange={handleChange}
          className="w-full mt-5 bg-black border border-white/20 p-3 rounded h-28 outline-none focus:border-white"
        />

        {/* IMAGE UPLOAD */}
        <div className="mt-5">
          <label className="block mb-2 text-sm text-gray-300">
            Upload Property Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full text-sm"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 w-full h-60 object-cover rounded border border-white/20"
            />
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full mt-6 bg-white text-black font-semibold py-3 rounded hover:bg-black hover:text-white border border-white transition"
        >
          Submit Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
