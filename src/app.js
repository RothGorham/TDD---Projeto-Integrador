const express = require('express');
const mongoose = require('mongoose');
const PerguntaController = require('./controllers/perguntaController');

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());
  }

  setupRoutes() {
    const perguntaController = new PerguntaController();
    this.app.use('/api', perguntaController.getRouter());
  }

  async connectToDatabase(uri) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Conectado ao MongoDB com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar com o MongoDB:', error);
      throw error;
    }
  }

  listen(port) {
    return this.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }

  getApp() {
    return this.app;
  }
}

module.exports = App;
