import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 6565,           
    user: 'root',
    password: 'adm123',   
    database: 'registro_produtos'
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Erro ao conectar ao MySQL:', err.message);
        return;
    }
    console.log('✅ Conectado ao banco de dados MySQL!');
});

export default connection;