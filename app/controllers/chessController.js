const chessGame = require("../models/chessGame");
const currentMovesHandler = require("../middlewares/currentMovesHandler");
const saveMove = require("../middlewares/saveMove");

// Notre controller chess, qui récupère toutes les requêtes liées
const chessController = {
    // On créé l'objet gameData qui contient toutes les informations nécessaires aux jeu d'échecs
    gameData: {
        boardData: [],
    },

    // Requêtes demandans l'objet gameData, on le renvoit s'il n'est pas vide, sinon on indique qu'il est vide
    getChessGameData: (req, res) => {
        try {
            if (Object.keys(chessController.gameData.boardData).length !== 0) {
                res.status(200).json({gameData: chessController.gameData, ready: true});
            } else {
                res.status(200).json({ready: false});
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    // Réinitialisation du gameData, on va chercher en base de données les valeurs originales
    resetBoardData: async (req, res) => {
        try {
            const boardData = await chessGame.getAllBoardData();
            chessController.gameData = {
                boardData: boardData,
                cimetary: [],
                currentPlayerColor: "white",
                opponentColor: "black",
            };
            // Durant la réinitialisation, on demande directement le fait de calculer les mouvements possibles au premier coup
            chessController.calculatesMoves();
            res.status(200).json("Le reset des informations du plateau a été fait.");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    // Fonction appelé quand un coup est joué en front et envoyé.
    moveVerification: (req, res) => {
        // On commence par récupérer les données de coups possibles actuels et on vient vérifier que le coup envoyé est valide en le comparant avec les données serveur. Si oui, alors on valide le coup en envoyant les informations dans le fichier saveMove
        // On appelle la fonction calculatesMoves avant de terminer la requêtes
        const currentMove =
            chessController.gameData.currentColorMovesData.moves[
                req.body.piece_id
            ][req.body.destinationCase];
        if (
            req.body.originCase === currentMove.originCase &&
            req.body.destinationCase === currentMove.destinationCase &&
            req.body.killingMove === currentMove.killingMove &&
            req.body.killCase === currentMove.killCase
        ) {
            chessController.gameData = saveMove.saveOurCurrentMove(
                req.body,
                chessController.gameData
            );
            chessController.calculatesMoves();
            res.status(200).json("ok");
        } else {
            res.status(500).json("Il y a eu triche là, je reconnais");
        }
    },

    // La fonction calculatesMoves est appelé uniquement quand le jeu est initialisée, ou quand un coup a été joué. On a besoin de calculer les coups de l'adversaire pour calculer ses coups actuels.
    // Donc on commence par calculer ceux de l'adversaire donc on va se servir pour calculer les notres avant de supprimer ceux de l'adversaire
    calculatesMoves: () => {
        chessController.gameData.opponentColorMovesData =
            currentMovesHandler.getCurrentMovesData(
                chessController.gameData,
                "opponent"
            );
        chessController.gameData.currentColorMovesData =
            currentMovesHandler.getCurrentMovesData(
                chessController.gameData,
                "player"
            );
        delete chessController.gameData.opponentColorMovesData;
    },
};

module.exports = chessController;
