const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 1) Exibição de arquivos estáticos
app.use(express.static('public'));

// 2) Upload de arquivo via POST
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('Arquivo enviado com sucesso.');
});

// 3) Processamento de dados de formulário via GET
app.get('/form', (req, res) => {
  const { name, age } = req.query;
  res.send(`Nome: ${name}, Idade: ${age}`);
});

// 4) Suporte a aplicação AJAX
app.get('/data', (req, res) => {
  const data = {
    message: 'Dados recebidos via AJAX'
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
