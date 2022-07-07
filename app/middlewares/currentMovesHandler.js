const currentMovesHandler = {

  currentMoves: {},

  pawnMoves: (boardData) => {
    const currentPieces = boardData.filter(element => element.piece_name === "pawn" && element.piece_color === currentMovesHandler.playerColor);
    currentPieces.forEach(piece => {
      let moveCounter = 1;
      currentMovesHandler.currentMoves[piece.piece_id] = {};
      for (let i = 1; i < 3; i++) {
        const destinationCase = boardData.find(element => element.x === piece.x && element.y === piece.y + i * currentMovesHandler.calcDirection);
        if (destinationCase) {
          if (destinationCase.piece_name === null && (i === 1 || (i === 2 & piece.already_move === false))) {
            currentMovesHandler.currentMoves[piece.piece_id][moveCounter] = {
              originCase: piece.case_name,
              destinationCase: destinationCase.case_name,
              killingMove: false,
              killCase: null,
            };
            moveCounter++;
          }
        }
      }
      for (let i = -1; i < 2; i += 2) {
        const destinationCase = boardData.find(element => element.x === piece.x + i && element.y === piece.y + 1 * currentMovesHandler.calcDirection);
        if (destinationCase) {
          if (destinationCase.piece_color === currentMovesHandler.opponentColor) {
            currentMovesHandler.currentMoves[piece.piece_id][moveCounter] = {
              originCase: piece.case_name,
              destinationCase: destinationCase.case_name,
              killingMove: true,
              killCase: destinationCase.case_name,
            };
            moveCounter++;
          }
        }
      }
      for (let i = -1; i < 2; i += 2) {
        const destinationCase = boardData.find(element => element.x === piece.x + i && element.y === piece.y + 1 * currentMovesHandler.calcDirection);
        const killCase = boardData.find(element => element.x === piece.x + i && element.y === piece.y);
        if (destinationCase && killCase) {
          if (destinationCase.piece_name === null && killCase.piece_color === currentMovesHandler.opponentColor && killCase.pawn_just_move_two === true) {
            currentMovesHandler.currentMoves[piece.piece_id][moveCounter] = {
              originCase: piece.case_name,
              destinationCase: destinationCase.case_name,
              killingMove: true,
              killCase: killCase.case_name,
            };
            moveCounter++;
          }
        }
      }


      if (Object.keys(currentMovesHandler.currentMoves[piece.piece_id]).length === 0) {
        currentMovesHandler.currentMoves[piece.piece_id] = null;
      }
    });
  },

  // rookMoves: (boardData) => {

  // },

  // knightMoves: (boardData) => {

  // },

  // bishopMoves: (boardData) => {

  // },

  // queenMoves: (boardData) => {

  // },

  // kingMoves: (boardData) => {

  // },

  getCurrentMovesData: (boardData, playerColor, opponentColor) => {
    currentMovesHandler.playerColor = playerColor;
    currentMovesHandler.opponentColor = opponentColor;
    currentMovesHandler.calcDirection = playerColor === "white" ? 1 : -1;
    currentMovesHandler.pawnMoves(boardData);
    // currentMovesHandler.rookMoves(boardData);
    // currentMovesHandler.knightMoves(boardData);
    // currentMovesHandler.bishopMoves(boardData);
    // currentMovesHandler.queenMoves(boardData);
    // currentMovesHandler.kingMoves(boardData);
    console.log(currentMovesHandler.currentMoves);
    return currentMovesHandler.currentMoves;
  },
};

module.exports = currentMovesHandler;