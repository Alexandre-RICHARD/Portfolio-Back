import {Request, Response} from "express";

import {errorSaver} from "../utilities/errorSaver";
import {worktimeModel} from "./../models/main";

const mainController = {
    "getData": async (_req: Request, res: Response) => {
        try {
            const response = await worktimeModel.getAllWorkTimeData();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(["server-error"]);
            const errorF = error as Error;
            await errorSaver(
                "get-user-data-failed",
                JSON.stringify(errorF.stack)
            );
        }
    },
    "getActivity": (_req: Request, res: Response) => {
        const weirdActivity = [
            "Bronzer avec des pingouins",
            "Tenir la main à un manchot",
            "Aller à la plage au Sahara",
            "Danser avec aucune star",
            "Dormir à l'hôtel avec Jack",
            "Comprendre Tenet",
            "Essayer de voler le nez de Tom Jedusor",
            "Vouloir rendre tout le monde meilleur"
        ];
        const getRandomWeirdActivity = () => {
            const index = Math.floor(Math.random() * weirdActivity.length);
            return weirdActivity[index];
        };

        res.status(200).json({"activity": getRandomWeirdActivity()});
    },
};

export default mainController;
