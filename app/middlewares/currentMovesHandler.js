const currentMovesHandler = {

  currentMoves: {
    totalNumberPossibleMoves: 0,
    moves: {},
  },

  allPiecesMoves: (gameData) => {
    const pieceTypeArray = ["pawn", "rook", "knight", "bishop", "queen", "king"];
    for (let pieceType = 0; pieceType < 6; pieceType++) {
      const currentPieces = gameData.boardData.filter(element => element.piece_name === pieceTypeArray[pieceType] && element.piece_color === gameData.currentPlayerColor);
      if (currentPieces) {
        currentPieces.forEach(piece => {
          let moveCounter = 1;
          currentMovesHandler.currentMoves.moves[piece.piece_id] = {};
          const searchDirection = {
            pawn: {
              distance: piece.already_move === false ? 2 : 1,
              direction: 1,
              x: [0, 0],
              y: [gameData.currentPlayerColor === "white" ? 1 : -1, gameData.currentPlayerColor === "white" ? 2 : -2],
            },
            rook: {
              distance: 10,
              direction: 4,
              x: [-1, 1, 0, 0],
              y: [0, 0, -1, 1],
            },
            knight: {
              distance: 1,
              direction: 8,
              x: [-2, -1, 1, 2, 2, 1, -1, -2],
              y: [1, 2, 2, 1, -1, -2, -2, -1],
            },
            bishop: {
              distance: 10,
              direction: 4,
              x: [-1, -1, 1, 1],
              y: [-1, 1, 1, -1],
            },
            queen: {
              distance: 10,
              direction: 8,
              x: [-1, -1, -1, 0, 1, 1, 1, 0],
              y: [-1, 0, 1, 1, 1, 0, -1, -1],
            },
            king: {
              distance: 1,
              direction: 8,
              x: [-1, -1, -1, 0, 1, 1, 1, 0],
              y: [-1, 0, 1, 1, 1, 0, -1, -1],
            },
          };
          for (let i = 0; i < searchDirection[pieceTypeArray[pieceType]].direction; i++) {
            let keepSearch = 1;
            let distance = 1;
            while (keepSearch === 1) {
              const destinationCase = gameData.boardData.find(element => element.x === piece.x + searchDirection[pieceTypeArray[pieceType]].x[i] * distance && element.y === piece.y + searchDirection[pieceTypeArray[pieceType]].y[i] * distance);
              if (destinationCase && ((pieceTypeArray[pieceType] !== "pawn" && (destinationCase.piece_name === null || destinationCase.piece_color === gameData.opponentColor)) || (destinationCase.piece_name === null && pieceTypeArray[pieceType] === "pawn"))) {
                currentMovesHandler.currentMoves.moves[piece.piece_id][moveCounter] = {
                  originCase: piece.case_name,
                  destinationCase: destinationCase.case_name,
                  killingMove: destinationCase.piece_color === gameData.opponentColor ? true : false,
                  killCase: destinationCase.piece_color === gameData.opponentColor ? destinationCase.case_name : null,
                };
                moveCounter++;
                keepSearch = destinationCase.piece_color === gameData.opponentColor || searchDirection[pieceTypeArray[pieceType]].distance === distance ? 0 : 1;
                distance++;
                currentMovesHandler.currentMoves.totalNumberPossibleMoves++;
              } else {
                keepSearch = 0;
              }
            }
          }

          if (pieceTypeArray[pieceType] === "pawn") {
            for (let i = -1; i < 2; i += 2) {
              const destinationCase = gameData.boardData.find(element => element.x === piece.x + i && element.y === piece.y + searchDirection.pawn.y[0]);
              if (destinationCase && destinationCase.piece_color === gameData.opponentColor) {
                currentMovesHandler.currentMoves.moves[piece.piece_id][moveCounter] = {
                  originCase: piece.case_name,
                  destinationCase: destinationCase.case_name,
                  killingMove: true,
                  killCase: destinationCase.case_name,
                };
                moveCounter++;
                currentMovesHandler.currentMoves.totalNumberPossibleMoves++;
              }
            }
            for (let i = -1; i < 2; i += 2) {
              const destinationCase = gameData.boardData.find(element => element.x === piece.x + i && element.y === piece.y + searchDirection.pawn.y[0]);
              const killCase = gameData.boardData.find(element => element.x === piece.x + i && element.y === piece.y);
              if (destinationCase && killCase && destinationCase.piece_name === null && killCase.piece_color === gameData.opponentColor && killCase.pawn_just_move_two === true) {
                currentMovesHandler.currentMoves.moves[piece.piece_id][moveCounter] = {
                  originCase: piece.case_name,
                  destinationCase: destinationCase.case_name,
                  killingMove: true,
                  killCase: killCase.case_name,
                };
                moveCounter++;
                currentMovesHandler.currentMoves.totalNumberPossibleMoves++;
              }
            }
          }

          if (Object.keys(currentMovesHandler.currentMoves.moves[piece.piece_id]).length === 0) {
            delete currentMovesHandler.currentMoves.moves[piece.piece_id];
          }
        });
      }
    }
  },

  getCurrentMovesData: (gameData) => {
    currentMovesHandler.currentMoves.totalNumberPossibleMoves = 0;
    currentMovesHandler.currentMoves.moves = {};
    currentMovesHandler.allPiecesMoves(gameData);
    return currentMovesHandler.currentMoves;
  },
};

module.exports = currentMovesHandler;