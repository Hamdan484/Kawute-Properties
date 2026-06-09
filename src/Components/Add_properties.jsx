import React, { useState } from "react";

function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    type: "Apartment",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 Here you will send to Supabase / API later
    console.log("Property Data:", formData);
    console.log("Image File:", image);

    alert("Property submitted successfully (connect backend next)");
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
            placeholder="Property Title"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

          <input
            name="price"
            placeholder="Price"
            type="number"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

          <input
            name="area"
            placeholder="Area / Location"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

          <input
            name="bedrooms"
            placeholder="Bedrooms"
            type="number"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

          <input
            name="bathrooms"
            placeholder="Bathrooms"
            type="number"
            onChange={handleChange}
            className="bg-black border border-white/20 p-3 rounded outline-none focus:border-white"
          />

        </div>

        {/* TYPE */}
        <select
          name="type"
          onChange={handleChange}
          className="w-full mt-5 bg-black border border-white/20 p-3 rounded"
        >
          <option>Apartment</option>
          <option>House</option>
          <option>Villa</option>
          <option>Studio</option>
        </select>

        {/* DESCRIPTION */}
        <textarea
          name="description"
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

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 w-full h-60 object-cover rounded border border-white/20"
            />
          )}
        </div>

        {/* SUBMIT BUTTON */}
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