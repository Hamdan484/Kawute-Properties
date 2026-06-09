import React, { useState } from "react";

function SavedListings() {
  const [saved, setSaved] = useState([
    {
      id: 1,
      title: "Modern 3 Bedroom House",
      location: "East Legon, Accra",
      price: 450000,
      beds: 3,
      baths: 2,
      type: "House",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    },
    {
      id: 2,
      title: "Luxury Apartment",
      location: "Airport Residential, Accra",
      price: 800000,
      beds: 2,
      baths: 2,
      type: "Apartment",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    },
    {
      id: 3,
      title: "Family Home with Garden",
      location: "Kumasi, Ghana",
      price: 320000,
      beds: 4,
      baths: 3,
      type: "House",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    },
  ]);

  const removeSaved = (id) => {
    setSaved(saved.filter((item) => item.id !== id));
  };

  return (
    <div className="saved-container">
      <h2>Saved Listings ❤️</h2>

      {saved.length === 0 ? (
        <p>You have no saved properties yet.</p>
      ) : (
        <div className="saved-grid">
          {saved.map((item) => (
            <div key={item.id} className="saved-card">
              <img src={item.image} alt={item.title} />

              <div className="saved-info">
                <h3>{item.title}</h3>
                <p>{item.location}</p>
                <p>₵ {item.price.toLocaleString()}</p>
                <p>
                  {item.beds} Beds • {item.baths} Baths
                </p>
                <p className="type">{item.type}</p>

                <button onClick={() => removeSaved(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedListings;