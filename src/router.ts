import {Request, Response} from "express";
import {Router as createRouter} from "express";

import {portfolioController} from "./controllers/portfolioController";
import {visitsController} from "./controllers/visitsController";

const router = createRouter();

router.post("/visit/counter/add", visitsController.handleVisit);
router.post("/contact", portfolioController.contactSendMail);

// Handling all other route unassigned to a controller method
router.use((_req: Request, res: Response): void => {
    res.status(404).json(
        `Cette route (${_req.originalUrl}) n'est pas gérée par le serveur.`
    );
});

export default router;
