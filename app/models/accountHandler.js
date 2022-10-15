const db = require("../database.js");

// Notre fichier qui est appelé par le account controller chargé de faire les requêtes liées
const accountHandler = {
    async registerNewUser(
        nickname,
        mail,
        password
    ) {
        const sql = `
        INSERT INTO 
            user_register 
            (
                nickname, 
                email, 
                password_hashed
            )
            VALUES
            (
                $1,
                $2,
                $3
            );
        `;
        const parameters = [
            nickname,
            mail,
            password
        ];

        const { rows } = await db.query(
            sql,
            parameters
        );
        return rows;
    },
};

module.exports = accountHandler;
