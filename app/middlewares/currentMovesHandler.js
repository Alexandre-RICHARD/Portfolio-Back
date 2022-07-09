const currentMovesHandler = {

  currentMoves: {
    totalNumberPossibleMoves: 0,
    moves: {},
  },

  pawnMoves: (boardData) => {
    const currentPieces = boardData.filter(element => element.piece_name === "pawn" && element.piece_color === currentMovesHandler.playerColor);

    currentPieces.forEach(piece => {
      let moveCounter = 1;
      currentMovesHandler.currentMoves.moves[piece.piece_id] = {};

      for (let i = 1; i < 3; i++) {
        const destinationCase = boardData.find(element => element.x === piece.x && element.y === piece.y + i * currentMovesHandler.calcDirection);
        if (destinationCase) {
          if (destinationCase.piece_name === null && (i === 1 || (i === 2 & piece.already_move === false))) {
            currentMovesHandler.currentMoves.moves[piece.piece_id][moveCounter] = {
              originCase: piece.case_name,
              destinationCase: destinationCase.case_name,
              killingMove: false,
              killCase: null,
            };
            moveCounter++;
            currentMovesHandler.currentMoves.totalNumberPossibleMoves++;
          }
        }
      }

      for (let i = -1; i < 2; i += 2) {
        const destinationCase = boardData.find(element => element.x === piece.x + i && element.y === piece.y + 1 * currentMovesHandler.calcDirection);
        if (destinationCase) {
          if (destinationCase.piece_color === currentMovesHandler.opponentColor) {
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
      }

      for (let i = -1; i < 2; i += 2) {
        const destinationCase = boardData.find(element => element.x === piece.x + i && element.y === piece.y + 1 * currentMovesHandler.calcDirection);
        const killCase = boardData.find(element => element.x === piece.x + i && element.y === piece.y);
        if (destinationCase && killCase) {
          if (destinationCase.piece_name === null && killCase.piece_color === currentMovesHandler.opponentColor && killCase.pawn_just_move_two === true) {
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
        currentMovesHandler.currentMoves.moves[piece.piece_id] = null;
      }
    });
  },

  allPiecesMoves: (boardData) => {
    const pieceTypeArray = ["rook", "knight", "bishop", "queen", "king"];
    for (let pieceType = 0; pieceType < 5; pieceType++) {
      const currentPieces = boardData.filter(element => element.piece_name === pieceTypeArray[pieceType] && element.piece_color === currentMovesHandler.playerColor);
      if (currentPieces) {
        currentPieces.forEach(piece => {
          let moveCounter = 1;
          currentMovesHandler.currentMoves.moves[piece.piece_id] = {};
          const searchDirection = {
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
              const destinationCase = boardData.find(element => element.x === piece.x + searchDirection[pieceTypeArray[pieceType]].x[i] * distance && element.y === piece.y + searchDirection[pieceTypeArray[pieceType]].y[i] * distance);
              if (destinationCase && (destinationCase.piece_name === null || destinationCase.piece_color === currentMovesHandler.opponentColor)) {
                //* PARFAIT JUSQUE LÀ *//
                currentMovesHandler.currentMoves.moves[piece.piece_id][moveCounter] = {
                  originCase: piece.case_name,
                  destinationCase: destinationCase.case_name,
                  killingMove: destinationCase.piece_color === currentMovesHandler.opponentColor ? true : false,
                  killCase: destinationCase.piece_color === currentMovesHandler.opponentColor ? destinationCase.case_name : null,
                };
                moveCounter++;
                keepSearch = destinationCase.piece_color === currentMovesHandler.opponentColor || searchDirection[pieceTypeArray[pieceType]].distance === distance ? 0 : 1;
                distance++;
                currentMovesHandler.currentMoves.totalNumberPossibleMoves++;
              }
              else {
                keepSearch = 0;
              }
            }
          }
    
          if (Object.keys(currentMovesHandler.currentMoves.moves[piece.piece_id]).length === 0) {
            currentMovesHandler.currentMoves.moves[piece.piece_id] = null;
          }
        });
      }
    }
  },

  getCurrentMovesData: (boardData, gameData) => {
    currentMovesHandler.currentMoves.totalNumberPossibleMoves = 0;
    currentMovesHandler.currentMoves.moves = {};
    currentMovesHandler.playerColor = gameData.currentPlayerColor;
    currentMovesHandler.opponentColor = gameData.opponentColor;
    currentMovesHandler.calcDirection = gameData.currentPlayerColor === "white" ? 1 : -1;
    currentMovesHandler.pawnMoves(boardData);
    currentMovesHandler.allPiecesMoves(boardData);
    return currentMovesHandler.currentMoves;
  },
};

module.exports = currentMovesHandler;