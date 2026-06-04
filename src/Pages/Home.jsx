import React from "react"
import HomeImage from "/HomeImage.png"

function Home() {
  return (
    <div className="relative w-full h-[80vh]">

      {/* Background image */}
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
          />

          {/* Property Type */}
          <select className="px-3 py-2 border rounded-md">
            <option>Property Type</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
          </select>

          {/* Budget */}
          <select className="px-3 py-2 border rounded-md">
            <option>Budget</option>
            <option>$0 - $500</option>
            <option>$500 - $1000</option>
            <option>$1000+</option>
          </select>

          {/* Search Button */}
          <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-blue-700">
            Search
          </button>

        </div>

      </div>
    </div>
  )
}

export default Home