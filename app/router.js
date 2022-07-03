const { Router } = require("express");

const mainController = require("./controllers/mainController");

const router = Router();

router.get("/test", mainController.test);

router.use((req, res) => {
  res.status(404).json("Erreur 404. Pas p'ssible hein");
});

module.exports = router;