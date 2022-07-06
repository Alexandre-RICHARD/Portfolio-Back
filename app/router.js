const { Router } = require("express");

const mainController = require("./controllers/mainController");
const chessController = require("./controllers/chessController");

const router = Router();

router.get("/board/data", chessController.getBoardData);
router.get("/test", mainController.test);

router.use((req, res) => {
  res.status(404).json("Erreur 404. Pas p'ssible hein");
});

module.exports = router;