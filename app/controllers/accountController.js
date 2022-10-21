const accountHandler = require("../models/accountHandler");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

// Les données venant du front vont venir subir les mêmes tests regex qu'en front. Ceci afin d'être sûr que l'utilisateur n'a pas modifié le code front. Et si on vérifie en front d'abord, c'est pour limiter les requêtes inutiles et donc de saturer le serveur
//  Le fonctionnement est similaire pour les deux fonctions. On créer une variable inputError pour chaque valeur. On le test exactement comme en front. Si l'input passe le test, il est ok, sinon on inscrit une erreur commune.
// A la fin, on vérifie si tous les résultats de tests sont ok, si oui, on envoi les données dans les models pour utilisation en BDD
const accountController = {
    registration: async (req, res) => {
        const registerResponse = [];
        const { mail, nickname, password, passwordConfirmation } = req.body;

        const regexTest = () => {
            if (
                !mail.match(/^(^([a-z])+([a-z0-9]+)[.\-_]?)+[a-z0-9]+@(([a-z\-0-9])+([.]{1})?(([a-z\-0-9])+([.]{1})+[a-z]{2,}))$/gm)
            ) {
                registerResponse.push("format-email");
            }
    
            if (
                !(!nickname.match(/[^0-9a-zA-Z-_]/gm) &&
                nickname.length >= 3 &&
                nickname.length <= 25)
            ) {
                registerResponse.push("format-nickname");
            }
    
            try {
                if (
                    !(password.match(/([a-z])/g).join("").length >= 2 &&
                    password.match(/([A-Z])/g).join("").length >= 2 &&
                    password.match(/([0-9])/g).join("").length >= 2 &&
                    password.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
                        .length >= 1 &&
                    !password.match(/([\s\b\n\t])/g) &&
                    password.length >= 8 &&
                    password.length <= 60)
                ) {
                    registerResponse.push("format-password");
                }
            } catch {
                registerResponse.push("format-password");
            }
    
            if (password !== passwordConfirmation) {
                registerResponse.push("match-password");
            }
        };

        regexTest();

        if (registerResponse.length === 0) {
            try {
                const alreadyRegister = await accountHandler.getOneAccount(mail);
                if (Object.keys(alreadyRegister).length === 0) {
                    const hashedPassword = await bcrypt.hash(password, salt);
                    try {
                        const result = await accountHandler.registerNewUser(nickname, mail, hashedPassword);
                        res.status(201).json(["register-success", result]);
                    } catch (error) {
                        res.status(500).json(["server-error"]);
                    }
                } else {
                    res.status(200).json(["account-already-exist"]);
                }
            } catch (error) {
                res.status(500).json(["server-error"]);
            }
        } else {
            res.status(200).json(registerResponse);
        }
    },

    connection: async (req, res) => {
        const loginResponse = [];
        const { mail, password } = req.body;

        const regexTest = () => {
            if (
                !mail.match(/^(^([a-z])+([a-z0-9]+)[.\-_]?)+[a-z0-9]+@(([a-z\-0-9])+([.]{1})?(([a-z\-0-9])+([.]{1})+[a-z]{2,}))$/gm)
            ) {
                loginResponse.push("format-email");
            }
    
            try {
                if (
                    !(password.match(/([a-z])/g).join("").length >= 2 &&
                    password.match(/([A-Z])/g).join("").length >= 2 &&
                    password.match(/([0-9])/g).join("").length >= 2 &&
                    password.match(/([~!@#$%^&*()\-_=+[\]{};:,.<>/?\\|])/g).join("")
                        .length >= 1 &&
                    !password.match(/([\s\b\n\t])/g) &&
                    password.length >= 8 &&
                    password.length <= 60)
                ) {
                    loginResponse.push("format-password");
                }
            } catch {
                loginResponse.push("format-password");
            }
        };

        regexTest();

        if (loginResponse.length === 0) {
            try {
                const tryFindAccount = (await accountHandler.getOneAccount(mail))[0];
                if (tryFindAccount && bcrypt.compareSync(password, tryFindAccount.password_hashed) === true) {
                    const result = {
                        nickname: tryFindAccount.nickname,
                        mail: tryFindAccount.email,
                    };
                    res.status(200).json(["login-success", result]);
                } else {
                    res.status(200).json(["login-failed"]);
                }
            } catch (error) {
                res.status(500).json(["server-error"]);
            }
        } else {
            res.status(200).json(loginResponse);
        }
    },
};

module.exports = accountController;
