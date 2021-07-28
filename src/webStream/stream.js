const stream = (socket) => {
  socket.on("subscribe", (payload) => {
    //subscribe/join a room
    socket.join(payload.room);
    socket.join(payload.socketId);

    //Inform other members in the room of new user's arrival
    if (socket.adapter.rooms[payload.room].length > 1) {
      socket.to(payload.room).emit("new user", { socketId: payload.socketId });
    }
  });

  socket.on("newUserStart", (data) => {
    socket.to(data.to).emit("newUserStart", { sender: data.sender });
  });

  socket.on("sdp", (data) => {
    socket
      .to(data.to)
      .emit("sdp", { description: data.description, sender: data.sender });
  });

  socket.on("ice candidates", (data) => {
    socket
      .to(data.to)
      .emit("ice candidates", {
        candidate: data.candidate,
        sender: data.sender,
      });
  });

  socket.on("chat", (data) => {
    socket.to(data.room).emit("chat", { sender: data.sender, msg: data.msg });
  });
};

module.exports = stream;
