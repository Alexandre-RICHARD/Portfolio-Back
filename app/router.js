const { Router } = require("express");
const router = Router();
const chessController = require("./controllers/chessController");

router.get("/chess/game/data", chessController.getChessGameData);
router.get("/chess/board/reset", chessController.resetBoardData);
router.post("/chess/move/verif", chessController.moveVerification);

router.use((req, res) => {
    res.status(404).json("Erreur 404. Pas p'ssible hein");
});

module.exports = router;
