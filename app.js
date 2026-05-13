const express = require('express');
const usuRoutes = require('./routes/usuarios.js');

const porta = 3000;
const app = express();

require("./db/db.js");

app.use(express.json());
app.use("/usuarios", usuRoutes);

app.get('/', (req, res) => {
    res.send('API on!');
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});