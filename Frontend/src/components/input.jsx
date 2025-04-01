import React, { useState, useEffect } from "react";
import Style from "./input.module.css";

function Input() {
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName("Anonymous" + Math.floor(Math.random() * 1000000));
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        await fetch("http://localhost:5000/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, message }),
        });
        setMessage(""); // Clear input after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={Style.box1}>
      <h2>Username: {userName}</h2>
      <input
        className={Style.inputbox}
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress} // Send on Enter key press
      />
      <button className={Style.button} onClick={sendMessage}>
        <span>SEND</span>
      </button>
    </div>
  );
}

export default Input;
