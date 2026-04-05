import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllProdutos, createProduto, getProdutoById, updateProduto, deleteProduto } from './models/produtoModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 6060; 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota Home
app.get('/', (req, res) => res.render('index'));

// Rota Sobre (Novo!)
app.get('/sobre', (req, res) => res.render('sobre'));

// Rota Lista de produtos
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await getAllProdutos();
        res.render('produtos', { produtos });
    } catch (err) {
        res.status(500).send("Erro ao buscar produtos");
    }
});

// Rota Formulário Novo
app.get('/produtos/novo', (req, res) => res.render('criar'));

// Rota Formulário Editar (Novo!)
app.get('/produtos/editar/:id', async (req, res) => {
    try {
        const produto = await getProdutoById(req.params.id);
        if (!produto) return res.status(404).send("Produto não encontrado");
        res.render('editar', { produto });
    } catch (err) {
        res.status(500).send("Erro ao carregar edição");
    }
});

// Rota Salvar (POST)
app.post('/produtos', async (req, res) => {
    try {
        await createProduto(req.body);
        res.redirect('/produtos');
    } catch (err) {
        res.status(500).send("Erro ao cadastrar");
    }
});

app.post('/produtos/editar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dados = req.body;
        // O 'await' faz o código esperar o MySQL confirmar a alteração
        await updateProduto(id, dados); 
        console.log("✅ Alterado no MySQL");
        res.redirect('/produtos');
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao salvar no MySQL");
    }
});

app.post('/produtos/excluir/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await deleteProduto(id);
        console.log("🗑️ Excluído do MySQL");
        res.redirect('/produtos');
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao excluir no MySQL");
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor em http://localhost:${port}`);
});

