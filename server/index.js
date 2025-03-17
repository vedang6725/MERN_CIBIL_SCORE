import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import message from "./routes/messages.js"
import notification from "./routes/notifications.js"
import { Server } from "socket.io";
import http from "http" // ✅ Import new route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Listen for new messages
  socket.on('new_message', (message) => {
    // Broadcast to all clients except sender
    socket.broadcast.emit('notification', {
      message: message.content,
      sender: message.sender,
      createdAt: new Date()
    });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/Bankdata")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/user", authRoutes);
app.use("/profile", profileRoutes);
app.use("/dashboard", dashboardRoutes); // ✅ Add dashboard routes
app.use('/api/messages', message);
app.use('/api/notifications', notification);

// Basic route
app.get('/', (req, res) => {
  res.send('Notification API is running');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
