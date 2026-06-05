import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Blog() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const posts = [
    
    {
      id: 1,
      title: "How to Buy Your First Home in Ghana",
      description:
        "A comprehensive guide to help first-time buyers navigate the real estate process with confidence and avoid costly mistakes.",
      author: "Kawute Properties",
      date: "June 2026",
      category: "Guide",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Top 5 Locations to Invest in Kumasi",
      description:
        "Discover the fastest-growing neighborhoods in Kumasi where property values are accelerating and investment returns are highest.",
      author: "Kawute Properties",
      date: "May 2026",
      category: "Investment",
      readTime: "4 min",
    },
    {
      id: 3,
      title: "Renting vs Buying: What Should You Do?",
      description:
        "We break down the financial and lifestyle pros and cons of renting versus buying property in today's market.",
      author: "Kawute Properties",
      date: "April 2026",
      category: "Insights",
      readTime: "6 min",
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-black to-gray-900 py-32 px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -ml-48 -mb-48"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Our Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights, strategies, and market updates from real estate experts.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:border-black hover:-translate-y-2 flex flex-col"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>

                {/* Category badge */}
                <span className="inline-block text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded mb-4 w-fit border border-gray-300 uppercase tracking-wider">
                  {post.category}
                </span>

                {/* Title */}
                <h2 className="text-2xl font-bold text-black mb-4 leading-snug group-hover:text-gray-800 transition-colors duration-300">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  {post.description}
                </p>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-6 mt-auto">
                  {/* Meta info */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-semibold text-sm text-black">
                        {post.author}
                      </p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                      {post.readTime} read
                    </span>
                  </div>

                  {/* Read more button */}
                  <button
  onClick={() => navigate(`/blog/${post.id}`)}
  className="text-black font-semibold text-sm hover:gap-3 flex items-center gap-1 transition-all duration-300 group/btn"
>
  Read More
  <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
    →
  </span>
</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-24 px-6 overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-black opacity-3 rounded-full blur-3xl -mr-48 -mt-48"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-black mb-4">Stay Updated</h2>

          <p className="text-lg text-gray-600 mb-8">
            Get the latest real estate insights delivered to your inbox every week.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-10 outline-none transition-all duration-300 text-gray-900 placeholder-gray-500"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white hover:text-black border-2 border-black tracking-wide"
            >
              {subscribed ? "✓ Subscribed!" : "Subscribe Now"}
            </button>

            {subscribed && (
              <p className="text-black font-semibold text-sm animate-pulse">
                ✓ Thank you! Check your email for confirmation.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default Blog;