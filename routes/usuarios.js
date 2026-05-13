const express = require('express');
const router = express.Router();

const db = require('../db/db');

//GET
router.get('/', (req, res) => {
    const query = `
        SELECT * FROM usuarios
    `;
    db.all(query, [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                erro: err.message
            });
        }
        return res.status(200).json(rows);
    });
});

//GET :id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT * FROM usuarios
        WHERE id = ?
    `;
    db.get(query, [id], (err, row) => {
        if (err) {
            return res.status(500).json({
                erro: err.message
            });
        }
        if (!row) {
            return res.status(404).json({
                erro: 'Esse Usuário nois não vai tá tendo'
            });
        }
        return res.status(200).json(row);
    });
});

//POST
router.post('/', (req, res) => {
    const { nome, email, fone } = req.body;
    if (!nome || !email || !fone) {
        return res.status(400).json({
            erro: 'Faz o favo, todos os campos devem ser preenchidos'
        });
    }
    const query = `
        INSERT INTO usuarios (nome, email, fone)
        VALUES (?, ?, ?)
    `;
    db.run(query, [nome, email, fone], function(err) {
        if (err) {

            return res.status(500).json({
                erro: err.message
            });
        }
        return res.status(201).json({
            mensagem: 'Usuário criado!',
            id: this.lastID
        });
    });
});

//PUT :id 
router.put('/:id', (req, res) => {

    const { id } = req.params;
    const { nome, email, fone } = req.body;

    if (!nome || !email || !fone) {
        return res.status(400).json({
            erro: 'Faz o favo, todos os campos são obrigatórios'
        });
    }
    const query = `
        UPDATE usuarios
        SET nome = ?, email = ?, fone = ?
        WHERE id = ?
    `;
    db.run(query, [nome, email, fone, id], function(err) {
        if (err) {
            return res.status(500).json({
                erro: err.message
            });
        }
        if (this.changes === 0) {
            return res.status(404).json({
                erro: 'Esse Usuário nois não vai tá tendo'
            });
        }
        return res.status(200).json({
            mensagem: 'Atualização tá tinindo agora!'
        });
    });
});

//DELETE :id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        DELETE FROM usuarios
        WHERE id = ?
    `;
    db.run(query, [id], function(err) {
        if (err) {
            return res.status(500).json({
                erro: err.message
            });
        }
        if (this.changes === 0) {
            return res.status(404).json({
                erro: 'Esse Usuário nois não vai tá tendo'
            });
        }
        return res.status(200).json({
            mensagem: 'Chefe, operação realizado com sucesso. ELIMINADO!'
        });
    });
});

module.exports = router;