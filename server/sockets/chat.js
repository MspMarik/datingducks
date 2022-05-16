//NOT TOO SURE IF WE'LL NEED STORE FILES!!!!
const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { InMemorySessionStore } = require("./sessionStore");
const sessionStore = new InMemorySessionStore();

const { InMemoryMessageStore } = require("./messageStore");
const messageStore = new InMemoryMessageStore();

const chat = (io) => {
    io.on("connection", (socket) => {
        console.log("socket id", socket.id);

        socket.on("user_join", (room) => {
            socket.join(room);
        });

        // socket.on("repeat", ({message, room}) => {
        //     io.to(room).emit("repeat", {
        //         message
        //     });
        // });

        socket.on("direct message", ({message, room}) => {
            io.to(room).emit("direct message", {
                message
            });
        });

        socket.on("disconnect", () => {
          console.log("user disconnected");
        });
    });
};

module.exports = { chat };