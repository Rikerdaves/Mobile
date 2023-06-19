// Importar as dependências
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
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
    let totalDistancia = 0;
    let totalTempo = 0;
    let totalCalorias = 0;

    atividades.forEach((atividade) => {
      if (!isNaN(atividade.distancia)) {
        totalDistancia += parseFloat(atividade.distancia);
      }
      if (!isNaN(atividade.tempo)) {
        totalTempo += parseFloat(atividade.tempo);
      }
      if (!isNaN(atividade.calorias)) {
        totalCalorias += parseFloat(atividade.calorias);
      }
    });

    const analise = {
      totalAtividades: atividades.length,
      totalDistancia: totalDistancia / 1000, // Converter para quilômetros
      totalTempo: totalTempo, // Armazenar o tempo original sem formatação
      totalCalorias,
    };

    analise.mediaDistancia = totalDistancia / analise.totalAtividades / 1000;
    analise.mediaCalorias = totalCalorias / analise.totalAtividades;

    // Responder com a análise dos dados
    res.json(analise);

    // Fechar a conexão com o banco de dados
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao acessar o banco de dados' });
  }
});


// Rota para atualizar uma atividade
app.put('/api/atividades/:id', async (req, res) => {
  try {
    // Conectar ao MongoDB Atlas
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Acessar o banco de dados e a coleção
    const db = client.db('apiserver');
    const collection = db.collection('Atividades');

    // Atualizar a atividade com o ID fornecido
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) }, // Converter o ID para ObjectId
      {
        $set: {
          tipoAtividade: req.body.tipoAtividade,
          distancia: req.body.distancia,
          tempo: req.body.tempo,
          intensidade: req.body.intensidade,
          calorias: req.body.calorias,
          anotacoes: req.body.anotacoes
        }
      }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: 'Atividade atualizada com sucesso' });
    } else {
      res.status(404).json({ message: 'Atividade não encontrada' });
    }

    // Fechar a conexão com o banco de dados
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar a atividade' });
  }
});

// Rota para deletar uma atividade
app.delete('/api/atividades/:id', async (req, res) => {
  try {
    // Conectar ao MongoDB Atlas
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Acessar o banco de dados e a coleção
    const db = client.db('apiserver');
    const collection = db.collection('Atividades');

    // Obter o ID da atividade a ser deletada
    const atividadeId = req.params.id;

    // Deletar a atividade do banco de dados
    await collection.deleteOne({ _id: new ObjectId(atividadeId) });


    // Responder com sucesso
    res.status(200).json({ message: 'Atividade deletada com sucesso' });

    // Fechar a conexão com o banco de dados
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar a atividade' });
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('API está na porta 3000');
});