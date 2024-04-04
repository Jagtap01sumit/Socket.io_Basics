import { Container, TextField, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import { io } from "socket.io-client";
export default function App() {
  const socket = io("http://localhost:5000");

  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id, "socket connected");
    });
    socket.on("welcome", (e) => {
      console.log(e, socket.id);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", `Message is send by ${socket.id}`);
    setMessage("");
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to socket.io
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Message"
          variant="outlined"
        />
        <Button variant="contained" color="primary" type="submit">
          send
        </Button>
      </form>
    </Container>
  );
}
