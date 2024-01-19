const socketIoController = {
    playerList: {},
    oneMorePlayer: (req, res) => {
        const io = req.app.get("socketio");
        try {
            if (Object.values(socketIoController.playerList).find(element => element === req.body.nickname) === undefined ) {
                socketIoController.playerList[req.body.socketId] = req.body.nickname;
                res.json("Joueur enregistré sur le serveur");
                io.emit("playerList", Object.values(socketIoController.playerList));
            } else {
                return res.status(403).json("nicknameAlreadyUse");
            }
        } catch (err) {
            res.status(404).json(err.message);
        }
    },
    oneLessPlayer: (req, res) => {
        try {
            const io = req.app.get("socketio");
            delete socketIoController.playerList[req.body.socketId];
            io.emit("playerList", Object.values(socketIoController.playerList));
            return res.status(200);
        } catch (err) {
            res.status(404).json(err.message);
        }
    },
    messageOnChat: (req, res) => {
        const io = req.app.get("socketio");
        io.emit("newGlobalMessage", {talker: req.body.talker, time: req.body.time, message: req.body.message});
        try {
            res.json("Message reçu");
        } catch (err) {
            res.status(404).json(err.message);
        }
    }
};

module.exports = socketIoController;