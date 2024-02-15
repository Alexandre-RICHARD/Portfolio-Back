import {dbRequestExecuter as db} from "../database";

export const visitCounter = {
    "getOneDay": async (target: string, today: string) => {
        const request = `
            SELECT * FROM visits
            WHERE target = ?
            AND visit_date = ?
        `;
        const parameters = [
            target,
            today
        ];
        const result = await db(request, parameters);
        return result;
    },

    "incrementeVisits": async (target: string, today: string) => {
        const request = `
            UPDATE visits
            SET counter = counter + 1
            WHERE 
                target = ? AND
                visit_date = ?
        `;
        const parameters = [
            target,
            today
        ];
        const result = await db(request, parameters);
        return result;
    },

    "newDayVisits": async (target: string, today: string) => {
        const request = `
            INSERT INTO visits
            (target, visit_date, counter)
            VALUES (?, ?, 1)
        `;
        const parameters = [
            target,
            today
        ];
        const result = await db(request, parameters);
        return result;
    },
};
