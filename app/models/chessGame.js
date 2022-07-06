// Modèle Active Record
const db = require("../database.js");

class chessGame {
  id;
  x;
  y;
  caseColor;
  isPiece;
  controlByWhite;
  controlByBlack;
  pieceName;
  pieceId;
  pieceColor;
  pawnJustMoveTwo;
  alreadyMove;

  set case_color(val) {
    this.caseColor = val;
  }

  set is_piece(val) {
    this.isPiece = val;
  }

  set control_by_white(val) {
    this.controlByWhite = val;
  }

  set control_by_black(val) {
    this.controlByBlack = val;
  }

  set piece_name(val) {
    this.pieceName = val;
  }

  set piece_id(val) {
    this.pieceId = val;
  }

  set piece_color(val) {
    this.pieceColor = val;
  }

  set pawn_just_move_two(val) {
    this.pawnJustMoveTwo = val;
  }

  set already_move(val) {
    this.alreadyMove = val;
  }

  constructor(data = {}) {
    for (const prop in data) {
      this[prop] = data[prop];
    }
  }

  static async getAllBoardData() {
    const { rows } = await db.query("SELECT * FROM chess;");
    return rows;
  }

}

module.exports = chessGame;