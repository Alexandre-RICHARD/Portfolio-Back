const chessGame = require("../models/chessGame");
const currentMovesHandler = require("../middlewares/currentMovesHandler");
const saveMove = require("../middlewares/saveMove");

const chessController = {
  gameData: {
    boardData: [],
  },

  getChessGameData: (req, res) => {
    if (Object.keys(chessController.gameData.boardData).length !== 0) {
      res.json(chessController.gameData);
    } else {
      res.json("L'objet gameData est vide");
    }
  },

  resetBoardData: async (req, res) => {
    try {
      const boardData = await chessGame.getAllBoardData();
      chessController.gameData = {
        boardData: boardData,
        cimetary: [],
        currentPlayerColor: "white",
        opponentColor: "black",
      };
      chessController.calculatesMoves();
      res.json("OK");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  moveVerification: (req, res) => {
    const currentMove = chessController.gameData.currentColorMovesData.moves[req.body.piece_id][req.body.destinationCase];
    if (req.body.originCase === currentMove.originCase && req.body.destinationCase === currentMove.destinationCase && req.body.killingMove === currentMove.killingMove && req.body.killCase === currentMove.killCase) {
      chessController.gameData = saveMove.saveOurCurrentMove(req.body, chessController.gameData);
      chessController.calculatesMoves();
      res.json("ok");
    } else {
      res.status(500).json("Il y a eu triche là, je reconnais");
    }
  },

  calculatesMoves: () => {
    chessController.gameData.opponentColorMovesData = currentMovesHandler.getCurrentMovesData(chessController.gameData, "opponent");
    chessController.gameData.currentColorMovesData = currentMovesHandler.getCurrentMovesData(chessController.gameData, "player");
    delete chessController.gameData.opponentColorMovesData;
  }
};

module.exports = chessController;