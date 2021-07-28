//Using express to create a server
let express = require("express");
let app = express();
let path = require("path");

//initializing socket io
let http = require("http");
let socketio = require("socket.io");
let server = http.Server(app);
let io = socketio(server);

let stream = require("./webStream/stream");

//loading static files in the app
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.of("/stream").on("connection", stream);

const PORT = 3000;
server.listen(PORT, () => console.log("Server running..."));
