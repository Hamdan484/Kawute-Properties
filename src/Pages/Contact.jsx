import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const handleChange =(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit =(e)=>{
    e.preventDefault();

    console.log(formData);
    alert("Message Sent Successfully!");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out for inquiries, property
            consultations, or support.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Get In Touch
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-xl mb-2">Address</h3>
                <p className="text-gray-600">
                  Kumasi, Ashanti Region, Ghana
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">Phone</h3>
                <p className="text-gray-600">
                  +233 59 778 8861
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">Email</h3>
                <p className="text-gray-600">
                  info@KawuteProperties.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Working Hours
                </h3>
                <p className="text-gray-600">
                  Monday - Friday: 8:00 AM - 6:00 PM
                </p>
                <p className="text-gray-600">
                  Saturday: 9:00 AM - 3:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-100 p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold mb-6">
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black"
              />

              <textarea
                name="message"
                rows="6"
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg outline-none focus:border-black resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Google Maps Placeholder */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 rounded-2xl h-80 flex ">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.844444444444!2d-0.5666666666666667!3d5.555555555555555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDVMzIwLjEwNjYyNzQgNTAuMjYwMzUyNzQgLTAgQnVpbGQgQ29tcGFueSwgQ29tcGFueSBEZXBhcnRtZW50LCBLYXdpdGUgUHJvcGVydGllcywgS29uZ29sYSwgR2hhbmE!" frameBorder="0" className="w-full h-full"></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;