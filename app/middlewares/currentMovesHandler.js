const currentMovesHandler = {

  movesHandler: (gameData, currentData, playerOrOpponent, color1, color2) => {
    currentMovesHandler.allPiecesMoves(gameData, currentData, playerOrOpponent, color1, color2);
    if (currentData.isCheck === 1) {
      currentMovesHandler.canBlockTheMenace(gameData, currentData, color1);
      currentMovesHandler.canKingMove(gameData, currentData, color1, color2);
    }
    if (currentData.isCheck >= 2) {
      currentData.moves = {};
      currentData.totalNumberPossibleMoves = 0;
      currentMovesHandler.canKingMove(gameData, currentData, color1, color2);
    }
    return currentData;
  },

  allPiecesMoves: (gameData, currentData, playerOrOpponent, color1, color2) => {
    const pieceTypeArray = ["pawn", "rook", "knight", "bishop", "queen", "king"];
    for (let pieceType = 0; pieceType < 6; pieceType++) {
      const currentPieces = gameData.boardData.filter(element => element.piece_name === pieceTypeArray[pieceType] && element.piece_color === color1);
      if (currentPieces) {
        currentPieces.forEach(piece => {
          currentData.moves[piece.piece_id] = {};
          const searchDirection = {
            pawn: {
              distance: piece.already_move === false ? 2 : 1,
              direction: 1,
              x: [0, 0],
              y: [color1 === "white" ? 1 : -1, color1 === "white" ? 2 : -2],
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
              if (
                destinationCase && (
                  (pieceTypeArray[pieceType] !== "pawn" && pieceTypeArray[pieceType] !== "king" && (destinationCase.piece_name === null || destinationCase.piece_color === color2)) ||
                  (destinationCase.piece_name === null && pieceTypeArray[pieceType] === "pawn") ||
                  (pieceTypeArray[pieceType] === "king" && destinationCase[`control_by_${color2}`] === 0 && (destinationCase.piece_name === null || destinationCase.piece_color === color2))
                )
              ) {
                currentData.moves[piece.piece_id][destinationCase.case_name] = {
                  originCase: piece.case_name,
                  destinationCase: destinationCase.case_name,
                  killingMove: destinationCase.piece_color === color2 ? true : false,
                  killCase: destinationCase.piece_color === color2 ? destinationCase.case_name : null,
                };
                gameData.boardData[destinationCase.id - 1][`control_by_${color1}`]++;
                keepSearch = destinationCase.piece_color === color2 || searchDirection[pieceTypeArray[pieceType]].distance === distance ? 0 : 1;
                distance++;
                currentData.totalNumberPossibleMoves++;
              } else {
                if (destinationCase && (destinationCase.piece_color === color1)) {
                  gameData.boardData[destinationCase.id - 1][`control_by_${color1}`]++;
                }
                keepSearch = 0;
              }
            }
          }

          if (["rook", "bishop", "queen"].indexOf(pieceTypeArray[pieceType]) >= 0 && playerOrOpponent === "opponent") {
            for (let i = 0; i < searchDirection[pieceTypeArray[pieceType]].direction; i++) {
              currentData.pin[piece.piece_id] = {
                opponentCounter: 0,
              };
              let keepSearch = 1;
              let distance = 1;
              while (keepSearch === 1) {
                const destinationCase = gameData.boardData.find(element => element.x === piece.x + searchDirection[pieceTypeArray[pieceType]].x[i] * distance && element.y === piece.y + searchDirection[pieceTypeArray[pieceType]].y[i] * distance);
                if (destinationCase && (destinationCase.piece_name === null || destinationCase.piece_color === color2)) {
                  currentData.pin[piece.piece_id] = {
                    ...currentData.pin[piece.piece_id],
                    opponentCounter: destinationCase.piece_color === color2 ? currentData.pin[piece.piece_id].opponentCounter += 1 : currentData.pin[piece.piece_id].opponentCounter,
                    [destinationCase.case_name]: {
                      opponent: (destinationCase.piece_color === color2 && destinationCase.piece_name !== "king") ? true : false,
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
                            y: [searchDirection[pieceTypeArray[pieceType]].y[i], searchDirection[pieceTypeArray[pieceType]].y[i] * -1],
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
              if (destinationCase && destinationCase.piece_color === color2) {
                currentData.moves[piece.piece_id][destinationCase.case_name] = {
                  originCase: piece.case_name,
                  destinationCase: destinationCase.case_name,
                  killingMove: true,
                  killCase: destinationCase.case_name,
                };
                gameData.boardData[destinationCase.id - 1][`control_by_${color1}`]++;
                currentData.totalNumberPossibleMoves++;
              } else {
                if (destinationCase && (destinationCase.piece_color === color1 || destinationCase.piece_color === null)) {
                  gameData.boardData[destinationCase.id - 1][`control_by_${color1}`]++;
                }
              }
            }
            for (let i = -1; i < 2; i += 2) {
              const destinationCase = gameData.boardData.find(element => element.x === piece.x + i && element.y === piece.y + searchDirection.pawn.y[0]);
              const killCase = gameData.boardData.find(element => element.x === piece.x + i && element.y === piece.y);
              if (destinationCase && killCase && destinationCase.piece_name === null && killCase.piece_color === color2 && killCase.pawn_just_move_two === true) {
                currentData.moves[piece.piece_id][destinationCase.case_name] = {
                  originCase: piece.case_name,
                  destinationCase: destinationCase.case_name,
                  killingMove: true,
                  killCase: killCase.case_name,
                };
                gameData.boardData[destinationCase.id - 1][`control_by_${color1}`]++;
                currentData.totalNumberPossibleMoves++;
              }
            }
          }

          if (piece.absolute_pin === true) {
            const directionX = gameData.opponentColorMovesData.pin[Object.keys(gameData.opponentColorMovesData.pin)[0]].x;
            const directionY = gameData.opponentColorMovesData.pin[Object.keys(gameData.opponentColorMovesData.pin)[0]].y;
            const originCaseX = piece.x;
            const originCaseY = piece.y;
            const possibleMoves = Object.values(currentData.moves[piece.piece_id]).map(element => element.destinationCase);
            const safeLine = [];

            for (let i = 0; i < 2; i++) {
              let distance = 1;
              let keepSearch = 1;
              while (keepSearch === 1) {
                const temporaryCase = gameData.boardData.find(element => element.x === originCaseX + directionX[i] * distance && element.y === originCaseY + directionY[i] * distance);
                if (temporaryCase && (temporaryCase.piece_name === null || temporaryCase.piece_color === color2)) {
                  safeLine.push(temporaryCase.case_name);
                  distance++;
                } else {
                  keepSearch = 0;
                }
              }
            }
            possibleMoves.forEach(element => {
              if (!safeLine.find(subElement => subElement === element)) {
                delete currentData.moves[piece.piece_id][element];
                currentData.totalNumberPossibleMoves--;
              }
            });
          }

          if (Object.keys(currentData.moves[piece.piece_id]).length === 0) {
            delete currentData.moves[piece.piece_id];
          }
        });
      }
    }
  },

  canBlockTheMenace: (gameData, currentData, color1) => {
    const kingCase = gameData.boardData.find(ele => ele.piece_name === "king" && ele.piece_color === color1).case_name;
    let menace = [];
    const allDestinationCases = [];
    const threateningCases = [];

    Object.keys(gameData.opponentColorMovesData.moves).forEach(element => {
      Object.keys(gameData.opponentColorMovesData.moves[element]).forEach(subElement => {
        if (subElement === kingCase) {
          const menaceCase = gameData.boardData.find(x => x.piece_id === element);
          menace = [element, menaceCase.piece_name, menaceCase.case_name];
        }
      });
    });

    Object.keys(currentData.moves).map(element => element).forEach(element => {
      Object.keys(currentData.moves[element]).forEach(subElement => {
        if (allDestinationCases.indexOf(subElement) === -1) {
          allDestinationCases.push(subElement);
        }
      });
    });
    allDestinationCases.sort();

    if (["pawn", "knight"].indexOf(menace[1]) >= 0) {
      threateningCases.push(gameData.boardData.find(element => element.piece_id === menace[0]).case_name);
    }
    if (["rook", "bishop", "queen"].indexOf(menace[1]) >= 0) {
      const lettersTranslation = ["", "a", "b", "c", "d", "e", "f", "g", "h"];
      const kingX = lettersTranslation.indexOf(kingCase.charAt(0));
      const kingY = parseInt(kingCase.charAt(1));
      const threatX = lettersTranslation.indexOf(menace[2].charAt(0));
      const threatY = parseInt(menace[2].charAt(1));
      const distance = Math.max(Math.abs(threatX - kingX), Math.abs(threatY - kingY));
      for (let i = 0; i < distance; i++) {
        threateningCases.push(`${lettersTranslation[threatX + (kingX - threatX) / distance * i]}${threatY + (kingY - threatY) / distance * i}`);
      }
    }

    Object.keys(currentData.moves).map(element => element).forEach(element => {
      Object.keys(currentData.moves[element]).forEach(subElement => {
        if (threateningCases.indexOf(subElement) < 0) {
          delete currentData.moves[element][subElement];
          currentData.totalNumberPossibleMoves--;
        }
      });
      if (Object.keys(currentData.moves[element]).length === 0) {
        delete currentData.moves[element];
      }
    });
  },

  canKingMove: (gameData, currentData, color1, color2) => {
    const king = gameData.boardData.find(element => element.piece_name === "king" && element.piece_color === color1);
    currentData.moves[king.piece_id] = {};
    const kingDirection = {
      distance: 1,
      direction: 8,
      x: [-1, -1, -1, 0, 1, 1, 1, 0],
      y: [-1, 0, 1, 1, 1, 0, -1, -1],
    };
    for (let i = 0; i < kingDirection.direction; i++) {
      const destinationCase = gameData.boardData.find(element => element.x === king.x + kingDirection.x[i] && element.y === king.y + kingDirection.y[i]);
      if (destinationCase && (destinationCase[`control_by_${color2}`] === 0 && (destinationCase.piece_name === null || destinationCase.piece_color === color2))) {
        currentData.moves[king.piece_id][destinationCase.case_name] = {
          originCase: king.case_name,
          destinationCase: destinationCase.case_name,
          killingMove: destinationCase.piece_color === color2 ? true : false,
          killCase: destinationCase.piece_color === color2 ? destinationCase.case_name : null,
        };
        gameData.boardData[destinationCase.id - 1][`control_by_${color1}`]++;
        currentData.totalNumberPossibleMoves++;
      }
    }
    if (Object.keys(currentData.moves[king.piece_id]).length === 0) {
      delete currentData.moves[king.piece_id];
    }
  },

  getCurrentMovesData: (gameData, playerOrOpponent) => {
    const color1 = playerOrOpponent === "player" ? gameData.currentPlayerColor : gameData.opponentColor;
    const color2 = playerOrOpponent === "player" ? gameData.opponentColor : gameData.currentPlayerColor;
    const currentData = {
      checkMate: false,
      isCheck: gameData.boardData.find(a => a.piece_name === "king" && a.piece_color === color1)[`control_by_${color2}`],
      totalNumberPossibleMoves: 0,
      moves: {},
      pin: {},
    };
    return currentMovesHandler.movesHandler(gameData, currentData, playerOrOpponent, color1, color2);
  },
};

module.exports = currentMovesHandler;