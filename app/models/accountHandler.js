const db = require("../database.js");

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

        await db.query(
            sql,
            parameters
        );
    },
};

module.exports = accountHandler;
