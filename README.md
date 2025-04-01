# Chatbox Application

A simple real-time chat application using React.js for the frontend and Node.js with Express for the backend.

## 🚀 Features
- Send and receive messages instantly
- Persistent message storage using `temp.json`
- Messages formatted as `username: message`
- Auto-scroll to the latest message
- Enter key support to send messages
- Auto-clear message history on server restart

## 🛠 Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Storage:** JSON file (`temp.json`)

## 📂 Project Structure
```
📁 chatbox-app
│── 📁 frontend  # React.js frontend
│   ├── 📄 src/
│   │   ├── 📄 components/Chatbox.jsx
│   │   ├── 📄 components/Input.jsx
│   │   ├── 📄 styles/chatbox.module.css
│   │   ├── 📄 styles/input.module.css
│── 📁 backend   # Express.js backend
│   ├── 📄 server.js
│   ├── 📄 temp.json
│── 📄 README.md
```

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/chatbox-app.git
cd chatbox-app
```

### 2️⃣ Install Dependencies
#### Backend
```sh
cd backend
npm install
```

#### Frontend
```sh
cd frontend
npm install
```

### 3️⃣ Start the Application
#### Run Backend Server
```sh
cd backend
node server.js
```

#### Run Frontend React App
```sh
cd frontend
npm start
```

## 📝 API Endpoints
### 1️⃣ Send a Message
```http
POST /send
```
**Request Body:**
```json
{
  "username": "JohnDoe",
  "message": "Hello World!"
}
```
**Response:**
```json
{
  "success": true
}
```

### 2️⃣ Fetch Messages
```http
GET /messages
```
**Response:**
```json
[
  { "username": "JohnDoe", "message": "Hello World!" }
]
```

## 🛠 Troubleshooting
1. **WebSocket errors?**
   - WebSockets were removed. Ensure API calls are made to `http://localhost:5000/send`.

2. **`temp.json` not updating?**
   - Ensure the backend has write permissions to `temp.json`.

## 📜 License
This project is licensed under the MIT License.

---
### 💡 Contributions & Issues
Feel free to open an issue or submit a pull request!

Happy coding! 🎉

