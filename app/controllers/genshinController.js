const genshinHandler = require("../models/genshinHandler");
const { v4 } = require("uuid");

// Les données venant du front vont venir subir les mêmes tests regex qu'en front. Ceci afin d'être sûr que l'utilisateur n'a pas modifié le code front. Et si on vérifie en front d'abord, c'est pour limiter les requêtes inutiles et donc de saturer le serveur
//  Le fonctionnement est similaire pour les deux fonctions. On créer une variable inputError pour chaque valeur. On le test exactement comme en front. Si l'input passe le test, il est ok, sinon on inscrit une erreur commune.
// A la fin, on vérifie si tous les résultats de tests sont ok, si oui, on envoi les données dans les models pour utilisation en BDD
const genshinController = {
    generateUuid: async (req, res) => {
        try {
            const newUuid = v4();
            await genshinHandler.registerUuid(newUuid);
            res.status(200).json(newUuid);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    loginWithUuid: async (req, res) => {
        const uuid = req.body.uuid;
        try {
            const result = await genshinHandler.getUserId(uuid);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json("Pas d'informations sauvegardés avec cet identifiant");
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getUserId: async (uuid) => {
        try {
            const result = await genshinHandler.getUserId(uuid);
            return result;
        } catch (error) {
            console.error(error);
        }
    },

    getOneData: async (req, res) => {
        try {
            const { uuid, data_type } = req.body;
            const userId = await genshinController.getUserId(uuid);
            const result = await genshinHandler.getOneData(userId[0].id, data_type);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    saveOneData: async (req, res) => {
        const refDateType = ["genshinCharactersData", "genshinWeaponsData", "genshinMaterialsData", "genshinOptionsData"];
        const { uuid, data_type, data_string } = req.body;
        if (refDateType.indexOf(data_type) < 0) {
            res.status(406).json("Type de donnée erronnée, êtes-vous en train de faire n'importe quoi ?");
        } else {
            try {
                const userId = await genshinController.getUserId(uuid);
                const result = await genshinHandler.saveOneData(userId[0].id, data_type, data_string);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error.message);
            }
            
        }
    },

    deleteOneData: async (req, res) => {
        const { uuid, data_type } = req.body;
        try {
            const userId = await genshinController.getUserId(uuid);
            await genshinHandler.deleteOneData(userId[0].id, data_type);
            res.status(200).json("Done");
        } catch (error) {
            res.status(500).json(["server-error"]);
        }
    },

    deleteOneUser: async (req, res) => {
        const { uuid } = req.body;
        try {
            await genshinHandler.deleteOneUser(uuid);
            res.status(200).json("Done");
        } catch (error) {
            res.status(500).json(["server-error"]);
        }
    },
};

module.exports = genshinController;
