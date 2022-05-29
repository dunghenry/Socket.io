import { Server } from "socket.io";
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
    console.log("Connected")
    socket.on("disconnect", () => {
        console.log("Disconnected")
    })
});
io.listen(5000);