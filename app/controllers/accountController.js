const accountController = {
    registration: (req, res) => {
        res.json("The Inscription" + req.body);
    },
    connection: (req, res) => {
        res.json("La connexion" + req.body);
    },
};

module.exports = accountController;
