const globalController = {
    test: (req, res) => {
        res.json("Serveur fonctionnel - Version actuelle : 0.9.34");
    },
};

module.exports = globalController;
