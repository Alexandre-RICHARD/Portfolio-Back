import {Request, Response} from "express";

import {errorSaver} from "../utilities/errorSaver";
import {visitCounter} from "../models/visitCounter";
import {dateGetter} from "../utilities/dateGetter";

export const visitsController = {
    async handleVisit (req: Request, res: Response) {
        const {target} = req.body;
        const today = dateGetter(new Date().toLocaleDateString("fr-FR"));
        try {
            // search for a line already present for this case
            const result = await visitCounter.getOneDay(target, today);
            if (result.length >= 1) {
                // if already present, increment visitCounter
                await visitCounter.incrementeVisits(target, today);
            } else {
                // if not, create it
                await visitCounter.newDayVisits(target, today);
            }

        } catch (error) {
            res.status(500).json({"message": "database-error"});
            const errorF = error as Error;
            await errorSaver(
                "handle-visit-data",
                JSON.stringify(errorF.stack)
            );
        }
        res.status(200).json({"message": "Visit register success"});
    },
};
