const chessGame = require("../models/chessGame");

const chessController = {
  getBoardData: async (req, res) => {
    try {
      const boardData = await chessGame.getAllBoardData();
      res.json(boardData);
    } catch (error) {
      res.status(404).json(error.message);
      console.log("Erreur lors de la récupération des données du jeu", error);
    }
  },
};
  
module.exports = chessController;