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