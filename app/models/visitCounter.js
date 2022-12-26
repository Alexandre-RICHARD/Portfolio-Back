const db = require("../database.js");

// Notre fichier qui est appelé par le account controller chargé de faire les requêtes liées
const accountHandler = {
    async getOneDay(date) {
        const sql = `
            SELECT * FROM visits WHERE date = TO_DATE($1, 'DD/MM/YYYY')
        `;

        const parameters = [date];

        const { rows } = await db.query(sql, parameters);
        return rows;
    },

    async insertNewDay(date, counter) {
        const sql = `
        INSERT INTO 
        visits 
            (
                date, 
                counter
            )
            VALUES
            (
                TO_DATE($1, 'DD/MM/YYYY'),
                $2
            )
            RETURNING date, counter;
        `;
        const parameters = [date, counter];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },

    async updateCurrentDay(date, counter) {
        const sql = `
        UPDATE visits SET counter = $2 WHERE date = TO_DATE($1, 'DD/MM/YYYY')
        RETURNING date, counter;
        `;
        const parameters = [date, counter];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },
};

module.exports = accountHandler;
