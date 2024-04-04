import React, { useEffect } from "react";
import { io } from "socket.io-client";
export default function App() {
  const socket = io("http://localhost:5000");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
    });
  }, []);
  return <div>App</div>;
}
