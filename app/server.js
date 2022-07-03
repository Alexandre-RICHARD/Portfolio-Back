const express = require('express');
const PORT = process.env.PORT;
const router = require('./router');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const start = () => {
  app.listen(PORT, () => {
    console.log(`Notre serveur fonctionne bien sur le port ${PORT}.`);
  });
}

module.exports = {
  start
};