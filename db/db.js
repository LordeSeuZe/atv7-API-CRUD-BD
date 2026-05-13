const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./db/banco.db', (e) => {
    if (e) {
        console.error('Erro com a conexão:', e.message);
        
    } else {
        console.log("SQLite conectado!");
    }
})

db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    fone TEXT NOT NULL
  )
`);

module.exports = db;