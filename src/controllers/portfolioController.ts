import {Request, Response} from "express";
import {createTransport} from "nodemailer";

import {errorSaver} from "../utilities/errorSaver";
import {mailHandler} from "../models/mailHandler";

const transporter = createTransport({
    "host": "smtp-mail.outlook.com",
    "secure": false,
    "port": 587,
    "tls": {"ciphers": "SSLv3"},
    "auth": {
        "user": process.env.MAIL_SENDER_USER,
        "pass": process.env.MAIL_SENDER_PASS,
    },
});

export const portfolioController = {
    "contactSendMail": async (req: Request, res: Response) => {
        const mailData = {
            "userName": req.body.contactFormName,
            "mail": req.body.contactFormMail,
            "subject": req.body.contactFormSubject,
            "message": req.body.contactFormMessage,
        };

        const mailOptions = {
            "from": process.env.MAIL_SENDER_USER,
            "to": process.env.MAIL_RECEIVER,
            "subject": `AUTO - ${mailData.userName} - ${mailData.subject}`,
            "text": `
            MAIL AUTOMATISÉ DEPUIS MON SITE

            Envoyé par ${mailData.userName}
            Son adresse-mail est ${mailData.mail}

            ${mailData.message}
            `,
        };

        try {
            await mailHandler.saveOneMessage(mailData);
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    const errorF = error as Error;
                    errorSaver(
                        "mail-sending-failed",
                        JSON.stringify(errorF.stack)
                    );
                }
                res.status(200).json({"message": "Mail sent", "info": info});
            });
        } catch (error) {
            res.status(500).json({"message": "database-error"});
            const errorF = error as Error;
            await errorSaver(
                "save-contact-mail-fail",
                JSON.stringify(errorF.stack)
            );
        }
    },
};
