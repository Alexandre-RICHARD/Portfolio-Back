const db = require("../database.js");

// Notre fichier qui est appelé par le account controller chargé de faire les requêtes liées
const accountHandler = {
    async getOneAccount(email) {
        const sql = `
            SELECT * FROM user_register WHERE email = $1
        `;

        const parameters = [email];

        const { rows } = await db.query(sql, parameters);
        return rows;
    },
    async registerNewUser(nickname, email, password) {
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
            )
            RETURNING nickname, email;
        `;
        const parameters = [nickname, email, password];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },
};

module.exports = accountHandler;
