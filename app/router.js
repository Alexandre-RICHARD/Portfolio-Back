const { Router } = require("express");
const router = Router();

// On importe nos différents controllers
const globalController = require("./controllers/globalController");
const portfolioController = require("./controllers/portfolioController");
const germanTestController = require("./controllers/germanTestController");
const accountController = require("./controllers/accountController");
const chessController = require("./controllers/chessController");

let counter = 0;

router.use((req, res, next) => {
    counter += 1;
    req.counter = counter;
    next();
});

// On associe chaque duo de requêtes/méthodes à un controller et à une fonction
router.get("/", globalController.test);
router.get("/visit/counter/add", globalController.registerNewVisit);

router.post("/contact", portfolioController.contactSendMail);

router.post("/registration", accountController.registration);
router.post("/connection", accountController.connection);
router.post("/account/change/mail", accountController.changeMail);
router.post("/account/change/password", accountController.changePassword);
router.delete("/account/delete", accountController.deleteAccount);

router.post("/germanTest/connect", germanTestController.accessPassword);

router.get("/chess/game/data", chessController.getChessGameData);
router.get("/chess/board/reset", chessController.resetBoardData);
router.post("/chess/move/verif", chessController.moveVerification);

router.post("/contact/sendmail", portfolioController.contactSendMail);

// Si aucune la requête n'est pas géré par le serveur, le router renvoit une 404 avec un message
router.use((req, res) => {
    res.status(404).json("404 - Pas de route gérée par le serveur sur cette adresse");
});

module.exports = router;
