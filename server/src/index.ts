import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { customAlphabet } from "nanoid";

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const alphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 6);
const rooms: string[] = [];

io.on("connection", (socket: Socket) => {
  socket.on("create-room", async () => {
    const roomID = nanoid();
    socket.join(roomID);
    rooms.push(roomID);
    socket.emit("room-created", roomID);
  });
  socket.on("join-room", async (roomID: string) => {
    socket.join(roomID);
    if (rooms.indexOf(roomID) > -1) io.to(roomID).emit("start-game");
    else socket.emit("invalid-id");
  });
  socket.on("send-message", async (roomID: string, message: string) => {
    io.to(roomID).emit("message", { by: socket.id, message });
  });
  socket.on("move", async (roomID: string, fen: string) => {
    io.to(roomID).emit("moved", { by: socket.id, fen });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
