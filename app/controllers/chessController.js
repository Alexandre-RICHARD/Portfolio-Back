const chessGame = require("../models/chessGame");
const currentMovesHandler = require("../middlewares/currentMovesHandler");

const chessController = {

  boardData: [],
  currentPlayerColor: "white",
  opponentColor: "black",

  getBoardData: (req, res) => {
    if (Object.keys(chessController.boardData).length !== 0) {
      res.json(chessController.boardData);
    } else {
      res.json("L'objet boardData est vide");
    }
  },

  resetBoardData: async (req, res) => {
    try {
      const boardData = await chessGame.getAllBoardData();
      chessController.boardData = boardData;
      res.json("OK");
    } catch (error) {
      res.status(500).json(error.message);
      console.log("Erreur lors de la récupération des données du jeu", error);
    }
  },

  getCurrentMovesData: async (req, res) => {
    const currentMovesData = await currentMovesHandler.getCurrentMovesData(chessController.boardData, chessController.currentPlayerColor, chessController.opponentColor);
    if (Object.keys(currentMovesData).length !== 0) {
      res.json(currentMovesData);
    } else {
      res.json("L'objet currentMovesData est vide");
    }
  }
};
  
module.exports = chessController;