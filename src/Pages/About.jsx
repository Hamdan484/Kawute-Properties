import React from "react";
import aboutImage from "/aboutImage.png";
import { Link } from "react-router-dom";
function About() {
  return (
    <div className="min-h-screen bg-white text-black pt-20">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-40 px-6 overflow-hidden min-h-[450px] w-full"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            About Kawute Properties
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
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
          <div className="bg-gray-200 p-6 rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold">500+</h2>
            <p className="text-gray-600">Properties Listed</p>
          </div>

          <div className="bg-gray-200 p-6 rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold">300+</h2>
            <p className="text-gray-600">Happy Clients</p>
          </div>

          <div className="bg-gray-200 p-6 rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold">10+</h2>
            <p className="text-gray-600">Cities Covered</p>
          </div>

          <div className="bg-gray-200 p-6 rounded-xl shadow-lg">
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
          <Link to="/properties"> 
          Explore Properties
          </Link>
        </button>
      </section>
    </div>
  );
}

export default About;
