
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SOCKET_URL = 'ws://your-backend-url/ws';

const Messaging = () => {
  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState(""); 
  const [isConnected, setIsConnected] = useState(false); 
  const socketRef = useRef(null); 
  const chatEndRef = useRef(null); 
  useEffect(() => {
    axios
      .get("/messages")
      .then((response) => setMessages(Array.isArray(response.data) ? response.data : []))
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setMessages([]); 
      });
  }, []);
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
        setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket(); 

    return () => socketRef.current?.close(); 
  }, []);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleInputChange = (e) => setNewMessage(e.target.value);
  const sendMessage = async () => {
    if (!newMessage.trim()) return; 

    const messageData = { text: newMessage, sender: "You" };

    try {
      await axios.post("/messages", messageData);
      socketRef.current.send(JSON.stringify(messageData));
      setNewMessage(""); 
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {}
      <div className="w-1/3 lg:w-1/4 bg-white border border-2 border-gray-100">
        <div className="p-4 border border-2 bg-gray-50 fixed w-1/3 h-18 top-16">
          <p className="text-xl  font-semibold text-orange-600">Messages</p>
        </div>
      </div>

      {}
      <div className="flex-1 flex flex-col">
        {}
        <div className="p-4 border border-2 border-gray-100 bg-white flex items-center justify-between fixed w-full">
          <div>
            <p className="text-lg font-semibold text-gray-800">Chat with Akshay</p>
            <p className="text-sm text-gray-500">{isConnected ? "Online" : "Offline"}</p>
          </div>
        </div>

        {}
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

        {}
        <div className="p-4 bg-white border flex items-center fixed bottom-0 md:w-3/4">
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

export default Messaging;
