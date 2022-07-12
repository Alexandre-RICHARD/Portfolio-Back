const currentMovesHandler = {

  allPiecesMoves: (gameData, currentData) => {
    const pieceTypeArray = ["pawn", "rook", "knight", "bishop", "queen", "king"];
    for (let pieceType = 0; pieceType < 6; pieceType++) {
      const currentPieces = gameData.boardData.filter(element => element.piece_name === pieceTypeArray[pieceType] && element.piece_color === currentData.playerColor);
      if (currentPieces) {
        currentPieces.forEach(piece => {
          let moveCounter = 1;
          currentData.moves[piece.piece_id] = {};
          const searchDirection = {
            pawn: {
              distance: piece.already_move === false ? 2 : 1,
              direction: 1,
              x: [0, 0],
              y: [currentData.playerColor === "white" ? 1 : -1, currentData.playerColor === "white" ? 2 : -2],
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
              if (destinationCase && ((pieceTypeArray[pieceType] !== "pawn" && (destinationCase.piece_name === null || destinationCase.piece_color === currentData.opponentColor)) || (destinationCase.piece_name === null && pieceTypeArray[pieceType] === "pawn"))) {
                currentData.moves[piece.piece_id][moveCounter] = {
                  originCase: piece.case_name,
                  destinationCase: destinationCase.case_name,
                  killingMove: destinationCase.piece_color === currentData.opponentColor ? true : false,
                  killCase: destinationCase.piece_color === currentData.opponentColor ? destinationCase.case_name : null,
                };
                gameData.boardData[destinationCase.id - 1][`control_by_${currentData.playerColor}`]++;
                moveCounter++;
                keepSearch = destinationCase.piece_color === currentData.opponentColor || searchDirection[pieceTypeArray[pieceType]].distance === distance ? 0 : 1;
                distance++;
                currentData.totalNumberPossibleMoves++;
              } else {
                keepSearch = 0;
              }
            }
          }

          if (["rook", "bishop", "queen"].indexOf(pieceTypeArray[pieceType]) >= 0 && currentData.playerOrOpponent === "opponent") {
            for (let i = 0; i < searchDirection[pieceTypeArray[pieceType]].direction; i++) {
              currentData.pin[piece.piece_id] = {
                opponentCounter: 0,
              };
              let keepSearch = 1;
              let distance = 1;
              while (keepSearch === 1) {
                const destinationCase = gameData.boardData.find(element => element.x === piece.x + searchDirection[pieceTypeArray[pieceType]].x[i] * distance && element.y === piece.y + searchDirection[pieceTypeArray[pieceType]].y[i] * distance);
                if (destinationCase && (destinationCase.piece_name === null || destinationCase.piece_color === currentData.opponentColor)) {
                  currentData.pin[piece.piece_id] = {
                    ...currentData.pin[piece.piece_id],
                    opponentCounter: destinationCase.piece_color === currentData.opponentColor ? currentData.pin[piece.piece_id].opponentCounter += 1 : currentData.pin[piece.piece_id].opponentCounter,
                    [destinationCase.case_name]: {
                      opponent: (destinationCase.piece_color === currentData.opponentColor && destinationCase.piece_name !== "king") ? true : false,
                    },
                  };
                  distance++;
                  if (currentData.pin[piece.piece_id].opponentCounter === 2) {
                    keepSearch = 0;
                    if (destinationCase.piece_name === "king") {
                      for (let [key, value] of Object.entries(currentData.pin[piece.piece_id])) {
                        if (value.opponent === true) {
                          const pinnedCase = gameData.boardData.find(element => element.case_name === key);
                          gameData.boardData[pinnedCase.id - 1].absolute_pin = true;
                          currentData.pin[piece.piece_id] = {
                            ...currentData.pin[piece.piece_id],
                            pinnedCase: key,
                            x: [searchDirection[pieceTypeArray[pieceType]].x[i], searchDirection[pieceTypeArray[pieceType]].x[i] * -1],
                            y: [searchDirection[pieceTypeArray[pieceType]].y[i], searchDirection[pieceTypeArray[pieceType]].y[i] * - 1],
                          };
                        }
                      }
                      i = searchDirection[pieceTypeArray[pieceType]].direction;
                    }
                  }
                } else {
                  keepSearch = 0;
                }
              }
            }
            const xd = (Object.getOwnPropertyNames(currentData.pin[piece.piece_id]));
            if (!xd.find(element => element === "pinnedCase")) {
              delete currentData.pin[piece.piece_id];
            }
          }

          if (pieceTypeArray[pieceType] === "pawn") {
            for (let i = -1; i < 2; i += 2) {
              const destinationCase = gameData.boardData.find(element => element.x === piece.x + i && element.y === piece.y + searchDirection.pawn.y[0]);
              if (destinationCase && destinationCase.piece_color === currentData.opponentColor) {
                currentData.moves[piece.piece_id][moveCounter] = {
                  originCase: piece.case_name,
                  destinationCase: destinationCase.case_name,
                  killingMove: true,
                  killCase: destinationCase.case_name,
                };
                gameData.boardData[destinationCase.id - 1][`control_by_${currentData.playerColor}`]++;
                moveCounter++;
                currentData.totalNumberPossibleMoves++;
              }
            }
            for (let i = -1; i < 2; i += 2) {
              const destinationCase = gameData.boardData.find(element => element.x === piece.x + i && element.y === piece.y + searchDirection.pawn.y[0]);
              const killCase = gameData.boardData.find(element => element.x === piece.x + i && element.y === piece.y);
              if (destinationCase && killCase && destinationCase.piece_name === null && killCase.piece_color === currentData.opponentColor && killCase.pawn_just_move_two === true) {
                currentData.moves[piece.piece_id][moveCounter] = {
                  originCase: piece.case_name,
                  destinationCase: destinationCase.case_name,
                  killingMove: true,
                  killCase: killCase.case_name,
                };
                gameData.boardData[destinationCase.id - 1][`control_by_${currentData.playerColor}`]++;
                moveCounter++;
                currentData.totalNumberPossibleMoves++;
              }
            }
          }

          if (Object.keys(currentData.moves[piece.piece_id]).length === 0) {
            delete currentData.moves[piece.piece_id];
          }
        });
      }
    }
    console.log("\nNEW LANE");
    return currentData;
  },

  getCurrentMovesData: (gameData, playerOrOpponent) => {
    currentMovesHandler.test = {};
    const currentData = {
      totalNumberPossibleMoves: 0,
      moves: {},
      pin: {},
      playerColor: playerOrOpponent === "player" ? gameData.currentPlayerColor : gameData.opponentColor,
      opponentColor: playerOrOpponent === "player" ? gameData.opponentColor : gameData.currentPlayerColor,
      playerOrOpponent,
    };
    return currentMovesHandler.allPiecesMoves(gameData, currentData);
  },
};

module.exports = currentMovesHandler;