// Importar as dependências
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// Criar uma instância do Express
const app = express();

const corsOptions = {
  origin: 'http://localhost:19006',
};

// Configurar o body-parser para lidar com o corpo das solicitações
app.use(bodyParser.json());

// Configurar o middleware de CORS
app.use(cors(corsOptions)); // Permitir solicitações de todas as origens

// Connection String do MongoDB Atlas
const uri =
  'mongodb+srv://ladydmc:devilmaycry5@apiserver.lcs3qz2.mongodb.net/?retryWrites=true&w=majority';

class Atividade {
  constructor(tipoAtividade, distancia, tempo, intensidade, calorias, anotacoes) {
    this.tipoAtividade = tipoAtividade;
    this.distancia = distancia;
    this.tempo = tempo;
    this.intensidade = intensidade;
    this.calorias = calorias;
    this.anotacoes = anotacoes;
  }
}

// Definir uma rota de exemplo
app.get('/', (req, res) => {
  res.send('API está conectada!');
});

// Rota para obter todas as atividades
app.get('/atividades', async (req, res) => {
  try {
    // Conectar ao MongoDB Atlas
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Acessar o banco de dados e a coleção
    const db = client.db('apiserver');
    const collection = db.collection('Atividades');

    // Consultar todas as atividades
    const atividades = await collection.find().toArray();

    // Responder com as atividades encontradas
    res.json(atividades);

    // Fechar a conexão com o banco de dados
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter as atividades' });
  }
});


// Rota para salvar uma atividade
app.post('/api/atividades', async (req, res) => {
  try {
    // Conectar ao MongoDB Atlas
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Acessar o banco de dados e a coleção
    const db = client.db('apiserver');
    const collection = db.collection('Atividades');

    // Inserir a nova atividade no banco de dados
    const atividade = new Atividade(
      req.body.tipoAtividade,
      req.body.distancia,
      req.body.tempo,
      req.body.intensidade,
      req.body.calorias,
      req.body.anotacoes
    );
    await collection.insertOne(atividade);

    // Responder com sucesso
    res.status(201).json({ message: 'Atividade salva com sucesso' });

    // Fechar a conexão com o banco de dados
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar a atividade' });
  }
});

// Rota para analisar os dados de atividades
app.get('/api/analise', async (req, res) => {
  try {
    // Conectar ao MongoDB Atlas
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Acessar o banco de dados e a coleção
    const db = client.db('apiserver');
    const collection = db.collection('Atividades');

    // Consultar todas as atividades
    const atividades = await collection.find().toArray();


    // Realizar análise dos dados
    const analise = {
      totalAtividades: atividades.length,
      totalDistancia: 0,
      totalTempo: 0,
      totalCalorias: 0,
    };

    atividades.forEach((atividade) => {
      if (!isNaN(atividade.distancia)) {
        analise.totalDistancia += parseFloat(atividade.distancia);
      }
      if (!isNaN(atividade.tempo)) {
        analise.totalTempo += parseFloat(atividade.tempo);
      }
      if (!isNaN(atividade.calorias)) {
        analise.totalCalorias += parseFloat(atividade.calorias);
      }
    });

    analise.mediaDistancia = (analise.totalDistancia / analise.totalAtividades).toFixed(2);
    analise.mediaCalorias = (analise.totalCalorias / analise.totalAtividades).toFixed(2);

    // Responder com a análise dos dados
    res.json(analise);

    // Fechar a conexão com o banco de dados
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao acessar o banco de dados' });
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('API está na porta 3000');
  console.log('API OK!');
});
