import React, { useEffect, useState } from "react";

function ClientMessages() {
  const [messages, setMessages] = useState([]);

  // 🔥 Replace with Supabase later
  useEffect(() => {
    const dummyMessages = [
      {
        id: 1,
        name: "John Doe",
        property: "2 Bedroom Apartment",
        message: "Is this still available?",
        status: "unread",
      },
      {
        id: 2,
        name: "Sarah Smith",
        property: "Luxury Villa",
        message: "Can I schedule a viewing tomorrow?",
        status: "read",
      },
    ];

    setMessages(dummyMessages);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-2xl font-bold mb-6">
        Client Messages
      </h1>

      <div className="space-y-4">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className="border border-white/20 p-5 rounded-xl bg-black/40"
          >

            <div className="flex justify-between">
              <h2 className="font-semibold">
                {msg.name}
              </h2>

              <span
                className={
                  msg.status === "unread"
                    ? "text-red-400"
                    : "text-green-400"
                }
              >
                {msg.status}
              </span>
            </div>

            <p className="text-sm text-gray-400 mt-1">
              Property: {msg.property}
            </p>

            <p className="mt-3">
              {msg.message}
            </p>

            <div className="flex gap-3 mt-4">

              <button className="px-3 py-1 border border-white rounded hover:bg-white hover:text-black transition">
                Reply
              </button>

              <button className="px-3 py-1 border border-white rounded hover:bg-red-500 hover:border-red-500 transition">
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ClientMessages;