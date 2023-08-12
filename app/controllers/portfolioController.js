// const sendMail = require("../middlewares/sendMail");
const { spawn } = require("child_process");

// Fonctionnement pas fonctionnel... donc fichier abandonné pour l'instant
const portfolioController = {
    contactSendMail: (req, res) => { //! TEMPORAIRE
        const mailData = {
            userName: req.body.contactFormName,
            mail: req.body.contactFormMail,
            subject: req.body.contactFormSubject,
            message: req.body.contactFormMessage,
        };

        // Exécute le script PHP en tant que processus enfant
        const phpScript = spawn("php", ["../middlewares/sendMail.php", mailData.userName, mailData.mail, mailData.subject, mailData.message]);

        // Affiche la sortie du script PHP dans la console
        // phpScript.stdout.on("data", (data) => {
        // });

        // Affiche les erreurs du script PHP dans la console
        phpScript.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
        });

        // Termine le processus enfant lorsque le script PHP a fini de s'exécuter
        // phpScript.on("close", (code) => {
        // console.log(`Le script PHP a quitté avec le code ${code}`);
        res.send("E-mail envoyé avec succès !");
        // });
        
        // res.status(200).json("ok");
    }






};

module.exports = portfolioController;
