import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import { io } from "socket.io-client";
export default function App() {
  const socket = useMemo(() => io("http://localhost:5000"), []);

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log(socket.id, "socket connected");
    });
    socket.on("welcome", (e) => {
      console.log(e, socket.id);
    });
    socket.on("receive-message", (data) => {
      console.log(data, socket.id);
      setMessages((messages) => [...messages, data.message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };
  console.log(message);
  console.log(messages, "messages");

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 100 }} />
      <Typography variant="h4" component="div" gutterBottom>
        Welcome to socket.io
      </Typography>
      <Typography variant="h6">{socketID}</Typography>
      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>{" "}
        <TextField
          id="outlined-basic"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          label="Join Room"
          variant="outlined"
        />{" "}
        <Button variant="contained" color="primary" type="submit">
          Join
        </Button>
      </form>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Message"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          label="Room"
          variant="outlined"
        />
        <Button variant="contained" color="primary" type="submit">
          send
        </Button>
      </form>
      <Stack>
        {messages.map((mes, index) => (
          <Typography variant="h5" key={index} component="div" gutterBottom>
            {mes}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
}

//Base

// import { Container, TextField, Typography, Button } from "@mui/material";
// import React, { useEffect, useState } from "react";

// import { io } from "socket.io-client";
// export default function App() {
//   const socket = io("http://localhost:5000");

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log(socket.id, "socket connected");
//     });
//     socket.on("welcome", (e) => {
//       console.log(e, socket.id);
//     });
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     socket.emit("message", `Message is send by ${socket.id}`);
//     setMessage("");
//   };
//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h1" component="div" gutterBottom>
//         Welcome to socket.io
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           id="outlined-basic"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           label="Message"
//           variant="outlined"
//         />
//         <Button variant="contained" color="primary" type="submit">
//           send
//         </Button>
//       </form>
//     </Container>
//   );
// }
