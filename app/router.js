const { Router } = require("express");
const router = Router();

// On importe nos différents controllers
const accountController = require("./controllers/accountController");
const chessController = require("./controllers/chessController");
const genshinController = require("./controllers/genshinController");
const globalController = require("./controllers/globalController");
const portfolioController = require("./controllers/portfolioController");
const socketIoController = require("./controllers/socketIoController");

let counter = 0;

router.use((req, res, next) => {
    counter += 1;
    req.counter = counter;
    next();
});

// On associe chaque duo de requêtes/méthodes à un controller et à une fonction
router.get("/", globalController.test);
router.post("/visit/counter/add", globalController.handleVisit);

router.post("/contact", portfolioController.contactSendMail);

router.post("/registration", accountController.registration);
router.post("/connection", accountController.connection);
router.post("/account/change/mail", accountController.changeMail);
router.post("/account/change/password", accountController.changePassword);
router.delete("/account/delete", accountController.deleteAccount);

router.get("/genshin/generate-uuid", genshinController.generateUuid);
router.post("/genshin/login", genshinController.loginWithUuid);
router.post("/genshin/getData", genshinController.getOneData);
router.post("/genshin/saveData", genshinController.saveOneData);
router.delete("/genshin/delete", genshinController.deleteOneData);
router.delete("/genshin/delete/user", genshinController.deleteOneUser);
router.post("/genshin/visit/counter/add", globalController.handleVisit);

router.get("/chess/game/data", chessController.getChessGameData);
router.get("/chess/board/reset", chessController.resetBoardData);
router.post("/chess/move/verif", chessController.moveVerification);

router.post("/contact/sendmail", portfolioController.contactSendMail);

router.post("/register", socketIoController.oneMorePlayer);
router.post("/disconnect", socketIoController.oneLessPlayer);
router.post("/chatmessage", socketIoController.messageOnChat);

// Si aucune la requête n'est pas géré par le serveur, le router renvoit une 404 avec un message
router.use((req, res) => {
    res.status(404).json("404 - Pas de route gérée par le serveur sur cette adresse");
});

module.exports = router;
