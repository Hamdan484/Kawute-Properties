import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import blog1 from "../assets/BlogImages/blog1.png";
import blog2 from "../assets/BlogImages/blog2.png";
import blog3 from "../assets/BlogImages/blog3.png";
import { Link } from "react-router-dom";



function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const posts = {
    1: {
      title: "How to Buy Your First Home in Ghana",
      author: "Kawute Properties",
      date: "June 2026",
      readTime: "5 min",
      category: "Guide",
      image: blog1,
      content: `
        <h2 class="text-3xl font-bold mb-6">Getting Started</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          Buying your first home is one of the biggest decisions you'll make. This comprehensive guide will walk you through every step...
        </p>
        
        <h2 class="text-3xl font-bold mb-6 mt-8">Step 1: Check Your Financial Health</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          Before you start looking for properties, it's crucial to understand your financial situation...
        </p>

        <h2 class="text-3xl font-bold mb-6 mt-8">Step 2: Get Pre-Approved for a Mortgage</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          Pre-approval shows sellers you're serious and gives you a clear budget...
        </p>

        <h2 class="text-3xl font-bold mb-6 mt-8">Step 3: Find the Right Property</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          Work with a real estate agent to find properties that match your criteria...
        </p>
      `,
    },
    2: {
      title: "Top 5 Locations to Invest in Kumasi",
      author: "Kawute Properties",
      date: "May 2026",
      readTime: "4 min",
      category: "Investment",
      image: blog2,
      content: `
        <h2 class="text-3xl font-bold mb-6">Investment Hotspots in Kumasi</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          Kumasi is experiencing rapid growth, and smart investors are capitalizing on emerging neighborhoods...
        </p>

        <h2 class="text-3xl font-bold mb-6 mt-8">1. Adum Central Business District</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          The heart of Kumasi's commercial activity. Property values here grow 8-12% annually...
        </p>

        <h2 class="text-3xl font-bold mb-6 mt-8">2. Oduom Residential Zone</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          Premium residential area with excellent infrastructure and growing demand...
        </p>

        <h2 class="text-3xl font-bold mb-6 mt-8">3. Ejisu Highway Corridor</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          Emerging location with huge growth potential as development expands outward...
        </p>
      `,
    },
    3: {
      title: "Renting vs Buying: What Should You Do?",
      author: "Kawute Properties",
      date: "April 2026",
      readTime: "6 min",
      category: "Insights",
      image: blog3,
      content: `
        <h2 class="text-3xl font-bold mb-6">The Great Debate</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          Should you rent or buy? This is a question millions face. The answer depends on your situation...
        </p>

        <h2 class="text-3xl font-bold mb-6 mt-8">The Case for Renting</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          Flexibility, lower upfront costs, and no maintenance responsibilities are key advantages...
        </p>

        <h2 class="text-3xl font-bold mb-6 mt-8">The Case for Buying</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          Building equity, tax benefits, and long-term wealth creation make homeownership attractive...
        </p>

        <h2 class="text-3xl font-bold mb-6 mt-8">Making Your Decision</h2>
        <p class="text-gray-700 mb-4 leading-relaxed">
          Consider your timeline, financial situation, and life plans before deciding...
        </p>
      `,
    },
  };

  const post = posts[id];

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <button
            onClick={() => navigate("/blog")}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back button */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => navigate("/blog")}
          className="max-w-6xl mx-auto px-6 py-6 text-black font-semibold hover:text-gray-600 transition flex items-center gap-2"
        >
          ← Back to Blog
        </button>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <span className="inline-block text-xs font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded uppercase tracking-wider mb-6">
            {post.category}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-600">
            <p className="font-semibold">{post.author}</p>
            <span>•</span>
            <p>{post.date}</p>
            <span>•</span>
            <p>{post.readTime} read</p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full h-96 bg-gray-200 rounded-2xl overflow-hidden mb-12 border border-gray-300">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-gray-600 mb-6">
            Contact our agents today to discuss your real estate needs.
          </p>
         
            <Link to="/agent" className="bg-black text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-800 transition">
              Contact Our Agents
            </Link>
          
        </div>
      </section>
    </div>
  );
}

export default BlogPost;