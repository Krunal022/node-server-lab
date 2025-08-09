import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [socket, setSocket] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // This useEffect is used to connect to the server and send the message to the server
  useEffect(() => {
    // Connect to the server using socket.io
    const socketInstance = io("http://localhost:3000"); // Adjust the URL if needed

    // Set the socket instance to the state
    setSocket(socketInstance);

    // Listen for the connection event
    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    // Listen for the ai-response event
    socketInstance.on("ai-response", (data) => {
      const aiMessage = { text: data.response, sender: "ai" };
      setChatHistory((prevHistory) => [...prevHistory, aiMessage]);
    });
  }, []);

  // This function is used to handle the submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the input is empty, return

    if (!input.trim()) return;

    // Add the new message to the chat history
    const newMessage = { text: input, sender: "user" };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    // Send the message to the server
    // If the socket is connected, send the message to the server
    if (socket) {
      socket.emit("message", { prompt: input });
    } else {
      console.error("Socket not connected");
    }

    setInput("");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI Chatbot</h1>
      </header>
      <main className="chat-container" ref={chatContainerRef}>
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </main>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
