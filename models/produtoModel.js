import db from '../db.js';

export const getAllProdutos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM produto', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

export const createProduto = (dados) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO produto (nome, preco, descricao, fornecedor, email, telefone) VALUES (?, ?, ?, ?, ?, ?)';
        const valores = [dados.nome, dados.preco, dados.descricao, dados.fornecedor, dados.email, dados.telefone];
        db.query(query, valores, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

export const getProdutoById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM produto WHERE id_produto = ?', [id], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};

export const updateProduto = (id, dados) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE produto SET nome = ?, preco = ?, descricao = ?, fornecedor = ?, email = ?, telefone = ? WHERE id_produto = ?`;
        const valores = [dados.nome, dados.preco, dados.descricao, dados.fornecedor, dados.email, dados.telefone, id];
        db.query(query, valores, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

export const deleteProduto = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM produto WHERE id_produto = ?', [id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};