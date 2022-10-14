const accountHandler = require("../models/accountHandler");

const accountController = {
    registration: async (req, res) => {
        const testRsult = {
            mailT: null,
            nicknameT: null,
            passwordT: null,
            passwordConfirmationT: null,
        };
        const { mail, nickname, password, passwordConfirmation } = req.body;

        if (
            mail.match(
                /^(^([a-z])+([a-z0-9]+)[.\-_]?)+[a-z0-9]+@(([a-z\-0-9])+([.]{1})?(([a-z\-0-9])+([.]{1})+[a-z]{2,}))$/gm
            )
        ) {
            testRsult.mailT = "OK";
        } else {
            testRsult.mailT = "Le format de l'adresse mail n'est pas correct.";
        }

        if (
            !nickname.match(/[^0-9a-zA-Z-_]/gm) &&
            nickname.length >= 3 &&
            nickname.length <= 25
        ) {
            testRsult.nicknameT = "OK";
        } else {
            testRsult.nicknameT = "Le format du pseudo n'est pas correct.";
        }

        try {
            if (
                password.match(/([a-z])/g).join("").length >= 2 &&
                password.match(/([A-Z])/g).join("").length >= 2 &&
                password.match(/([0-9])/g).join("").length >= 2 &&
                password.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
                    .length >= 1 &&
                !password.match(/([\s\b\n\t])/g) &&
                password.length >= 8 &&
                password.length <= 60
            ) {
                testRsult.passwordT = "OK";
            } else {
                testRsult.passwordT =
                    "Le format du mot de passe n'est pas correct.";
            }
        } catch {
            testRsult.passwordT =
            "Le format du mot de passe n'est pas correct.";
        }

        if (password === passwordConfirmation) {
            testRsult.passwordConfirmationT = "OK";
        } else {
            testRsult.passwordConfirmationT =
                "Le mot de passe de confirmation ne correspond pas au mot de passe.";
        }

        if (Object.values(testRsult).every((element) => element === "OK")) {
            try {
                const registration = await accountHandler.registerNewUser(nickname, mail, password);
                res.json(registration);
            } catch (error) {
                res.status(500).json(error.message);
            }
        }
    },
    connection: (req, res) => {
        const testRsult = {
            mailT: null,
            passwordT: null,
        };
        const { mail, password } = req.body;
        if (
            mail.match(
                /^(^([a-z])+([a-z0-9]+)[.\-_]?)+[a-z0-9]+@(([a-z\-0-9])+([.]{1})?(([a-z\-0-9])+([.]{1})+[a-z]{2,}))$/gm
            )
        ) {
            testRsult.mailT = "OK";
        } else {
            testRsult.mailT = "Le format de l'adresse mail n'est pas correct.";
        }
        try {
            if (
                password.match(/([a-z])/g).join("").length >= 2 &&
                password.match(/([A-Z])/g).join("").length >= 2 &&
                password.match(/([0-9])/g).join("").length >= 2 &&
                password.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
                    .length >= 1 &&
                !password.match(/([\s\b\n\t])/g) &&
                password.length >= 8 &&
                password.length <= 60
            ) {
                testRsult.passwordT = "OK";
            } else {
                testRsult.passwordT =
                    "Le format du mot de passe n'est pas correct.";
            }
        } catch {
            testRsult.passwordT =
            "Le format du mot de passe n'est pas correct.";
        }

        res.json(testRsult);
    },
};

module.exports = accountController;
