# To Create new file using cmd use:

## New-Item -ItemType File -Name "filename.txt"

# Socket.io Theory

## There is two terms IO & Socket

### 1. Socket : Socket means a particular socket or user or client

### 2. IO : Io means whole circuit board where sockets are connected. Its means all the clients or sockets

## Important Keywords

## Emit , On ,Broadcast , To, Join

### emit : When we want to send the data then we use emit this event

### on : on. is used to receive the data in listner.

### to : to. is used for personal msg(room ) .....=>socket.to().emit()....to=>takes a argument as a id. if it take id of "B" then the msg send only to the user B.

### join : join. use to join people in room=>socket.join(room name)

## basic example

#### server side : io.emit(event1,"hiii");

#### client side : socket.on(event1,(m)=>console.log(m))

### we can use emit and on ...both sides client and server...

## For Example

### at client... if there is a butten which click then the socket.emit event occuress....then this data received by the server side socket.on ....and it emit ...io.emit which received by socket.io...

#### 1. client : there is a button click....socket.emit(btn,4);

#### 2. server side : socket.io(btn,(n)=>{});

#### 3. io.emit(event1,"hiii");

#### 4. socket.on(event1,(m)=>console.log(m))

## important methods

### socket.emit : msg send to particular socket or user

### io.emit : msg send to all sockets and users

### socket.broadcast.emit() : if we want to send msg to all the sockets or user execpt one user .

# Code

## Client (we used MUI)

### npm i socket.io-client

### const socket = io("http://localhost:5000");

### useEffect(() => {

### socket.on("connect", () => {

### console.log("socket connected");

### });

### }, []);

## Server

### npm i socket.io

### create a server

## Socket

### import { Server } from "socket.io";

### import { createServer } from "http";

### const server = createServer(app);

### const io = new Server(server);

### io.on("connection", (socket) => { console.log("User Connected"); console.log("Id",socket.id);});

#### io.on("connection", (socket) => {

console.log("User Connected", socket.id);

// socket.emit("welcome", `Hello this is socket emi msg ${socket.id}`);
// socket.broadcast.emit("welcome", ` ${socket.id} joined the server`); //jisne bheja hai use chodke sbko jayega msg
socket.on("disconnect", () => {
console.log(`User Disconnected ${socket.id}`);
});
});

## Middleware

### we can use middleware in a socket

### example

### io.use((socket,next)=>{

### //// if condition is true {

### next();

}
})
