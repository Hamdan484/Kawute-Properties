import React, { useState } from "react";
import Agent1 from "../assets/AgentImages/Agent1.png";
  import Agent2 from "../assets/AgentImages/Agent2.png";
  import Agent3 from "../assets/AgentImages/Agent3.png";
  import Agent4 from "../assets/AgentImages/Agent4.png";

function Agents() {
  const [hoveredId, setHoveredId] = useState(null);
  

  const agents = [
    {
      id: 1,
      name: "Kwame Opoku",
      role: "Founder & Lead Agent",
      phone: "+233 59 728 6532",
      email: "kwame@kawuteproperties.com",
      image: Agent4,
      bio: "15+ years in real estate",
    },
    {
      id: 2,
      name: "George Parker",
      role: "Senior Property Consultant",
      phone: "+233 20 123 4567",
      email: "george@kawuteproperties.com",
      image: Agent2 ,
      bio: "Expert in residential properties",
    },
    {
      id: 3,
      name: "Asante Boateng",
      role: "Sales Executive",
      phone: "+233 24 987 6543",
      email: "asante@kawuteproperties.com",
      image: Agent3,
      bio: "Specialized in commercial deals",
    },
    {
      id: 4,
      name: "John Smith",
      role: "Client Relations Manager",
      phone: "+233 55 111 2233",
      email: "john@kawuteproperties.com",
      image: Agent1,
      bio: "Dedicated client support",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-black to-gray-900 py-32 px-6 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Meet Our Agents
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experienced professionals dedicated to finding you the perfect property.
            <br />
            Trust, expertise, and results.
          </p>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onMouseEnter={() => setHoveredId(agent.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group bg-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${
                  hoveredId === agent.id
                    ? "shadow-2xl -translate-y-2 border-black"
                    : "shadow-lg border-gray-200"
                } border`}
              >
                {/* Top accent line */}
                <div
                  className={`h-1 bg-gradient-to-r from-black to-transparent transition-all duration-500 ${
                    hoveredId === agent.id ? "opacity-100" : "opacity-0"
                  }`}
                ></div>

                <div className="p-8">
                  {/* Agent Image */}
                  <div
                    className={`relative w-40 h-40 mx-auto mb-6 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                      hoveredId === agent.id
                        ? "border-black shadow-xl"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <h2 className="text-2xl font-bold text-black mb-1 text-center">
                    {agent.name}
                  </h2>
                  <p className="text-sm font-semibold text-gray-600 text-center mb-3 tracking-wide">
                    {agent.role}
                  </p>
                  <p className="text-xs text-gray-500 text-center mb-6 italic">
                    {agent.bio}
                  </p>

                  {/* Divider */}
                  <div className="border-b border-gray-200 mb-6 pb-6">
                    <p className="text-sm text-gray-700 font-medium text-center mb-1">
                      {agent.phone}
                    </p>
                    <p className="text-xs text-gray-600 text-center break-all">
                      {agent.email}
                    </p>
                  </div>

                  {/* Button */}
                  <button className="w-full bg-black text-white py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white hover:text-black border-2 border-black">
                    Contact Agent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Agents;