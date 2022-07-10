const db = require("../database.js");

class chessGame {
  static async getAllBoardData() {
    const {
      rows
    } = await db.query("SELECT * FROM chess;");
    return rows;
  }
}

module.exports = chessGame;