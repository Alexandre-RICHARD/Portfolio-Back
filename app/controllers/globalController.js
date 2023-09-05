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

    async handleVisit(req, res) {
        console.log("Pourtant si");
        try {
            // Récupérer la valeur target du req.body
            const { target } = req.body;
      
            // Obtenir la date d'aujourd'hui au format JJ/MM/YY
            const today = new Date().toLocaleDateString("fr-FR");
      
            // Rechercher une ligne dans la table "visit"
            const result = await visitCounter.getOneDay(target, today);
      
            if (result.rowCount >= 1) {
            // Si une ligne existe, incrémenter le compteur
                await visitCounter.incrementeVisits(target, today);
            } else {
            // Si aucune ligne n'existe, créer une nouvelle entrée avec le compteur à 1
                await visitCounter.newDayVisits(target, today);
            }
      
            // Répondre avec un message de succès
            res.status(200).json({ message: "Incrémentation réussie" });
        } catch (error) {
            console.error("Erreur:", error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    }
};

module.exports = globalController;
