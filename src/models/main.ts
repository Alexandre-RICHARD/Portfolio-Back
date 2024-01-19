import {dbRequestExecuter as db} from "./../database";

export const worktimeModel = {
    "getAllWorkTimeData": async () => {
        const request = "SELECT * FROM user_data";

        const results = await db(request);
        return results;
    },
};
