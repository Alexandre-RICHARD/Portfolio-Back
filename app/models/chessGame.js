const db = require("../database.js");

const chessGame = {
    async getAllBoardData() {
        const { rows } = await db.query("SELECT * FROM public.chess;");
        return rows;
    }
};

module.exports = chessGame;
