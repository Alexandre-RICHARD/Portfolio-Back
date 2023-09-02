const { createTransport } = require("nodemailer");
const mailHandler = require("../models/mailHandler");

const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: "SSLv3"
    },
    auth: {
        user: process.env.MAIL_SENDER_USER,
        pass: process.env.MAIL_SENDER_PASS,
    }
});

const portfolioController = {
    contactSendMail: async (req, res) => {
        const mailData = {
            userName: req.body.name,
            mail: req.body.mail,
            subject: req.body.subject,
            message: req.body.message,
        };

        const mailOptions = {
            from: process.env.MAIL_SENDER_USER,
            to: process.env.MAIL_RECEIVER,
            subject: `AUTO - ${mailData.userName} - ${mailData.subject}`,
            text: `
            MAIL AUTOMATISÉ DEPUIS MON SITE

            Envoyé par ${mailData.userName}
            Son adresse-mail est ${mailData.mail}

            ${mailData.message}
            `
        };

        try {
            await mailHandler.saveOneMessage(mailData);
            res.status(200).json("Mail envoyé");
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info.response);
                }
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
        
    }
};

module.exports = portfolioController;
