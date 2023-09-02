const db = require("../database.js");

const mailHandler = {
    async saveOneMessage({ userName, mail, subject, message }) {
        const sql = `
                INSERT INTO contact_message (user_name, user_mail, user_object, user_message)
                VALUES ($1, $2, $3, $4);
            `;
        const parameters = [userName, mail, subject, message];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },
};

module.exports = mailHandler;
