const db = require("../database.js");

// Notre fichier qui est appelé par le account controller chargé de faire les requêtes liées
const genshinHandler = {
    async registerUuid(uuid) {
        const sql = `
        INSERT INTO 
            user_uuid 
            (
                user_uuid
            )
            VALUES
            (
                $1
            )
            RETURNING id, user_uuid;
        `;
        const parameters = [uuid];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },

    async getUserId(uuid) {
        const sql = `
            SELECT id FROM user_uuid WHERE user_uuid = $1
        `;
        const parameters = [uuid];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },

    async getOneData(id, data_type) {
        const sql = `
            SELECT data_string
            FROM genshin_data
            WHERE user_id = $1
            AND data_type = $2
        `;
        const parameters = [id, data_type];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },

    async saveOneData(id, data_type, data_string) {
        const sql = `
            INSERT INTO genshin_data (user_id, data_type, data_string)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, data_type) DO UPDATE
            SET data_string = EXCLUDED.data_string;
        `;
        const parameters = [id, data_type, data_string];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },

    async deleteOneData(id, data_type) {
        const sql = `
            DELETE FROM genshin_data
            WHERE user_id = $1
            AND data_type = $2
        `;
        const parameters = [id, data_type];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },

    async deleteOneUser(uuid) {
        const sql = `
            DELETE FROM user_uuid
            WHERE user_uuid = $1
        `;
        const parameters = [uuid];
        const { rows } = await db.query(sql, parameters);
        return rows;
    },
};

module.exports = genshinHandler;
