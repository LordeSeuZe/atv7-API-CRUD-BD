const express = require('express')

const porta = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('API on!')
});

app.listen(porta, ()=>{
    console.log(`Servidor rodando na porta ${porta}`);
})