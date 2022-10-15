// Fonctionnement pas fonctionnel... donc fichier abandonné pour l'instant
const portfolioController = {
    contactSendMail: (req, res) => { //! TEMPORAIRE
        const mailData = {
            name: req.body.name,
            mail: req.body.mail,
            subject: req.body.subject,
            messsage: req.body.message,
        };

        res.status(200).json(mailData);
    }
};

module.exports = portfolioController;
