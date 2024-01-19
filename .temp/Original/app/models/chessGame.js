const db = require("../database.js");

// Notre fichier qui est appelé par le chess controller chargé de faire les requêtes liées
const chessGame = {
    async getAllBoardData() {
        const { rows } = await db.query("SELECT * FROM public.chess;");
        return rows;
    }
};

module.exports = chessGame;
