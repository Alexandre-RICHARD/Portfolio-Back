const pjson = require("../../package.json");

// Notre controller de base qui ne sert qu'à faire un test de fonctionnement et indique une réponse sur l'URL de base du server
const globalController = {
    test: (req, res) => {
        const counter = req.counter;
        const fullUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
        res.status(200).json({
            title: "Serveur fonctionnel",
            url: fullUrl,
            version: pjson.version,
            numberOfUse: counter,
        });
    },
};

module.exports = globalController;
