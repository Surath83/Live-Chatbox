const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const messagesFile = "messages.json";

// Ensure messages file exists
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([]));
}

// 📌 Fetch messages
app.get("/messages", (req, res) => {
  fs.readFile(messagesFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read messages" });
    res.json(JSON.parse(data));
  });
});

// 📌 Send message
app.post("/send", (req, res) => {
  const { userName, message } = req.body;
  if (!userName || !message) return res.status(400).json({ error: "Invalid data" });

  fs.readFile(messagesFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read messages" });

    const messages = JSON.parse(data);
    const newMessage = { userName, message };
    messages.push(newMessage);

    fs.writeFile(messagesFile, JSON.stringify(messages), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save message" });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
