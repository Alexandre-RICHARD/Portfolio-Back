import {dbRequestExecuter as db} from "./../database";

export const mailHandler = {
    "getAllWorkTimeData": async () => {
        const request = "SELECT * FROM user_data";

        const results = await db(request);
        return results;
    },
    "saveOneMessage": async ({
        userName,
        mail,
        subject,
        message,
    }: {
        userName: string;
        mail: string;
        subject: string;
        message: string;
    }) => {
        const request = `
        INSERT INTO 
            contact_message 
                (
                    user_name,
                    user_mail,
                    user_object,
                    user_message
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    ?
                );
        `;
        const parameters = [
            userName,
            mail,
            subject,
            message
        ];
        const result = await db(request, parameters);
        return result;
    },
};
