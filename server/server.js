import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { createServer } from "http";

const app = express();
const port = 5000;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  socket.on("message", (data) => {
    console.log(data);
    // socket.broadcast.emit("receive-message", data);
    io.to(data.room).emit("receive-message", data);
  });
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User joined ${room}`);
  });

  // socket.emit("welcome", `Hello this is socket emi msg ${socket.id}`);
  // socket.broadcast.emit("welcome", ` ${socket.id} joined the server`); //jisne bheja hai use chodke sbko jayega msg
  socket.on("disconnect", () => {
    console.log(`User Disconnected ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Base

// import express from "express";
// import { Server } from "socket.io";
// import cors from "cors";
// import { createServer } from "http";

// const app = express();
// const port = 5000;

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });
// io.on("connection", (socket) => {
//   console.log("User Connected", socket.id);
//   socket.on("message", (data) => {
//     console.log(data);
//   });

// socket.emit("welcome", `Hello this is socket emi msg ${socket.id}`);
// socket.broadcast.emit("welcome", ` ${socket.id} joined the server`); //jisne bheja hai use chodke sbko jayega msg
//   socket.on("disconnect", () => {
//     console.log(`User Disconnected ${socket.id}`);
//   });
// });

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
