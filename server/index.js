const express = require('express');
const cors = require("cors");
const app = express();
const http = require("http").createServer(app); //for socket
var io = require("socket.io")(http); //for socket
const chatSetup = require('./sockets/chat');

const configRoutes = require('./routes');

app.use(express.json());
app.use(cors());
configRoutes(app);

//socket stuff below here
chatSetup.chat(io);

// app.listen(3001, () => {
//     console.log("We've now got a server!");
//     console.log('Your routes will be running on http://localhost:3001');
// });

http.listen(3001, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3001');
});