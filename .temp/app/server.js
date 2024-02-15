app.enable("trust proxy");
const io = require("socket.io")(server, {
    cors: {
        origin: [process.env.SOCKET_IO],
    }
});
app.set("socketio", io);
app.use(express.urlencoded({
    extended: true
}));