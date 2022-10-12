const { Router } = require("express");
const router = Router();
const globalController = require("./controllers/globalController");
const portfolioController = require("./controllers/portfolioController");
const accountController = require("./controllers/accountController");
const chessController = require("./controllers/chessController");

router.get("/test", globalController.test);

router.post("/contact", portfolioController.contactSendMail);

router.post("/registration", accountController.registration);
router.post("/connection", accountController.connection);

router.get("/chess/game/data", chessController.getChessGameData);
router.get("/chess/board/reset", chessController.resetBoardData);
router.post("/chess/move/verif", chessController.moveVerification);

router.use((req, res) => {
    res.status(404).json("Erreur 404. Pas p'ssible hein");
});

module.exports = router;
