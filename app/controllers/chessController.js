const chessGame = require("../models/chessGame");
const currentMovesHandler = require("../middlewares/currentMovesHandler");
const saveMove = require("../middlewares/saveMove");

const chessController = {

  gameData: {
    boardData: [],
  },

  getChessGameData: async (req, res) => {
    if (Object.keys(chessController.gameData.boardData).length !== 0) {
      chessController.gameData.currentColorMovesData = await currentMovesHandler.getCurrentMovesData(chessController.gameData);
      res.json(chessController.gameData);
    } else {
      res.json("L'objet gameData est vide");
    }
  },

  resetBoardData: async (req, res) => {
    try {
      const boardData = await chessGame.getAllBoardData();
      chessController.gameData = {
        ...chessController.gameData,
        boardData: boardData,
        cimetary: [],
        currentPlayerColor: "white",
        opponentColor: "black",
      };
      res.json("OK");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  moveVerification: async (req, res) => {
    const currentMove = chessController.gameData.currentColorMovesData.moves[req.body.piece_id][req.body.order];
    if (req.body.originCase === currentMove.originCase && req.body.destinationCase === currentMove.destinationCase && req.body.killingMove === currentMove.killingMove && req.body.killCase === currentMove.killCase) {
      res.json("ok");
      chessController.gameData = saveMove.saveOurCurrentMove(req.body, chessController.gameData);
    } else {
      res.status(500).json("Il y a eu triche là, je reconnais");
    }
  }
};

module.exports = chessController;