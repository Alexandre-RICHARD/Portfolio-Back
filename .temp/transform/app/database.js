// On importe pg (postgres)
const { Pool } = require("pg");

// On importe nos différentes variables d'environnement
const dbUrl = process.env.PG_URL;

// On créé notre adresse de connexion au serveur hébergé de la base de données
const connectionString = dbUrl;

// On crée la connexion qui sera utilisé par nos models
const db = new Pool({
    connectionString,
});

module.exports = db;