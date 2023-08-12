// On importe dotenv pour utiliser les variables d'environnement
require("dotenv").config();
// On importe express, notre créateur de serveur
const express = require("express");
// On importe notre port depuis le .env
const PORT = process.env.LOCAL_PORT;
// On importe notre router
const router = require("./router");
// On importe CORS, utilisé pour les requêtes et les authorisations
const cors = require("cors");
// On créé app avec express
const app = express();

// Pour qu'express comprenne l'utilisation de proxy et puissent comprendre l'utilisation de req.protocol qui ne donnait auparavant que HTTP au lieu de HTTPS
app.enable("trust proxy");
// Utilisation de CORS
app.use(cors());
// Création du serveur à partir d'App pour pouvoir réutiliser le protocole HTTP
const server = require("http").createServer(app);
// Connection du server au package socket.io pour créer une instance d'écoute
const io = require("socket.io")(server, {
    cors: {
        origin: [process.env.SOCKET_IO],
    }
});
// Lien entre le serveur (contenant maintenant socket.io) et l'app
app.set("socketio", io);
// Utilisation de la Jsonification pour les réponse de requêtes
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));
// Notre app utilisé le router
app.use(router);

// io.on("connection", (socket) => {
// });

// On démarre notre app
const start = () => {
    server.listen(PORT || 3000, () => {
        console.log(`Notre serveur fonctionne bien sur le port ${PORT}.`);
    });
};

module.exports = {
    start,
};
