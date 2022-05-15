//NOT TOO SURE IF WE'LL NEED STORE FILES!!!!
const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();

const { InMemoryMessageStore } = require("./messageStore");
const messageStore = new InMemoryMessageStore();

const chat = (io) => {
    //CHAT FUNCTIONS NEED TO IMPLEMENT
    io.on("connection", (socket) => {
        console.log("socket id", socket.id);
        // disconnect
        socket.on("hello", (arg) => {
            console.log(arg); // world
        });
        socket.on("disconnect", () => {
          console.log("user disconnected");
        });
    });
};

module.exports = { chat };