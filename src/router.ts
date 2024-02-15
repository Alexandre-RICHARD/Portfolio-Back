import {Request, Response} from "express";
import {Router as createRouter} from "express";

// import accountController from "./controllers/accountController";
// import chessController from "./controllers/chessController";
// import genshinController from "./controllers/genshinController";
// import globalController from "./controllers/globalController";
import portfolioController from "./controllers/portfolioController";
// import socketIoController from "./controllers/socketIoController";
const router = createRouter();

// To count each use of server before it stops
// let counter = 0;
// router.use((req, _res, next) => {
//     counter += 1;
//     req.counter = counter;
//     next();
// });

// Here will be all our routes
// router.get("/", globalController.test);
// router.post("/visit/counter/add", globalController.handleVisit);

router.post("/contact", portfolioController.contactSendMail);

// router.post("/registration", accountController.registration);
// router.post("/connection", accountController.connection);
// router.post("/account/change/mail", accountController.changeMail);
// router.post("/account/change/password", accountController.changePassword);
// router.delete("/account/delete", accountController.deleteAccount);

// router.get("/genshin/generate-uuid", genshinController.generateUuid);
// router.post("/genshin/login", genshinController.loginWithUuid);
// router.post("/genshin/getData", genshinController.getOneData);
// router.post("/genshin/saveData", genshinController.saveOneData);
// router.delete("/genshin/delete", genshinController.deleteOneData);
// router.delete("/genshin/delete/user", genshinController.deleteOneUser);
// router.post("/genshin/visit/counter/add", globalController.handleVisit);

// router.get("/chess/game/data", chessController.getChessGameData);
// router.get("/chess/board/reset", chessController.resetBoardData);
// router.post("/chess/move/verif", chessController.moveVerification);

// router.post("/contact/sendmail", portfolioController.contactSendMail);

// router.post("/register", socketIoController.oneMorePlayer);
// router.post("/disconnect", socketIoController.oneLessPlayer);
// router.post("/chatmessage", socketIoController.messageOnChat);

// Handling all other route unassigned to a controller method
router.use((_req: Request, res: Response): void => {
    res.status(404).json(
        `Cette route (${_req.originalUrl}) n'est pas gérée par le serveur.`
    );
});

export default router;
