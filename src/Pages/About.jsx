import React from "react";
import aboutImage from "/aboutImage.png";
function About() {
  return (
    <div className="min-h-screen bg-white text-black pt-20">
      {/* Hero Section */}
      <section className="bg-black text-white py-10 md:py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-4">
            About Kawute Properties
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Helping individuals and families find the perfect property with
            trust, transparency, and professionalism.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={aboutImage}
              alt="Real Estate"
              className="rounded-xl w-full h-[400px] object-cover"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kawute properties was founded with a simple mission: to make
              buying, selling, and renting properties easier and more
              transparent for everyone.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We combine technology, market expertise, and customer-focused
              service to help clients make informed real estate decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To connect people with their dream properties through innovation,
              integrity, and exceptional service.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted and customer-centric real estate
              platform in Ghana and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-4xl font-bold">500+</h2>
            <p className="text-gray-600">Properties Listed</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">300+</h2>
            <p className="text-gray-600">Happy Clients</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">10+</h2>
            <p className="text-gray-600">Cities Covered</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">5+</h2>
            <p className="text-gray-600">Years Experience</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Find Your Dream Home?
        </h2>

        <p className="text-gray-600 mb-8">
          Browse our listings and discover properties that match your lifestyle.
        </p>

        <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
          Explore Properties
        </button>
      </section>
    </div>
  );
}

export default About;
