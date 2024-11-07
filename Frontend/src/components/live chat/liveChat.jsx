// Messaging.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SOCKET_URL = 'ws://your-backend-url/ws';

const LiveChat= () => {
  const [messages, setMessages] = useState([]); // Store chat history
  const [newMessage, setNewMessage] = useState(""); // Input state
  const [isConnected, setIsConnected] = useState(false); // WebSocket status
  const socketRef = useRef(null); // WebSocket reference
  const chatEndRef = useRef(null); // Reference to scroll to the latest message

  // Fetch chat history from the backend
  useEffect(() => {
    axios
      .get("/messages")
      .then((response) => setMessages(Array.isArray(response.data) ? response.data : []))
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setMessages([]); // Fallback to an empty array on error
      });
  }, []);

  // WebSocket connection and event handling
  useEffect(() => {
    const connectWebSocket = () => {
      socketRef.current = new WebSocket(SOCKET_URL);

      socketRef.current.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
      };

      socketRef.current.onmessage = (event) => {
        try {
          const newMsg = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, newMsg]);
        } catch (error) {
          console.error("Invalid message format:", error);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      socketRef.current.onclose = () => {
        console.warn("WebSocket closed. Reconnecting...");
        setIsConnected(false);

        // Attempt to reconnect after 5 seconds
        setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket(); // Initial connection attempt

    return () => socketRef.current?.close(); // Cleanup on unmount
  }, []);

  // Scroll to the latest message whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle input change
  const handleInputChange = (e) => setNewMessage(e.target.value);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent empty messages

    const messageData = { text: newMessage, sender: "You" };

    try {
      // Save message to the backend
      await axios.post("/messages", messageData);
      // Broadcast message via WebSocket
      socketRef.current.send(JSON.stringify(messageData));
      setNewMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar: Conversations List */}

      {/* Chat View */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border border-2 border-gray-100 bg-white flex items-center justify-between fixed w-full">
          <div>
            <p className="text-lg font-semibold text-gray-800"> Admin </p>
            <p className="text-sm text-gray-500">{isConnected ? "Online" : "Offline"}</p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-r from-orange-500 to-orange-200">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start ${msg.sender === "You" ? "justify-end" : ""}`}
            >
              <div
                className={`${
                  msg.sender === "You" ? "bg-orange-500 text-white" : "bg-white"
                } p-3 rounded-lg shadow`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs mt-1 text-gray-400">{msg.sender}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-white border flex items-center fixed bottom-0 md:w-full">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={sendMessage}
            className="ml-4 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;