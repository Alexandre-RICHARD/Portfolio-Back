const saveMove = {
  saveOurCurrentMove: (currentMove, boardData) => {
    boardData.forEach(element => {
      boardData[element.id - 1] = {
        ...element,
        control_by_white: 0,
        control_by_black: 0,
        heavy_control: false,
        pawn_just_move_two: element.piece_name === "pawn" ? false : null,
      };
    });
    let originCase = boardData.find(element => element.case_name === currentMove.originCase);
    let destinationCase = boardData.find(element => element.case_name === currentMove.destinationCase);
    boardData[destinationCase.id - 1] = {
      ...destinationCase,
      is_piece: true,
      piece_name: originCase.piece_name,
      piece_id: originCase.piece_id,
      piece_color: originCase.piece_color,
      pawn_just_move_two: originCase.piece_name === "pawn" && Math.abs(originCase.case_name.charAt(1) - destinationCase.case_name.charAt(1)) === 2 ? true : false,
      already_move: originCase.piece_name === "pawn" || originCase.piece_name === "king" || originCase.piece_name === "rook" ? true : null,
    };
    boardData[originCase.id - 1] = {
      ...originCase,
      is_piece: false,
      piece_name: null,
      piece_id: null,
      piece_color: null,
      pawn_just_move_two: null,
      already_move: null
    };

    if (currentMove.killingMove === true & currentMove.killCase !== currentMove.destinationCase) {
      let killCase = boardData.find(element => element.case_name === currentMove.killCase);
      boardData.cimetary.push({
        piece_name: killCase.piece_name,
        piece_id: killCase.piece_id,
        piece_color: killCase.piece_color
      });

      boardData[killCase.id - 1] = {
        ...killCase,
        is_piece: false,
        piece_name: null,
        piece_id: null,
        piece_color: null,
        pawn_just_move_two: null,
        already_move: null
      };
    }

    return boardData;
  }
};

module.exports = saveMove;