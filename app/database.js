// On importe pg (postgres)
const { Pool } = require("pg");

// On importe nos différentes variables d'environnement
const dbUser = process.env.PG_USER;
const dbUserPW = process.env.PG_PASSWORD;
const dbHost = process.env.PG_HOST;
const dbPort = process.env.PG_PORT;
const dbName = process.env.PG_DATABASE;

// On créé notre adresse de connexion au serveur hébergé de la base de données
const connectionString = `postgresql://${dbUser}:${dbUserPW}@${dbHost}:${dbPort}/${dbName}`;

// On crée la connexion qui sera utilisé par nos models
const db = new Pool({
    connectionString,
});

module.exports = db;