const db = require("../database.js");

// Notre fichier qui est appelé par le account controller chargé de faire les requêtes liées
const accountHandler = {
    async getOneDay(target, today) {
        return await db.query(`
        SELECT * FROM visits
        WHERE target = $1
        AND date = $2
        `, [target, today]);
    },

    async incrementeVisits(target, today) {
        await db.query(`
        UPDATE visits
        SET counter = counter + 1
        WHERE target = $1
        AND date = $2
        `, [target, today]);
    },

    async newDayVisits(target, today) {
        await db.query(`
        INSERT INTO visits
        (target, date, counter)
        VALUES ($1, $2, 1)
        `, [target, today]);
    },
};

module.exports = accountHandler;
