const db = require("../database.js");

// Notre fichier qui est appelé par le account controller chargé de faire les requêtes liées
const accountHandler = {
    async getOneAccount(mail) {
        const sql = `
            SELECT * FROM user_register WHERE mail = $1
        `;

        const parameters = [mail];

        const { rows } = await db.query(sql, parameters);
        return rows;
    },

    async registerNewUser(nickname, mail, password) {
        const sql = `
        INSERT INTO 
            user_register 
            (
                nickname, 
                mail, 
                password_hashed
            )
            VALUES
            (
                $1,
                $2,
                $3
            )
            RETURNING nickname, mail;
        `;
        const parameters = [nickname, mail, password];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },

    async changmail(id, mail) {
        const sql = `
        UPDATE user_register SET mail = $2 WHERE id = $1
        RETURNING nickname, mail;
        `;
        const parameters = [id, mail];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },

    async changePassword(id, password) {
        const sql = `
        UPDATE user_register SET password_hashed = $2 WHERE id = $1
        RETURNING nickname, mail;
        `;
        const parameters = [id, password];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },

    async deleteAccount(mail) {
        const sql = `
            DELETE FROM user_register WHERE mail = $1
        `;
        const parameters = [mail];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },
};

module.exports = accountHandler;
