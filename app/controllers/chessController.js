const chessGame = require("../models/chessGame");
const currentMovesHandler = require("../middlewares/currentMovesHandler");
const saveMove = require("../middlewares/saveMove");

const chessController = {

  boardData: [],
  currentColorMovesData: [],
  gameData: {
    currentPlayerColor: "white",
    opponentColor: "black",
  },

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
    }
  },

  getCurrentMovesData: async (req, res) => {
    chessController.currentColorMovesData = await currentMovesHandler.getCurrentMovesData(chessController.boardData, chessController.gameData);
    if (Object.keys(chessController.currentColorMovesData).length !== 0) {
      res.json(chessController.currentColorMovesData);
    } else {
      res.json("L'objet currentMovesData est vide");
    }
  },

  getGameData: async (req, res) => {
    res.json(chessController.gameData);
  },

  moveVerification: async (req, res) => {
    const currentMove = chessController.currentColorMovesData.moves[req.body.piece_id][req.body.order];
    if (req.body.originCase === currentMove.originCase && req.body.destinationCase === currentMove.destinationCase && req.body.killingMove === currentMove.killingMove && req.body.killCase === currentMove.killCase) {
      res.json("ok");
      chessController.boardData = saveMove.saveOurCurrentMove(req.body, chessController.boardData);
    }
    else {
      res.status(500).json("Il y a eu triche là (ou problème qui sait-je)");
    }
  }
};
  
module.exports = chessController;