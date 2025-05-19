const express = require('express');
const PerguntaService = require('../services/perguntaService');
const PerguntaRepository = require('../repositories/perguntaRepository');

class PerguntaController {
  constructor() {
    this.router = express.Router();
    this.perguntaService = new PerguntaService(PerguntaRepository);
    this.perguntasUsadas = [];
    this.perguntaAtual = null;
    
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/pergunta', this.sortearPergunta.bind(this));
    this.router.post('/resposta', this.verificarResposta.bind(this));
  }

  async sortearPergunta(req, res) {
    try {
      const pergunta = await this.perguntaService.sortearPergunta(this.perguntasUsadas);
      this.perguntaAtual = pergunta;
      
      // Retorna apenas a pergunta, sem a resposta correta
      res.json({
        id: pergunta.id,
        pergunta: pergunta.pergunta
      });
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  }

  async verificarResposta(req, res) {
    const { resposta } = req.body;

    if (!this.perguntaAtual) {
      return res.status(404).json({ correta: false, erro: "Nenhuma pergunta ativa." });
    }

    try {
      const acertou = await this.perguntaService.verificarResposta(resposta, this.perguntaAtual);
      
      if (acertou) {
        this.perguntasUsadas.push(this.perguntaAtual.id);
        this.perguntaAtual = null;
        return res.json({ 
          correta: true,
          mensagem: "Resposta correta!" 
        });
      } else {
        return res.json({ 
          correta: false,
          mensagem: "Resposta incorreta!" 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        correta: false, 
        erro: error.message
      });
    }
  }

  getRouter() {
    return this.router;
  }
}

module.exports = PerguntaController;
