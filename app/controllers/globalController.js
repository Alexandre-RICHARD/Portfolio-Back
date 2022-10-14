const pjson = require("../../package.json");
const globalController = {
    test: (req, res) => {
        const fullUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
        res.json(`Serveur fonctionnel sur l'adresse ${fullUrl} - Version actuelle : ${pjson.version}`);
    },
};

module.exports = globalController;
