const pjson = require("../../package.json");
const visitCounter = require("../models/visitCounter");

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

    registerNewVisit: async (req, res) => {
        try {
            const date = new Date(Date.now());
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            const result = await visitCounter.getOneDay(formattedDate);
            let response = null;
            if (result.length === 0) {
                response = await visitCounter.insertNewDay(formattedDate, 1);
            } else {
                response = await visitCounter.updateCurrentDay(formattedDate, result[0].counter += 1);
            }
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
};

module.exports = globalController;
