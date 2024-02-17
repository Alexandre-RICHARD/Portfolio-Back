import {dbRequestExecuter as db} from "../database";

export const mailHandler = {
    "saveOneMessage": async ({
        userName,
        mail,
        subject,
        message,
    }: {
        "userName": string;
        "mail": string;
        "subject": string;
        "message": string;
    }) => {
        const currentDateTime = new Date().toISOString();

        const request = `
        INSERT INTO 
            contact_message 
                (
                    message_date,
                    message_name,
                    message_mail,
                    message_object,
                    message
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                );
        `;
        const parameters = [
            currentDateTime,
            userName,
            mail,
            subject,
            message
        ];
        const result = await db(request, parameters);
        return result;
    },
};
