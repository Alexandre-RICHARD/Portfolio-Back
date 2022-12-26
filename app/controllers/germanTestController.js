const bcrypt = require("bcryptjs");

const germanTestController = {
    accessPassword: async (req, res) => {
        const password = req.body.password;
        try {
            if (bcrypt.compareSync(password, "$2a$10$DlPTTy9njcf34.tNFjc/xetiWusLC3mOmmJyz8jwUfbkPmUBbjcle")) {
                res.status(200).json("login-success");
            } else {
                res.status(200).json("login-failed");
            }
        } catch (error) {
            res.status(500).json("server-error");
        }
    }
};

module.exports = germanTestController;
