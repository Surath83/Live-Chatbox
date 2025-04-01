import React, { useState, useEffect, useRef } from "react";
import Style from "./chatbox.module.css";

function Chatbox() {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/messages");
        const data = await response.json();

        // Ensure data is an array of objects with { username, message }
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Invalid response format:", data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 1);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={Style.chatContainer}>
      <h3>Live Chat</h3>
      <div className={Style.chatBox}>
        {messages.length === 0 ? (
          <p className={Style.empty}>No messages yet...</p>
        ) : (
          messages.map((msg, index) => (
            <p key={index} className={Style.message}>
              <strong>{msg.userName || "Unknown"}:</strong> {msg.message}
            </p>
          ))
        )}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}

export default Chatbox;
