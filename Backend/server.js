const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const messagesFile = "messages.json";

// Ensure messages file exists and is valid
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([]), "utf8");
} else {
  try {
    const data = fs.readFileSync(messagesFile, "utf8").trim();
    if (!data) fs.writeFileSync(messagesFile, JSON.stringify([]), "utf8");
  } catch (err) {
    console.error("Error reading messages file:", err);
    fs.writeFileSync(messagesFile, JSON.stringify([]), "utf8");
  }
}

// 📌 Fetch messages
app.get("/messages", (req, res) => {
  fs.readFile(messagesFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read messages" });

    try {
      const messages = data.trim() ? JSON.parse(data) : [];
      res.json(messages);
    } catch (parseErr) {
      console.error("JSON Parse Error:", parseErr);
      res.status(500).json({ error: "Corrupted messages file" });
    }
  });
});

// 📌 Send message
app.post("/send", (req, res) => {
  const { userName, message } = req.body;
  if (!userName || !message) return res.status(400).json({ error: "Invalid data" });

  fs.readFile(messagesFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read messages" });

    let messages = [];
    try {
      messages = data.trim() ? JSON.parse(data) : [];
    } catch (parseErr) {
      return res.status(500).json({ error: "Corrupted messages file" });
    }

    const newMessage = { userName, message };
    messages.push(newMessage);

    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save message" });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
