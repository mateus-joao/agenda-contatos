const express = require("express");
const cors = require("cors");

const usersRoutes = require("./routes/userRoutes");
const contatosRoutes = require("./routes/contatosRouters");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/contatos", contatosRoutes);

module.exports = app;
