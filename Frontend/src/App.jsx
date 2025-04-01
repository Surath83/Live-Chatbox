import React from "react";
import Chatbox from "./components/chatbox";
import Input from "./components/input";
import "./App.css";

function App() {
  return (
    <center>
      <div className="App">
        <h1>UDP Chatbox</h1>
        <Chatbox />
        <Input />
      </div>
    </center>
  );
}

export default App;
