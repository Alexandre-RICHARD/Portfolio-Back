require("dotenv").config();
const express = require("express");
const router = require("./router");
const cors = require("cors");
const app = express();

app.enable("trust proxy");
app.use(cors());
app.use(express.json());
app.use(router);

const start = () => app.listen(3000, () => {});

module.exports = {
    start,
};
