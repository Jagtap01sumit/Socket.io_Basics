import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { createServer } from "http";

const app = express();
const port = 5000;

const server = createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    // credentials: true, // Corrected
  })
);
app.get("/", (req, res) => {
  res.send("Hello world");
});
io.on("connection", (socket) => {
  console.log("User Connected");
  console.log("Id", socket.id);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
