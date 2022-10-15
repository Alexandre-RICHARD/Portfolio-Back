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
// Utilisation de la Jsonification pour les réponse de requêtes
app.use(express.json());
// Notre app utilisé le router
app.use(router);

// On démarre notre app
const start = () => app.listen(PORT || 3000, () => {});

module.exports = {
    start,
};
